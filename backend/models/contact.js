const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true},
    reason:{type:String, required:true, 
        enum:[
        "Academy / Courses",
        "Community / Discord",
        "Technical Question",
        "Partnership",
        "Something Else"
        ]
    },
    message:{type:String, required:true}
});

const Contact = mongoose.model('Contact', ContactSchema )
module.exports = Contact;
