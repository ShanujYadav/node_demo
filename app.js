import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50kb" }))
app.use(express.static("public"))
app.use(cookieParser())



// ---------Routes Import---------
import loginRouter from './src/routes/login.routes.js'
import vendorFinancingRouter from './src/routes/vendorFinancing.routes.js'
import userRouter from './src/routes/user.routes.js'
import leadsRouter from './src/routes/leads.routes.js'
import adminRouter from './src/routes/admin.routes.js'
import { headerVerify } from './src/middlewares/headerVerify.middle.js'
import { accessTokenVerify } from './src/middlewares/accessTokenVerify.middle.js'



//------------Routes Declaration ---------------

app.use('/api/altaneo/v1/login', headerVerify, loginRouter)
app.use('/api/altaneo/v1/leads', headerVerify, leadsRouter)

app.use('/api/altaneo/v1/admin', headerVerify, adminRouter)

app.use('/api/altaneo/v1/user', accessTokenVerify, userRouter)
app.use('/api/altaneo/v1/service/vendorFinancing', accessTokenVerify,vendorFinancingRouter)

console.log("app pid--",process.env.PID)


export { app }