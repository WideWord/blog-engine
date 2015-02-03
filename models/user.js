var mongoose = require('mongoose');
var redis = require('../utils/redis');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: String,
    passwordHash: String
});

UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.set('passwordHash', crypto.createHash('md5').update(password).digest('hex'));
});

UserSchema.path('passwordHash').validate(function () {
    if (!this._password) {
        this.invalidate('password', 'Введите пароль');
    }
    if (this._password.length < 4) {
        this.invalidate('password', 'Слишком короткий пароль');
    }
}, null);

UserSchema.methods.generateToken = function(cb) {
    var tokenBuf;
    try {
        tokenBuf = crypto.randomBytes(64);
    } catch (ex) {
        tokenBuf = crypto.pseudoRandomBytes(64);
    }
    var token = tokenBuf.toString('hex');
    redis.set("auth_token:" + token, this.id, function(err, reply) {
        cb(err, token);
    });
}

UserSchema.statics.findByToken = function(token, cb) {
    redis.get("auth_token:" + token, function (err, id) {
        if (err) {
            cb(err);
        } else {
            User.findById(id, cb);
        }
    });
};

UserSchema.statics.findByIdPassword = function(id, password, cb) {
    User.findById(id, function(err, user) {
        if (err) {
            return cb(err);
        }
        if (!user) {
            return cb("Not found");
        }
        if (user.passwordHash == crypto.createHash('md5').update(password).digest('hex')) {
            cb(null, user);
        } else {
            cb("Not found");
        }
    });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;