const express = require('express')
const jwt = require('jsonwebtoken');


const JWT_SECRET = "TEST"
const app = express()

app.use(express.json())

const users = []


app.post('/signup', (req, res, next) => {
    const body = req.body;
    if (users.find(user => user.username === body.username)) {
        return res.status(422).json({ status: "fail", message: "You have already signed up!" })
    }
    users.push({
        username: body.username,
        password: body.password,
    })
    console.log(users);
    res.status(200).json({ status: "ok", message: "You have signed up!" })
})
app.post('/signin', (req, res, next) => {
    const body = req.body;
    const userFound = users.find(user => {
        console.log(user, body);
        return user.username === body.username && user.password === body.password;
    })

    if (userFound) {
        userFound.token = jwt.sign({
            username: userFound.username
        }, JWT_SECRET);

    }
    else {
        return res.status(422).json({ status: "fail", message: "Invalid credentials!" })
    }

    res.status(200).json({ status: "ok", token: userFound.token })
})


app.get('/me', (req, res) => {
    const token = req.headers.authorization;
    const user = jwt.verify(token, JWT_SECRET);
    if (user.username) {
        res.status(200).json({ status: "ok", ...user });
    }
    else {
        res.status(422).json({ status: "fail", message: "Failed!" });
    }


})
app.listen(3000)