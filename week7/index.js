const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const { User, Todo } = require('./db');
const { auth, JWT_SECRET } = require('./auth');
const app = express();
app.use(express.json());



app.post('/signup', async (req, res) => {
    const requiredbody = z.object({
        name: z.string().min(3).max(100),
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
    })

    const parsedBody = requiredbody.safeParse(req.body);

    if (!parsedBody.success) {
        const errors = parsedBody.error.issues.map(issue => {
            issue.path[0] = issue.path[0].charAt(0).toUpperCase() + issue.path[0].slice(1).toLowerCase();
            return issue.message.replace("String", issue.path[0])
        })
        console.log(errors);
        return res.json({
            message: "Invalid format!",
            error: errors,
        })
    }
    const name = parsedBody.data.name;
    const email = parsedBody.data.email;
    const password = parsedBody.data.password;
    const hashedPasword = await bcrypt.hash(password, 5);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashedPasword,
        })
    }
    catch (err) {
        return res.status(403).json({
            message: "Something went wrong!",
        })

    }

    res.json({
        message: "Your account has been created!",
    })
})

app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email: email,
    })
    if (!user) {
        return res.status(403).json({
            message: "User does not exist!",
        })
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(403).json({
            message: "Invalid password!",
        })
    }
    const payload = { userId: user._id }
    const token = jwt.sign(payload, JWT_SECRET);
    console.log(jwt.verify(token, JWT_SECRET), user);
    res.json({
        message: "You are now logged in.",
        token: token,
    })
})

app.post('/todo', auth, async (req, res) => {
    const title = req.body.title;
    const done = req.body.done;
    console.log(req.userId);
    const todos = await Todo.create({
        userId: req.userId,
        title: title,
        done: done,
    })
    res.json({
        message: "Successfully created todo!",
    })
})

app.get('/todos', auth, async (req, res) => {
    const todos = await Todo.find({
        userId: req.userId
    }).select('userId title done')
    console.log(todos)
    res.json({
        message: "Successful!",
        result: todos,
    })
})



app.listen(3000);