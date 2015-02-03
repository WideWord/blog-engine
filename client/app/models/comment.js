App.Comment = DS.Model.extend({
    author: DS.belongsTo("user", {async: true}),
    body: DS.attr("string"),
    post: DS.belongsTo("post", {async: true}),
    date: DS.attr("date")
});