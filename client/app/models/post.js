App.Post = DS.Model.extend({
    title: DS.attr("string"),
    body: DS.attr("string"),
    author: DS.belongsTo("user", {async: true}),
    date: DS.attr("date"),
    comments: DS.hasMany("comment", {async: true})
});