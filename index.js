require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const path = require("path");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

main().then(()=>{
    console.log("Connection success")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

// Index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("chats", {chats});
});

// New route
app.get("/chats/new", (req, res) => {
    res.render("new");
});

// Post route for New chat
app.post("/chats", (req, res) => {
    let {from, msg, to} = req.body;
    let newchat = new Chat(
        {
            from : from,
            msg : msg,
            to : to,
            created_at : new Date()
        }
    );

    newchat.save().then(()=>{
        // console.log("success")
    });
    // console.log(newchat);
    res.redirect("/chats");
});

// Edit route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    // console.log(chat);
    res.render("edit", {chat});
});

// Update route
app.patch("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let chat = await Chat.findByIdAndUpdate(id, {msg : newMsg}, {runValidators : true, new : true});
    let newUpdated = new Date();
    let chat2 = await Chat.findByIdAndUpdate(id, {updated_at : newUpdated});
    res.redirect("/chats");
});

// Destory route
app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

// home
app.get("/", (req, res) => {
  res.redirect("/chats");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Listening on port", PORT));
