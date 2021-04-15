var express = require('express');
var FacultyModel = require('../models/faculty'); 
var studentRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const studentController = require('../controller/student.controller');
studentRoute.use(checkAuth);

studentRoute.get('/update:id',studentController.update)
studentRoute.get('/delete:id',studentController.deleteStudent)


studentRoute.post('/doupdate:id', studentController.doupdate)

module.exports = studentRoute