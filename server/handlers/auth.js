const db = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// signup and signin, if successfully done, will return a decoded token
exports.signin = async function (req, res, next) {
    let searchQuery = "select * from User where email=\"" + req.body.email + "\";";
    db.query(searchQuery, async function (err, results) {
        if (err || results.length === 0) {
            return next({
                status: 400,
                message: "Invalid email/password."
            });
        } else {

            let {email, username, img} = results[0];
            let isMatch = await bcrypt.compare(req.body.password, results[0].password);
            let flag = "Welcome back!";

            if (isMatch) {
                let token = jwt.sign({
                    email,
                    username,
                    img
                }, process.env.SECRET_KEY);

                return res.status(200).json({
                    email,
                    username,
                    img,
                    token,
                    flag
                });

            } else {
                return next({
                    status: 400,
                    message: "Invalid email/password."
                });
            }
        }
    });
};

exports.signup = async function (req, res, next) {
    let person = {
        email: req.body.email,
        username: req.body.username,
        img: req.body.img,
        password: req.body.password
    };

    person.password = await bcrypt.hash(person.password, 10);

    db.query('insert into User set ?', person, function (err) {
        if (err) {
            if (err.errno === 1062) {
                err.message = "This email/username has been registered! Try another one.";
            }
            return next({
                status: 400,
                message: err.message
            });
        } else {
            let {email, username, img} = person;
            let flag = "Thank you for joining us!";

            let token = jwt.sign({
                email,
                username,
                img
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                email,
                username,
                img,
                token,
                flag
            });
        }
    });
};