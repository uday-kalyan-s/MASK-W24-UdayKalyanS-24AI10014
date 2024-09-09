import express from "express"
import {router} from "./anime_crud.js"
import morgan from "morgan";

const app = express()
const port = 3000;
// const base_dir = "http://localhost:"+port

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('static'))
app.use('/anime_api', router)

app.listen(port, () => {
    console.log(`listening on port, ${port}`)
})