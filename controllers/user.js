const User_model = require("../models/User_model");
const userModel = require("../models/User_model")

//CRUD Operation

//create 

exports.createUser = async(req,res) =>{

    try {
    
       const user = await userModel.create(req.body)
       return res.status(201).send({
         success : true,
         user
       });
    } catch (error) {
        console.log(error,"error")
        return res.status(500).send({status: false, message: "Internal server Error"})
    }
} 


//Read

exports.getusers = async(req,res) => {
   try
   { 
    const user = await User_model.find()
    if(!user.length){
        return res.status(200).json({status: false , message:"no data found"})
    }

    return res.status(200).send({status:true, user})}

   catch(error){
    console.log(error,"error")
    return res.status(500).send({status: false, message:"internal server error"})
   }
}


exports.getuser = async(req,res) =>{
    try {

     const users = await User_model.findById(req.params.id)
     console.log(users, "users")
     if(!users){
                  return res.status(200).send({status: false, message: "please provide correct id"})
     }
     return res.status(200).send({status:true ,users})
        
    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({status:false, message:"internal server error"})
    }
    
}

//Update

exports.updateUser = async(req,res) => {
    let user = await User_model.findById(req.params.body)
    console.log(user,"users")

    if(!user){
         
        return res.status(200).send({status: false , message:"please provide correct ID "})
    }

    user = await User_model.findByIdAndUpdate(req.params.id.req.body,{
        new :  true,
        runValidators : true,
        useFindAndModify : false
    })

    return res.status(200).send({
        status: true,
        user
    })
}




//Delete

exports.deleteUser = async(req,res) => {
    let user = await User_model.findById(req.params.id)
    if(!user){

        return res.status(200).json({status: false, message: "please provide correct id"})
    }

    user = await User_model.findByIdAndDelete(req.params.id)
        
    res.status(200).json({
        success:true,
        message : "Delete sucessfully"
    })   
}






