const express = require("express")
const app = express()
app.use(express.json())

const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://shakhzodnematullokh:0099@cluster0.qrai2.mongodb.net/first?retryWrites=true&w=majority')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_name: { type: String, required: true },
    user_age: { type: Number, required: true }
}, {
    collection: "user_info"
})

const users = mongoose.model("UserModel", UserSchema)

const PostsSchema = new Schema ({
    post_title: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, ref: "UserModel"}
}, {
    collection: "post_info"
})

const posts = mongoose.model("PostModel", PostsSchema)

app.get("/users", async(req, res) => {
    try {
        const userInfo = await users.find()
        res.send(userInfo)
    } catch (e) {
        console.log(e);
    }
})

app.post("/newUser", async(req, res) => {
    try {
        const { name, age } = req.body
        const newUser = new users({user_name: name, user_age: age})
        await newUser.save()
        res.send("ok")
    } catch (e) {
        console.log(e);
    }
})

app.post("/newPost", async(req, res) => {
    try {
        const { title, author } = req.body
        const newPost = new posts({post_title: title, author_id: author})
        await newPost.save()
        res.send("ok")
    } catch (e) {
        console.log(e);
    }
})

app.get("/posts", async(req, res) => {
    try {
        const postInfo = await posts.find().populate("author_id")
        res.send(postInfo)
    } catch (e) {
        console.log(e);
    }
})

app.listen(6060, console.log("on 6060"))