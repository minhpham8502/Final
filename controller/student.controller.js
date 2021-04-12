const FaculityModel = require('../models/faculity')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;
var cookie = require('cookie');


let update =(req,res)=>{
    // AccountModel.findById(req.params.id)
    //     .then(data=>
    //         res.render('student/updatestudent',{account:data})
    //     )
   AccountModel.findById(req.params.id)
    .then((data)=>
        FaculityModel.find(function(err,data){
        }).then(data1=>{
        res.render('student/updatestudent',{account:data,faculity:data1})

        })
    )
}
let deleteStudent = (req,res)=>{
    AccountModel.findById({_id:req.params.id},function(err,data){
        let facultyID = data.facultyID
        AccountModel.deleteOne({
            _id :  req.params.id
        })
        .then(()=>{
            res.redirect('/faculity/allStudent/'+ facultyID)
        })
    })
    
    
}
let doupdate =(req,res)=>{
    AccountModel.updateOne({
        _id : req.params.id
    }, req.body)
    .then(()=>{
        res.redirect('/faculity/allStudent/'+ req.body.facultyID)
    })
}

let chat = (req,res)=>{
    AccountModel.findOne({
        _id : req.params.id,
    }).then(data=>{
    // res.render('./student/chat',{account:data})
         res.render('index',{account:data})
    })
}

module.exports ={
    doupdate,
    deleteStudent,
    update,
    chat
}