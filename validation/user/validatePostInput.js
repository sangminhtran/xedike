const _ = require("lodash");
const validator = require("validator");
const { User } = require("../../models/User");

//email
//khác rỗng + valid (email) + unique

//password
//length >8 + confirm password === password

//DOB
//khác rỗng +valid (Date)

const validatePostInput = async data => {
  //data: {email, password, DOB, userType, ...}
  let errors = {};

  data.email = _.get(data, "email", "");
  //nếu data.email = undefined ==> data.email = ""
  //nếu data.email = "" ==> data.email = ""
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.DOB = _.get(data, "DOB", "");
  data.userType = _.get(data, "userType", "");
  data.phone = _.get(data, "phone", "");

  //email
  if (validator.isEmpty(data.email)) errors.email = "Email is required";
  else if (!validator.isEmail(data.email)) errors.email = "Email is invalid";
  else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "Email exist";
  }

  //password
  if (validator.isEmpty(data.password)) errors.password = "Password is requied";
  else if (!validator.isLength(data.password, { min: 8 }))
    errors.password = "Password has at least 8  characters";
  //confirm password
  if (validator.isEmpty(data.password2))
    errors.password2 = "Confirm password is requied";
  else if (!validator.equals(data.password, data.password2))
    errors.password2 = "Confirm password must match";

  //DOB
  if (validator.isEmpty(data.DOB)) errors.DOB = "Date is required";

  //userType
  if (validator.isEmpty(data.userType)) errors.userType = "User type is required";
  else if (
    !validator.equals(data.userType, "driver") &&
    !validator.equals(data.userType, "passenger") &&
    !validator.equals(data.userType, "admin")
  )
    errors.userType = "User type is invalid";

  //phone
  if (validator.isEmpty(data.phone)) errors.phone = "Phone is required";
  else if (!validator.isLength(data.phone, { min: 10, max: 10 }))
    errors.phone = "Phone must have 10 characters";

  return {
    isValid: _.isEmpty(errors), //true (pass hết tất cả fiel), false (ko pass ít nhất 1 fiel)
    errors //{email: email đã tồn tại, password: ít nhất 8 ký tự}
  };
};

module.exports = {
  validatePostInput
};
