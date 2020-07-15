const _ = require("lodash");

// _.isEmpty();
//check xem object hay mảng rỗng
//[] {} =>true
//[1,2,3...] =>false
console.log(_.isEmpty([1, 2, 3]));
console.log(_.isEmpty([]));
if ([]) {
  console.log("Mảng rỗng trả về");
}

console.log("-----------------------");
//_.get()
//nested object
const user = {
  credentals: {
    email: "nguyenvana@gmail.com",
    password: "123456"
  },
  profile: {
    name: "nguyenvana",
    age: 23,
    address: {
      number: 10,
      street: "Quang Trung",
      province: "Sai Gon"
    }
  }
};

let user2 = {
  credentals: {
    email: "nguyenvanb@gmail.com",
    password: "123456"
  }
};

console.log(user.profile.address.province);

console.log(
  _.get(user, "profile.address.province", "Người dùng chưa nhập address")
);
console.log(
  _.get(user2, "profile.address.province", "Người dùng chưa nhập address")
);

console.log("------------------------------");

//_.set()
//_.set(user2, "profile.address.province", "HaNoi") //cách 1
user2 = {
  ...user2,
  profile: {
    address: {
      province: "HaNoi"
    }
  }
}; //cách 2 sử dụng spread operator
console.log(JSON.stringify(user2, undefined, 2));
