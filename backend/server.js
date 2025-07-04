import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT, () => console.log('Server running')))
    .catch((err) => console.log(err));
