import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import configureDb from './config/db.js'
import deisgnRoutes from './routes/design-routes.js'
import analysisRoutes from './routes/analysis-routes.js'

const app = express()
dotenv.config()
configureDb()

app.use(express.json())
app.use(cors())

app.use('/api', deisgnRoutes)
app.use('/api', analysisRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('server is running')
})