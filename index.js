const express = require("express");
const route = require('./routre');
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://amanprajapat82780:Lucky82780@newproject.3qdy8y3.mongodb.net/Students?retryWrites=true&w=majority",
  { UseNewUrlParser: true }
).then(() => console.log("Mongo-Db is connected"))
.catch((err) => console.log(err.message))

app.use("/", route);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening at " + (process.env.PORT || 3000))
})