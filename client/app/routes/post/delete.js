App.PostDeleteRoute = Ember.Route.extend({

    afterModel: function(post) {
        var self = this;
        post.deleteRecord();
        post.save().then(function() {
            self.transitionTo('posts.index');
        })
    }

});