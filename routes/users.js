var express = require('express');
var User = require('../models').User;

var r = express.Router();

r.get('/:user_id', function(req, res) {
    res.send({
        user: {
            _id: req.params.user_id,
            username: req.params.user_id
        }
    });
});

r.post('/login', function(req, res, next) {
    User.findByIdPassword(req.body.username, req.body.password, function(err, user) {
        if (err) {
            if (err == "Not found") {
                next({
                    errors: "Неверное имя пользователя или пароль"
                });
            } else {
                next(err);
            }
        } else {
            user.generateToken(function (err, token) {
                if (err) {
                    return next(err);
                }
                res.send({
                    user: {
                        id: user._id,
                        username: user._id
                    },
                    token: token
                });
            });
        }
    });
});

r.post('/restore', function(req, res, next) {
    User.findByToken(req.body.token, function(err, user) {
        if (err) {
            next({
                errors: "Not found"
            });
        } else {
            res.json({
                user: {
                    id: user._id,
                    username: user._id
                },
                token: req.body.token
            });
        }
    });
});

r.post('/', function(req, res, next) {
    if (req.body.user.username == '' || !req.body.user.username) {
        return next({
            errors: {
                username: ["Введите имя пользователя"]
            }
        });
    }
    var user = new User({
        _id: req.body.user.username,
        password: req.body.user.password
    });
    user.save(function (err) {
        if (err) {
            if (err.code == 11000) {
                return next({
                    errors: {
                        username: ["Такой пользователь уже существует"]
                    }
                });
            } else {
                return next(err);
            }
        }
        res.send({
            users: [{_id: user._id, username: user._id}]
        });
    });

});

module.exports = r;
