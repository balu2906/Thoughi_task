const mysql = require("mysql2");
const pool = require("../utils/db-connect");

exports.fetch = (column, table, where, single = 0, separate = "AND") => {
  /*
    column,table,where - compulsory
    ----------
    column = name of the columns to be fetched ("*" or "id,email,phone")
    table = name of table
    where = can be string or object with key value pair
    eg. (string)
        "id=4 AND email='test@gmail.com'"
    eg. (object)
        {id:4,email:'test@gmailcom'}
    single = whether single row is expected or array of rows
        single = 1,
            if data is found, will return a single row as object {id:4,name:'jhon'}
            else if data is not found it will return 0
        single = 0,
            if data if found, will return array of rows, [ {id:4,name:'jhon'}, {id:5,name:'mohan'}]
            else will return empty array []
    separate = separe the where condition using "AND" or "OR", only if where is of type object
    */

  if (typeof where === "object") {
    where = Object.keys(where)
      .map((e) => {
        return `${e}=${mysql.escape(where[e]).toString()}`;
      })
      .join(` ${separate} `);
  }

  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) return reject(err);

      // console.log(
      //   `SELECT ${column} FROM ${table} ${
      //     separate == "nowhere" ? "" : "WHERE"
      //   } ${where}`
      // );
      // let query = `SELECT SUM(count) FROM nse_analytics WHERE month(date) = 9 AND projectName = 'takeoff'`
      con.query(
        `SELECT ${column} FROM ${table} ${
          separate === "nowhere" ? "" : "WHERE"
        } ${where}`,
        (err, result) => {
          con.release();
          if (err) return reject(err);
          // console.log(result , "topics");
          if (single) {
            if (result.length > 0) resolve(result[0]);
            else resolve(0);
          } else {
            resolve(result);
          }
        }
      );
    });
  });
};

exports.insert = (table, fields) => {
  /*
    table = (string) table name as
    fields  = (object)
    eg.
        {email:'test@gmailcom',password:'12345'}
    */

  const values = [];

  Object.keys(fields).forEach((e) => {
    values.push(`${mysql.escape(fields[e].toString())}`);
  });

  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) return reject(err);
      // return console.log(`INSERT INTO ${table} (${Object.keys(fields).join(',')}) VALUES (${values.join(',')})`);
      con.query(
        `INSERT INTO ${table} (${Object.keys(fields).join(
          ","
        )}) VALUES (${values.join(",")})`,
        (err, result) => {
          con.release();
          if (err) return reject(err);

          resolve(result);
        }
      );
    });
  });
};

exports.update = (table, fields, where, separate = "AND", inArray) => {
  /*
    table = (string) table name as
    fields  = (object)
        eg. {email:'test@gmailcom',password:'12345'}
    where = can be string or object with key value pair
        eg. (string)
            "id=4 AND email='test@gmail.com'"
        eg. (object)
            {id:4,email:'test@gmailcom'}
    separate = separe the where condition using "AND" or "OR", only if where is of type object
    */
  if (typeof fields === "object") {
    fields = Object.keys(fields)
      .map((e) => {
        if (fields[e] === null) {
          return `${e}=${mysql.escape(fields[e])}`;
        }
        return `${e}=${mysql.escape(fields[e]).toString()}`;
      })
      .join(",");
  }

  if (typeof where === "object") {
    where = Object.keys(where)
      .map((e) => {
        return `${e}=${mysql.escape(where[e]).toString()}`;
      })
      .join(` ${separate} `);
  }

  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) return reject(err);
      // console.log(`UPDATE ${table} SET ${fields} WHERE ${where}`);
      inArray
        ? con.query(
            `UPDATE ${table} SET ${fields} WHERE ${where}`,
            [inArray],
            (err, result) => {
              con.release();
              if (err) return reject(err);

              resolve(result);
            }
          )
        : con.query(
            `UPDATE ${table} SET ${fields} WHERE ${where}`,
            (err, result) => {
              con.release();
              if (err) return reject(err);

              resolve(result);
            }
          );
    });
  });
};

exports.delete = (table, where, separate = "AND") => {
  /*
    table       = (string) table name as
    where       = can be string or object with key value pair
    separate    = separate the where condition using "AND" or "OR", only if where is of type object
    */

  if (typeof where === "object") {
    where = Object.keys(where)
      .map((e) => {
        return `${e}=${mysql.escape(where[e]).toString()}`;
      })
      .join(` ${separate} `);
  }

  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) return reject(err);

      con.query(`DELETE FROM ${table} WHERE ${where}`, (err, result) => {
        con.release();
        if (err) return reject(err);

        resolve(result);
      });
    });
  });
};

exports.truncate = (table) => {
  // delete all rows from table
  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) return reject(err);
      con.query(`TRUNCATE ${table}`, (err, result) => {
        con.release();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};
exports.insertText = (table, data) => {
  const values = [];
  const where = [];
  // console.log("sdfsdglkkmmpoeru02weuro");
  Object.keys(data).forEach((e) => {
    console.log("fgdfg ", e);
    values.push(data[e]);
    where.push(`?`);
  });
  console.log("wherer ", values);
  let query = `INSERT INTO ${table} (${Object.keys(data).join(
    ","
  )}) VALUES (${where.join(",")}) `;
  console.log("queryryry ", query);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) return reject(err);
      // console.log("query ",query);
      con.query(query, values, (err, result) => {
        con.release();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};
