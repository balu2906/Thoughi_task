const { keys } = require("../config/keys");
const util = require("util");

exports.checkFields = (key, body) => {
  /**
   * key = key to load fields from keys files
   * body = data recieved from frontend
   * */

  let fields = keys[`${key}`];
  // if(bse){
  //   fields = bseKeys[key]
  // }else{
  //   fields = keys[`${key}`];
  // }

  let length = fields.length,
    i = 0;
  while (i < length) {
    if (!body[`${fields[i]}`]) {
      return { status: false, field: fields[i] };
    }
    i++;
  }
  return { status: true, field: "" };
};

exports.isValidDate = (date) => {
  const d = new Date(date);
  Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
  };
  if (d.isValid()) {
    return { status: 1 };
  } else {
    return { status: 0 };
  }
};
