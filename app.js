require("dotenv").config();
const express = require("express")
const methodoverride = require("method-override")
const app  = express();
let port = 3000;
let path = require("path")
let cookiesParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const {isActiveRoute} = require("./server/helpers/routeHelpers")

const connectDB = require("./server/config/MongoDB.js")
connectDB();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookiesParser());
app.use(methodoverride('_method'));

app.locals.isActiveRoute = isActiveRoute;

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:process.env.MongoDB_URL
    }),
}));


const expressLayout = require("express-ejs-layouts");
app.use(expressLayout);
app.set('layout',"./layouts/main.ejs")

app.use(express.static(path.join(__dirname,"/public")))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))


app.use("/",require("./server/routes/main.js"))
app.use("/",require("./server/routes/admin.js"))

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})


