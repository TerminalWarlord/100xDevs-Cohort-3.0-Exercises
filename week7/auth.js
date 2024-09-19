const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;



const auth = (req, res, next) => {
    const token = req.headers.authorization;
    const response = jwt.verify(token, JWT_SECRET);
    console.log(response);
    if (response) {
        req.userId = response.userId;
        next();
    }
    else {
        res.status(403).json({
            message: "Invalid Credentials!",
        });
    }
}



module.exports = {
    auth,
    JWT_SECRET
}