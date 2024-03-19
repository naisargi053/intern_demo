//const userModel = require("../models/userModel");
const userModel = require("../models/User_model");

//CRUD Operation

//create

exports.createUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    return res.status(201).send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error, "error");
    return res
      .status(500)
      .send({ status: false, message: "Internal server Error" });
  }
};

//Read (With Pagination, Filter, Sorting)

exports.getusers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const status = req.query.status;
  const sortBy = req.query.sortBy
  const sortOrder = req.query.sortOrder
  const search = req.query.searchTerm
  try {
    const filter = {};
    const sort = {[sortBy]: sortOrder}
    if (status) {
      filter.status = status;
    }
    if(search){
        filter.search = {$regex: new RegExp(search, "i")}
    }
    const user = await userModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    const totalUsers = await userModel.countDocuments();
    // const hasMore = page < totalPages
    if (!user.length) {
      return res.status(200).json({ status: false, message: "no data found" });
    }

    return res.status(200).send({ status: true, user, totalUsers });
  } catch (error) {
    console.log(error, "error");
    return res
      .status(500)
      .send({ status: false, message: "internal server error" });
  }
};

exports.getuser = async (req, res) => {
  try {
    const users = await userModel.findById(req.params.id);
    console.log(users, "users");
    if (!users) {
      return res
        .status(200)
        .send({ status: false, message: "please provide correct id" });
    }
    return res.status(200).send({ status: true, users });
  } catch (error) {
    console.log(error, "error");
    return res
      .status(500)
      .send({ status: false, message: "internal server error" });
  }
};

//Update

exports.updateUser = async (req, res) => {
  let user = await userModel.findById(req.params.body);
  console.log(user, "users");

  if (!user) {
    return res
      .status(200)
      .send({ status: false, message: "please provide correct ID  " });
  }

  user = await userModel.findByIdAndUpdate(req.params.id.req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).send({
    status: true,
    user,
  });
};

//Delete

exports.deleteUser = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  if (!user) {
    return res
      .status(200)
      .json({ status: false, message: "please provide correct id" });
  }

  user = await userModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Delete sucessfully",
  });
};

exports.searchUser = async (req, res) => {
  try {
    console.log(req.query.search);
    const users = await userModel.find();

    const searchTerm = req.query.search.toLowerCase(); // Convert search query to lowercase
    console.log("searchTerm---", searchTerm);
    // console.log(products);
    const result = users.filter((data, index, arr) => {
      const userName = data.name.toLowerCase();
      //const productName = data.name.toLowerCase(); // Convert product name to lowercase
      console.log(userName.includes(searchTerm), "-----");
      if (userName.includes(searchTerm)) {
        return true;
      } else {
        return false;
      }
    });

    res.status(201).send({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

// export.getAllUsers = async(req, res) => {
//     const users =
// }

// Pagination
// Searching
// Filtering
// Sorting

// Reference
