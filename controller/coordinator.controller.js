const FaculityModel = require('../models/faculity')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;

let update =(req,res)=>{
    AccountModel.findById(req.params.id)
    .then((data)=>
        FaculityModel.find(function(err,data){
        }).then(data1=>{
        res.render('coordinator/updateCoordinator',{account:data,faculity:data1})

        })
    )
}
let deleteCoordinator = (req,res)=>{
    AccountModel.findById({_id:req.params.id},function(err,data){
        let slug = data.slug
        AccountModel.deleteOne({
            _id :  req.params.id
        })
        .then(()=>{
            res.redirect('/faculity/Coordinator/'+ slug)
        })
    })
    
    
}
let doupdate =(req,res)=>{
    
    AccountModel.updateOne({
        _id : req.params.id
    }, req.body)
    .then(()=>{
        res.redirect('/faculity/Coordinator/'+ req.body.slug)
    })
}

module.exports ={
    doupdate,
    deleteCoordinator,
    update

}