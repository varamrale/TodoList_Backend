const express = require('express');

const {home,signup,signin,createTodo,updateTodo,getTodoList,deleteTodo} = require('../controller/user');

const {isLoggedIn,} = require('../middleware/user');
const {auth} = require('../middleware/auth')


const router = express.Router();

router.route("/").get(home);

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/create-Todo").post(isLoggedIn,createTodo);
router.route("/update-todo/:userId").patch(isLoggedIn,updateTodo);
router.route("/userList").get(isLoggedIn,getTodoList);
router.route("/delete-todo/:userId").delete(isLoggedIn,deleteTodo);




module.exports = router;