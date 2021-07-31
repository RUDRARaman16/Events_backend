const express = require("express")
const session = require('express-session');
const cors = require("cors")
const app = express()
const dataservice = require("./services/data.service")

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))


app.use(session({
    secret: 'randomsecurestring',
    resave: false, 
    saveUninitialized: false 
}))
app.use(express.json())



const authMiddleware = (req, res, next) => {
    if (!req.session.currentUID) {
        return res.json({
            statusCode: 401,
            status: false,
            message: "Please Login"
        }
        )

    }
    else {
        next()
    }
}
app.listen(3000, () => {
    console.log("Server Started at 3000")
})
app.get('/', (req, res) => {
    res.send("this  is a get method")
})


app.post('/register', (req, res) => {

    dataservice.register(req.body.uname, req.body.userID, req.body.pswd)//same as postman
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})
app.post('/login', (req, res) => {
    dataservice.login(req, req.body.userID, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})
app.post('/addEvent', authMiddleware, (req, res) => {
    console.log(req.body)
    dataservice.addEvent(req, req.body.userID, req.body.edate, req.body.edes)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})
app.post('/viewEvent', (req, res) => {
    console.log(req.body)
    dataservice.viewEvent(req.body.userID)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})


app.post('/', (_req, res) => {
    res.send("this  is a post method")
})
app.delete('/', (_req, res) => {
    res.send("this  is a delete method")
})