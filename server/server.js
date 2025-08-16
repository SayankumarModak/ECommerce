require("dotenv").config()

const express = require('express')

const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongooose = require('mongoose')
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



const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            process.env.CLIENT_BASE_URL,
            'https://e-commerce-7xmk.vercel.app',
            'http://localhost:3000', // for local development
            'http://localhost:5173'  // for Vite dev server
        ].filter(Boolean); // Remove any undefined values
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma',
        'X-Requested-With'
    ],
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    preflightContinue: false
};

// Apply CORS middleware FIRST
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// connect to mongodb

mongooose.connect(`${process.env.MONGODB_URL}`).then(() => {
   console.log("MongoDb connection is Successfull")
}).catch((error) => console.log(error))


const PORT = process.env.PORT || 5000
// app.use(cors({
//    origin: `${process.env.CLIENT_BASE_URL}`,
//    methods: ['GET', 'POST', 'DELETE', 'PUT'],
//    allowedHeaders: [
//       'Content-Type',
//       'Authorization',
//       'Cache-Control',
//       'Expires',
//       'Pragma'
//    ],
//    credentials: true
// }))

app.use(cookieParser())
app.use(express.json())



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
