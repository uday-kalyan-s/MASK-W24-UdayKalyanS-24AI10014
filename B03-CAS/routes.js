import { Router } from "express";
import { sessionModel, userModel } from "./db.js";
import { compare, hash } from "bcrypt";

const router = Router()

router.post('/register', (req ,res) => {
    const data = req.body;
    if(!(data.username && data.password && data.password.length >= 8)) {
        res.status(401).send("password not meeting min conditions")
        return;
    }
    hash(data.password, 0, (err, hashed_psswd) => {
        if(err) {
            throw err
        }
        let user = new userModel({
            username: data.username,
            psswd_hash: hashed_psswd
        })
        user.save().then(() => res.redirect('/login'))
    })
})

router.post('/login',(req, res) => {
    const data = req.body;
    if(!(data.username && data.password && data.password.length >= 8)) {
        res.status(401).send("error")
        return;
    }

    userModel.findOne({username: data.username})
    .then(record => {
        console.log(record)
        compare(data.password, record.psswd_hash, (err, result) => {
            if(err) {
                throw err;
            }
            if(result) {
                const sess_id = Math.floor(Math.random() * 1000000000000)
                // not accounting for 1/1000000000000 whateever probability of it being same
                const session = new sessionModel({
                    session: sess_id,
                    user: record.id
                });
                session.save()
                .then(() => {
                    res.cookie("session_id", sess_id)
                    res.redirect("/profile")
                })
                .catch(() => res.status(500).send("cannot save session"))
            }
            else {
                res.status(401).send("wrong password")
            }
            console.log("saved session");
        })
    })
    .catch(() => res.status(401).send("cannot find user"))
})

router.get('/profile', (req, res) => {
    sessionModel.findOne({session: req.cookies.session_id})
    .then(record => {
        userModel.findById(record.user._id)
        .then((user) => {
            res.status(200).send(user.username);
        })
    })
    .catch(() => {
        res.status(401).send("cannot find session");
    })
})

router.get('/register', (req, res) => {
    res.sendFile('/register.html', {root: 'static'})
})

router.get('/login', (req, res) => {
    res.sendFile('/login.html', {root: 'static'})
})

router.get('/logout', (req, res) => {
    let sess_id = req.cookies.session_id;
    sessionModel.findOneAndDelete({session: sess_id})
    .then(() => res.redirect('/'))
    .catch(() => res.status(401).send("cannot find session"))
    res.clearCookie("session_id")
})

export default router