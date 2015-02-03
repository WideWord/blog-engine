var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    author: { type: String, ref: 'User' },
    body: String,
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    date: Date
});

CommentSchema.path('body').required(true, 'Комментарий не может быть пустым');

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;