import mongoose, { model, Schema } from "mongoose";
await mongoose.connect('mongodb://127.0.0.1:27017/test')

const AnimeSchema = new Schema({
    name: String,
    type: ['movie', 'series'],
    release_year: Number,
    status: ['releasing', 'airing', 'completed'],
    image_url: String
})

const AnimeModel = model('Anime', AnimeSchema)

export default AnimeModel