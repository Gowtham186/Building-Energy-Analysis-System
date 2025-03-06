import express from 'express'
import dotenv from 'dotenv'
import configureDb from './config/db.js'
import deisgnRoutes from './routes/design-routes.js'

const app = express()
dotenv.config()
configureDb()

app.use(express.json())

app.use('/api', deisgnRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('server is running')
})