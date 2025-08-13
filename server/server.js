const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongooose = require('mongoose')
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/products-route')
const shopCartRouter = require('./routes/shop/cart-routes')

// connect to mongodb
mongooose.connect("mongodb+srv:/Lg4H@cluster0.5utnkya.mongodb.net/").then(() => {
   console.log("MongoDb connection is Successfull")
}).catch((error) => console.log(error))


const PORT = process.env.PORT || 5000
app.use(cors({
   origin: "http://localhost:5173",
   methods: ['GET', 'POST', 'DELETE', 'PUT'],
   allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma'
   ],
   credentials: true
}))

app.use(cookieParser())
app.use(express.json())



app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
// app.use('/api/admin/products', adminProductsRouter)

app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)


app.listen(PORT, () => {
   console.log(`App is running at port no ${PORT}`)
})
