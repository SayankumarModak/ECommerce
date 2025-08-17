require("dotenv").config()

const express = require('express')

const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/products-route')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require("./routes/shop/address-router");

const shopOrderRouter = require("./routes/shop/order-routes");
const adminOrderRouter = require('./routes/admin/order-routes')

const shopSearchRouter = require('./routes/shop/search-routes')
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require('./routes/common/feature-routes')

console.log('CLIENT_BASE_URL:', process.env.CLIENT_BASE_URL);
console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'Connected' : 'Missing');
console.log('PORT:', process.env.PORT);
// connect to mongodb

mongoose.connect(process.env.MONGODB_URL).then(() => {
   console.log("MongoDb connection is Successfull")
}).catch((error) => console.log(error))


const PORT = process.env.PORT || 5000


app.use(
  cors({
    origin:"https://ecomclient-ashy.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"], // Added OPTIONS
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);




app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use("/api/admin/orders", adminOrderRouter);

app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)

app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);

app.use("/api/shop/review", shopReviewRouter);


app.use("/api/common/feature", commonFeatureRouter);
app.listen(PORT, () => {
   console.log(`App is running at port no ${PORT}`)
})


module.exports = app; 
