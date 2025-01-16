import userModel from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import "dotenv/config"

export const register= async (req,res) =>{
    const {email, password} = req.body
    try {
    if(!email || !password){
        return res.status(400).json({
            message:'Something is missing',
            success:false
        })
    }
    const alreadyExists = await userModel.findOne({email})
    if (alreadyExists){
        return res.status(400).json({
            message:`Email: ${email}, already exists`,
            success: false
        })
    }            
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        email,
        password: hashedPassword
    })
    res.status(200).json({
        message:'Account created successfully',
        user,
        success: true
    })




    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:`Error: ${error}`,
            success: false
        })
    }
}   


export const login = async (req,res) =>{
    const {email,password} = req.body
    try {
        if(!email || !password){
            return res.status(400).json({
                message:'Something is missing',
                success: false
            })
        }

        const user = await userModel.findOne({email})
        if (!user){
            return res.status(400).json({
                message:'User not found',
                success:false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message:'Invalid credentials',
                success: false
            })
        }

        const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY, {expiresIn:'1d'})
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            message:`Welcome back ${user.email}`,
            user,
            token,
            success: true
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message:`Error: ${error}`,
            success:false
        })

    }
}

export const logout = async (req, res)=>{
    try {
      return res.status(200).cookie("token", "", {maxAge:0}).json({
        message:'Logged out successfully',
        success:true
      })
    } catch (error) {
      return res.status(500).json({
        message:'Some Error occured',
        success: false
      })
    }
  }
