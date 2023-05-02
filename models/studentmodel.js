const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : true ,
        
    } ,

    rollno : {
        type : String ,
        required : true ,
        unique: true 
    } ,
    branch : {
        type : String ,
        required : true
    } ,
    age : {
        type : String ,
       
    } ,
    gender : {
        type : String ,
        
    } 
})

module.exports = mongoose.model('studentdata' , studentSchema)