var express = require('express');
var Post = require("../models").Post;
var authRequired = require("../utils/auth").authRequired;
var r = express.Router();

r.get('/', function(req, res, next) {
    Post.find({}).sort({date: "desc"}).exec(function(err, posts) {
        if (err) {
            return next(err);
        }
        res.send({posts: posts});
    });
});

r.get("/:post_id", function(req, res, next) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) {
            return next(err);
        }
        res.send({post: post});

    });
});

r.post('/', authRequired, function(req, res, next) {
    var post = new Post(req.body.post);
    post.date = new Date();
    post.author = req.user;
    post.save(function(err, post) {
        if (err) {
            return next(err);
        }
        res.send({post: post});
    });
});

r.put('/:post_id', authRequired, function(req, res, next) {
    Post.findOneAndUpdate({
        _id: req.params.post_id,
        author: req.user._id
    }, {
        title: req.body.post.title,
        body: req.body.post.body
    }, function(err) {
        if (err) {
            return next(err);
        }

        Post.findById(req.params.post_id, function(err, post) {
            if (err) {
                return next(err);
            }
            res.send({post: post});
        });
    });
});

r.delete('/:post_id', authRequired, function(req, res, next) {
    Post.findOneAndRemove({
        _id: req.params.post_id,
        author: req.user._id,
    }, function(err, len) {
        if (err) {
            next({errors: "Internal server error"});
        }
        res.json({});
    });
});

module.exports = r;
