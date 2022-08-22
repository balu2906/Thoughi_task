const { successResponse, sendError } = require("../helpers/response");
const crudService = require("../services/crud_service");
const { checkFields, isValidDate } = require("../utils/validation");
const { makeDate } = require("../utils/dateTime");

exports.postOrders = async (req, res) => {
  const orders = req.body;
  try {
    if (!orders || orders.length == 0) {
      throw {
        name: "ERROR",
        message: "Please Place Atleast One order",
        code: 400,
      };
    }
    let orderPromises = [];
    let orderIgnoreCount = 0;
    let orderFetchResult = [];

    orders.forEach((order, i) => {
      orderPromises.push(insertOrder(order, i));
    });
    function insertOrder(order, i) {
      return new Promise(async (resolve, reject) => {
        try {
          const dateStatus = await isValidDate(order.orderDate);
          if (!dateStatus.status) {
            throw {
              name: "Invalid",
              message: `Please Provide Valid Date of OrderPlacing. for Order ${
                i + 1
              }`,
              code: 400,
            };
          }
          let obj = {
            orderDate: makeDate(order.orderDate),
            orderStatus: 1,
            collectionOfItems: order.items.length,
          };
          if (!obj.collectionOfItems || obj.collectionOfItems == 0) {
            throw {
              name: "Invalid",
              message: `Need Atleast One item in Order ${i + 1}`,
              code: 400,
            };
          }

          orderFetchResult.push(obj);
          let result = await crudService.insert("orders", obj);
          const OrderId = result.insertId;
          const Items = order.items;
          let itemPromises = [];
          let ItemIgnoreCount = 0;
          let itemFetchCount = [];
          Items.forEach((item, j) => {
            itemPromises.push(insertItem(item, i, j));
          });
          function insertItem(item, i, j) {
            return new Promise(async (resolve, reject) => {
              const status = checkFields("items", item);
              if (!status.status) {
                const err = {
                  name: "INVALID",
                  message: `Value Required for the field ${
                    status.field
                  } of item ${j + 1} in Order${i + 1}`,
                  code: 400,
                };
                return sendError(res, err);
              }
              let obj = {
                ...item,
                orderId: OrderId,
              };
              const result = await crudService.insert("items", obj);
              resolve(result);
            });
          }
          Promise.allSettled(itemPromises)
            .then((data) => {
              console.log("Sdsdfsdfdsf");
              resolve(data);
            })
            .catch((e) => {
              console.log(e, "error in item inserting");
              return reject(e);
            });
        } catch (err) {
          return sendError(res, err);
        }
      });
    }
    Promise.allSettled(orderPromises)
      .then((data) => {
        if (orderIgnoreCount == req.body.length) {
          return res.status(500).json({ message: "Already Exists" });
        }
        // res.send(data);
        successResponse(res, { message: "Orders Placed SuccesFully" });
      })
      .catch((e) => {
        return res.status(500).json({ message: e.sqlMessage });
      });
  } catch (e) {
    sendError(res, e);
  }
};

exports.OrderByID = async (req, res) => {
  try {
    const orderId = req.params.orderID;
    if (!orderId || isNaN(orderId)) {
      throw {
        name: "INVALID",
        message: "Please Provide Valid Order's ID",
        code: 400,
      };
    }
    let result = await crudService.fetch(
      `orders.*,CONCAT(  '[',  GROUP_CONCAT(JSON_OBJECT('itemId', items.itemId,'itemName', items.itemName,'itemUnitPrice', items.itemUnitPrice,'itemQuantity', items.itemQuantity)),  ']') as items`,
      "orders JOIN items on items.orderId = orders.orderId",
      `orders.orderId = ${orderId}`,
      1
    );
    console.log(result);
    const items = JSON.parse(result.items);
    result.items = items;
    successResponse(res, result);
  } catch (e) {
    sendError(res, e);
  }
};

exports.allOrders = async (req, res) => {
  try {
    let result = await crudService.fetch(
      `orders.*,CONCAT(  '[',  GROUP_CONCAT(JSON_OBJECT('itemId', items.itemId,'itemName', items.itemName,'itemUnitPrice', items.itemUnitPrice,'itemQuantity', items.itemQuantity)),  ']') as items`,
      "orders JOIN items on items.orderId = orders.orderId",
      "GROUP BY orders.orderId",
      0,
      "nowhere"
    );
    result.map((ele) => {
      ele.items = JSON.parse(ele.items);
    });
    successResponse(res, result);
  } catch (e) {
    sendError(res, e);
  }
};
