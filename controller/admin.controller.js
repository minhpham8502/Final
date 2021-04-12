const FaculityModel = require('../models/faculity')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var DashboardtModel = require('../models/Dashboard')
var fileModel = require('../models/file');
const { findById } = require('../models/faculity');
var bcrypt = require('bcrypt');
const { response } = require('express');
var saltRounds = 10;
class AdminController {
    createAccount(req,res ){
        FaculityModel.find({},function(data){

        }).then(data=>{
             res.render("admin/createAccount", {faculity:data})

        })
    }

    docreateAccount(req,res ){
        var password = req.body.password
        var role = req.body.Role
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        let classID = req.body.classID

        let newAccount = AccountModel({
            username: req.body.username,
            password :hash,
            email: req.body.email,
            classID: classID,
            role : role,
            phone:req.body.phone,
            birthday:req.body.birthday,
            address:req.body.address
        })
        newAccount.save(function(err,data){
            if(err){
                console.log(err)
            }else{
                FaculityModel.find({},function(data){})
                .then(data=>{
                    if(role == "coordinator" && classID !="None"){
                        res.redirect("/faculity/Coordinator/" + req.body.classID)  
                    }else if(role == "coordinator" && classID ==="None"){
                        res.redirect('/admin/addtoFaculty')              
                    }else if(role == "student" && classID !="None"){
                        res.redirect("/faculity/allStudent/" + req.body.classID)
                    }else if(role == "student" && classID !="None"){
                        res.redirect('/admin/addtoFaculty')     

                    }else if (role == "guest" && classID != "None"){
                       var message= role + " cannot add classes"
                       AccountModel.deleteOne({_id: newAccount._id})
                       .then(()=>{
                        res.render("admin/createAccount", {faculity:data,message: message}) 
                       })

                    }else if (role == "guest" && classID === "None" ){
                        res.redirect("/guest/allGuest")  

                    }else if(role == "manager" && classID === "None"){
                        res.redirect("/manage/allManager")
                    }else if (role == "manager" && classID != "None"){
                        var message= role + " cannot add classes"
                        AccountModel.deleteOne({_id: newAccount._id})
                        .then(()=>{
                         res.render("admin/createAccount", {faculity:data,message: message}) 
                        })           
                    }
                })
            }
        })
    }
    

    addtoFaculty(req,res ){
        AccountModel.find({classID:"None",role:"student"},function(err,result){
            AccountModel.find({classID:"None",role:"coordinator"},function(err,result2){
                FaculityModel.find({},function(err,result3){
                    res.render("admin/addtoFaculty.ejs",{data:result,data2:result2,faculity: result3})
                })
            })
        })
    }
    doaddtoFaculty(req,res ){
        AccountModel.findOneAndUpdate({_id: req.params.id},{classID: req.body.classID},function(err,result){
            // res.send('<script>alert("Successfully added");window.back();</script>')
            res.redirect('/admin/addtoFaculty')
        })
    }
}
module.exports = new AdminController;