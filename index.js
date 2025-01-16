import express from "express"
import "dotenv/config"
import connectDB from "./utils/db.js"
import morgan from "morgan"
import errorHandler from "./middleware/errorHandler.js"
import userRouter from "./routes/user.route.js"
import taskRouter from "./routes/task.route.js"

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(errorHandler)
app.use('/tasks',taskRouter)
app.use('/auth',userRouter)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    connectDB()
    console.log('Server is connected to port: ',PORT)
})
