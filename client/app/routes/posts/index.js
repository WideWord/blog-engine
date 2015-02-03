App.PostsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('post');
    }
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('posts.index');
    }
});