var express = require("express"),
    help = require("./helper_function/random_url_generator"),
    app = express(),
    mongoose = require("mongoose"),
    url_db = require("./model/url")
app.use((req, res, next) => {
    res.locals.shorten = {}
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//ejs
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

//db_connected
//require("./config/key").url, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect("mongodb://sanyam:sanyam2001@yelpcamp-shard-00-00-weo0n.mongodb.net:27017,yelpcamp-shard-00-01-weo0n.mongodb.net:27017,yelpcamp-shard-00-02-weo0n.mongodb.net:27017/test?ssl=true&replicaSet=Yelpcamp-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));

//routes
app.get("/", (req, res) => {
    res.render("home.ejs")
})
app.post("/", (req, res) => {
    try {
        var url = new url_db;
        url.original_url = req.body.url
        url.save()
        url.shortened_url = help.random_url(url.original_url, url._id)
        url.update()
        res.render("home", { shorten: url })

    } catch (err) {
        console.log(err)
    }
})

//
// getting reuest for service

app.get("/:url", (req, res) => {
    help.find_url("https://s1url.herokuapp.com/" + req.params.url, res)
})

//starting server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started at ${port}`)
})