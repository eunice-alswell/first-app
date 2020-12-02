const User = require ('../models/userModel')

const handleError= (error) => {
    let err = {username : '', email : '', password : ''}

    if(error.message === 'incorrect username'){
        err.username = 'that username does not exit'
    }

    if (error.message === 'incorrect email'){
        err.email = 'that email is not valid'
    }

    if (error.message === 'incorrect password'){
        err.password = 'the password is incorrect'
    }

    if (error.code === '11000'){
        err.email   = 'that email is registered already'
    }
    
    if (error.message.includes('user validation failed')){
        Object.values(error.errors).forEach(({properties}) => {
            err[properties.path] = properties.message
        })
    }


    return err
}

const userCtrl = {}

//  create a User = POST method
userCtrl.createUser = async(req,res) =>{
    try{
        let newUser  = new User(req.body)
        let result = await newUser.save()
        res.status(200).send({message: 'Your account has been created',result})
    } catch(error) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}


module.exports = userCtrl

//read a user detail = GET method

userCtrl.getUserDetails = async (req,res) =>{
    try{
        let user = await User.find({username: req.body.username})
        if(!user){
            res.status(400).send({message: 'User does not exit'})
        }
        else{
            res.status(200).send ({message: ' This user exit, hurayy',user})
        }

    } catch(erro){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

//update a user detail = UPDATE/PUT method

userCtrl.UpdateUserDetail = async (req,res) =>{

    const {username,email,password} = req.body

    try{
       let user = await User.findOneAndupdate({_id: req.params.id},{username,email,password})
        res.status(200).send({message: 'updated successfully',user})
    }
    catch(error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

//delete a user details = DELETE method

userCtrl.deleteUserDetails = async (req,res) =>{
    try{
        let user = await User.findOneAndupdate({_id: req.params.id})
        res.status(200).send({message: 'Your account is deleted'})
    }
    catch(error){
        console.log(error)
    }
}