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


// connect to mongodb

mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
   console.log("MongoDb connection is Successfull")
}).catch((error) => console.log(error))


const PORT = process.env.PORT || 5000
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://newecom-five.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Also keep the cors middleware as backup
app.use(cors({
  origin: [
    'https://newecom-five.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));


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
