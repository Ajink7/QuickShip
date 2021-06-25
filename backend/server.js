import express from 'express'
import connectDB from './config/db.js'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import bodyParser from 'body-parser'
connectDB()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send('API')
})

app.use('/api/products/', productRoutes)
app.use('/api/users/', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log('Server is Running'))
