import bodyParser from 'body-parser';
import express from 'express'
import morgan from 'morgan';
import auth_router from './routes.js'
import cookieParser from 'cookie-parser';

const app = express()
const port = 3000;

app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.static("static"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(auth_router)

app.listen(port, () => {
    console.log("server started on port: "+port)
})