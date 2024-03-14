const express = require('express')
const { createUser,getusers,getuser,updateUser, deleteUser } = require('../controllers/user');


const router = express.Router();

router.route("/create-user").post(createUser);
router.route("/get-users").get(getusers);
router.route("/get-users/:id").get(getuser);
router.route("/update-user/:id").put(updateUser);
router.route("/delete-user/:id").delete(deleteUser)


 
module.exports = router;




