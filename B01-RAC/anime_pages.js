import { Router } from "express"
import AnimeModel from "./db.js"
import { createWriteStream, rm } from 'fs'

const router = Router()

export default router