import { Router } from "express"
import AnimeModel from "./db.js"

const router = Router()

router.get("/test", (req, res) => {
    res.send("hello");
})

router.get('/', (req, res) => {
    AnimeModel.find().then((data) => res.json(data))
})

router.get('/:id', (req, res) => {
    AnimeModel.findById(req.params.id).then((data) => res.json(data))
})

router.post('/', (req, res) => {
    const anime = new AnimeModel(req.body)
    anime.save()
        .then(() => {
            res.status(200).json(anime)
        })
        .catch((err) => {throw err})
})

router.put('/:id', (req, res) => {
    AnimeModel.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).send("bad request"))
})

router.delete("/:id", (req, res) => {
    AnimeModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/')
        })
        .catch(() => res.status(500).send("bad request"))
})

export {router}