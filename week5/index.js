const express = require("express");

const app = express()


app.use('/multiply', (req, res) => {
    const a = +req.query.a;
    const b = +req.query.b;
    res.json({ c: a * b });
})

app.use('/add', (req, res) => {
    const a = +req.query.a;
    const b = +req.query.b;
    res.json({ c: a + b });
})

app.listen(3000)