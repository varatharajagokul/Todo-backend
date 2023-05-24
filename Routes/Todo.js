const express =require("express");
const { getList, createList, deleteList} = require('./../Controller/Todo');
const authenticate = require("../Middleware/Authenticate");
const router = express.Router();

router.route('/getList').get(authenticate,getList);
router.route('/createList').post(authenticate,createList);
router.route('/deleteList/:id').delete(authenticate,deleteList);

module.exports=router;