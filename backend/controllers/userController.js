import userModel from "../modals/userModals.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import validator from 'validator'


//LOGIN FUNCTION
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email })
        if(!user) {
            return res.json({ success: false, message: "User Doesn't Exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.json({ success: false, message: "Incorrect Creds" })
        }

        const token = createToken(user._id)
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// CREATE A TOKEN
const createToken = (id) => {
    return jwt.sign({ id}, process.env.JWT_SECRET)
}

// REGISTER FUNCTION
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
        const exists = await userModel.findOne({ email })
        if (exists) {
        return res.json({ success: false, message: "User Already Exists" })
        }

        // VALIDATION
        if(!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid Email" })
        }

        if(password.length < 8) {
            return res.json({ success: false, message: "Please Enter a Strong Password" })
        }

        //IF EVERYTHING WORKS
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        // NEW USER
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        })


        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser };
