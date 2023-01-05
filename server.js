const express=require("express");
const mongoose = require("mongoose");
const path=require('path');
const Article=require('./models/article');
const articleRouter=require("./routes/articles");
const methodoverride=require("method-override")
const app=express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/blog');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
app.use(methodoverride('_method'))
app.use("/articles", articleRouter);

app.get("/", async(req, res)=>{
    const articles= await Article.find().sort({createdAt: "desc"})
    res.render("articles/index", {articles: articles});
})

app.listen(5000, ()=>{
    console.log("connected");
});