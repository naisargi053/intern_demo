const mongoose = require("mongoose");


    const userSchema = new mongoose.Schema({
        name : {
            type: String,
            required: true,
        },

       

        mailAdress: {
            type: String,
            required : true
            
        },

       status: {
        enum: ["active", "inactive"],
        type: String,
        required: true
       },

        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model("User",userSchema)