var User = require("../models").User;

module.exports = {
    authorize: function(req, res, next) {
        var token = req.get("X-Token");
        if (token) {
            User.findByToken(token, function(err, user) {
                req.user = user;
                next();
            });
        } else {
            next();
        }
    },

    authRequired: function(req, res, next) {
        if (!req.user) {
            next({
                errors: "Authorization required"
            });
        } else {
            next();
        }
    }
};