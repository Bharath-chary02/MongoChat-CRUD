const mongoose = require("mongoose");
const Chat = require("./models/chat");

main().then(()=>{
    console.log("Connection success")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

const allchats = [
  {
    from: "Rajesh",
    msg: "Good morning, Riya. How are you today?",
    to: "Riya",
    created_at: new Date("2025-09-05T09:00:00")
  },
  {
    from: "Riya",
    msg: "Good morning, Rajesh. I am doing well, thank you. How about you?",
    to: "Rajesh",
    created_at: new Date("2025-09-05T09:02:00")
  },
  {
    from: "Anil",
    msg: "Hello Rajesh, are you available for a quick discussion regarding the project?",
    to: "Rajesh",
    created_at: new Date("2025-09-05T09:10:00")
  },
  {
    from: "Rajesh",
    msg: "Hi Anil, I'm currently occupied with documentation. Can we connect after 3 PM?",
    to: "Anil",
    created_at: new Date("2025-09-05T09:12:00")
  },
  {
    from: "Suresh",
    msg: "Rajesh, don't forget about the client meeting scheduled at 4 PM.",
    to: "Rajesh",
    created_at: new Date("2025-09-05T09:15:00")
  },
  {
    from: "Rajesh",
    msg: "Noted, Suresh. I'll be ready with the presentation.",
    to: "Suresh",
    created_at: new Date("2025-09-05T09:17:00")
  },
  {
    from: "Riya",
    msg: "Rajesh, please review the updated report before the meeting.",
    to: "Rajesh",
    created_at: new Date("2025-09-05T09:20:00")
  }
];

Chat.insertMany(allchats);