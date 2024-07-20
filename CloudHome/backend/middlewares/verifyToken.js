const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({
            status: "fail",
            message: "Unauthorized",
            data: {},
        });
        return;
    }
    authorization="Bearer " + authorization;
    console.log(authorization)
    let token = authorization?.split(" ")?.[1];
    console.log(token)
    if (!token) {
        res.status(401).json({
            status: "fail",
            message: "Token not found",
            data: {},
        });
        return;
    }

    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjE0NzE2NzcsImRhdGEiOnsiX2lkIjoiNjY5OGVjODg3YTc5NGQyOTdlMzQwYzAyIiwiZW1haWwiOiJtYW5payJ9LCJpYXQiOjE3MjE0NjgwNzd9.UQo8hm1VKxHI6UistyFIuTMe7616ciZvgdOEAtLNrxo"

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                status: "fail",
                message: "Unauthorized",
                data: {},
            });
        } else {
            req.user = { email: decoded.data.email };
            next();
        }
    });
};

module.exports = verifyToken;