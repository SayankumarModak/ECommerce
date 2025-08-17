

const bcrypt = require('bcryptjs')
const User = require('../../models/User');
const jwt = require('jsonwebtoken')

// const { model } = require('mongoose');
const registerUser = async (req, res) => {
   try {
      const { userName, email, password } = req.body;
      console.log(userName, email, password)

      const checkUser = await User.findOne({ email })
      if (checkUser) {
         // here due to .status(400).we didnot getting
         return res.json({
            success: false,
            message: "User Already Exist, Try to login"
         })
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
         userName, password: hashedPassword, email,
      })

      res.status(200).json({
         success: true,
         message: "User Registered Successfully",
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Some error occured",
      });
   }
}

const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email) {
         return res.json({ message: "Email is required" })
      }
      const checkUser = await User.findOne({ email })
      if (!checkUser) {
         return res.json({
            success: false,
            message: 'User doesnot exsit'
         })
      }

      const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)

      if (!checkPasswordMatch) {
         return res.json({
            success: false,
            message: "Password doesnot match"
         })
      }

      const token = jwt.sign({
         id: checkUser._id,
         role: checkUser.role,
         email: checkUser.email,
         userName: checkUser.userName,
      }, ' SECRET_KEY', {
         expiresIn: '60m'
      })

      // res.cookie("token", token, {
      //    httpOnly: true,
      //    secure: true,
      //    samesite: "none"
      // }).json({
      //    success: true,
      //    message: "User logged in successfully",
      //    user: {
      //       email: checkUser.email,
      //       role: checkUser.role,
      //       id: checkUser._id,
      //       userName: checkUser.userName,
      //    }
      // })
      res.status(200).json({
         success: true,
         message: "logged in successfull!",
         token,
         user: {
            email: checkUser.email,
            role: checkUser.role,
            id: checkUser._id,
            userName: checkUser.userName,
         }
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Some error occured",
      });
   }
}

// this have to check
const logoutUser = (req, res) => {
   res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      samesite: "none",
      secure: true

   }).json({
      success: true,
      message: "User logout successfully"
   })
}


// need middleware so when we try to login we have to check their role and redirect
// const authMiddleware = async (req, res, next) => {
//    try {

//       const token = req.cookies.token;
//       // console.log("token is", token)
//       if (!token) {
//          return res.json({
//             success: false,
//             message: "Unauthorized User"
//          })
//       }
//       const decoded = jwt.verify(token, ' SECRET_KEY')
//       req.user = decoded;
//       // console.log("reached here")
//       next();

//    } catch (error) {
//       console.log(error)
//       res.status(401).json({
//          success: false,
//          message: "Unauthorised user!",
//       });
//    }
// }

const authMiddleware = async (req, res, next) => {
   try {

      const authHeader = req.headers['Authorization'];
      const token = authHeader && authHeader.split(' ')[1]
      if (!token) {
         return res.json({
            success: false,
            message: "Unauthorized User"
         })
      }
      const decoded = jwt.verify(token, ' SECRET_KEY')
      req.user = decoded;
      // console.log("reached here")
      next();

   } catch (error) {
      console.log(error)
      res.status(401).json({
         success: false,
         message: "Unauthorised user!",
      });
   }
}





module.exports = { registerUser, loginUser, logoutUser, authMiddleware }