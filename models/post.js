var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    body: String,
    author: { type: String, ref: 'User' },
    date: Date,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.path('title').required(true, 'Введите заголовок поста');
PostSchema.path('body').required(true, 'Введите содержание поста');

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;