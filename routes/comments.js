var express = require('express');
var models = require("../models");
var Comment = models.Comment;
var Post = models.Post;
var authRequired = require("../utils/auth").authRequired;

var r = express.Router();

r.post('/', authRequired, function(req, res, next) {
    var comment = new Comment(req.body.comment);
    comment.post = req.body.comment.post_id;
    comment.author = req.user;
    comment.date = new Date();
    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }

        Post.findByIdAndUpdate(comment.post, {
            $push: {
                comments: comment
            }
        }).exec(function() {
            res.send({comment: comment});
        });
    });
});

r.get('/:comment_id', function(req, res, next) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            return next(err);
        }
        res.send({comment: comment});
    });
});

module.exports = r;