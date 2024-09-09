import { Router } from "express"
import AnimeModel from "./db.js"
import fs, { createWriteStream } from 'fs'
import https from 'https'

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

function download(url, anime_id, next, err)
{
    let file = createWriteStream(`public/anime_images/${anime_id}.jpg`);
    https.get(url, (res) => {
        res.pipe(file);
        file.on('finish', () => {
            file.close(next)
        })
        file.on('error', err)
    })
}
router.post('/', (req, res) => {
    const anime = new AnimeModel(req.body)
    download(req.body.image_url, anime.id, () => {
        anime.save()
            .then(() => res.redirect('/'))
            .catch(() => res.status(500).send("bad request"))
    }, () => res.status(500).send("cannot download file"))
})

router.put('/:id', (req, res) => {
    AnimeModel.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).send("bad request"))
})

router.delete("/:id", (req, res) => {
    AnimeModel.findByIdAndDelete(req.params.id)
        .then(() => {
            fs.rm(req)
            res.redirect('/')
        })
        .catch(() => res.status(500).send("bad request"))
})

export {router}