import mongoose, { model, Schema } from "mongoose";
await mongoose.connect('mongodb://127.0.0.1:27017/auth_proj')

const userSchema = new Schema({
    username: String,
    psswd_hash: String
})

const sessionSchema = new Schema({
    session: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const userModel = model('User', userSchema)
const sessionModel = model('Session', sessionSchema)

export {userModel, sessionModel}