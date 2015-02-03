App.PostsNewRoute = Ember.Route.extend({

    beforeModel: function() {
        if (!this.get('session').get('isAuthenticated')) {
            this.transitionTo('login');
        }
    },

    model: function() {
        return this.store.createRecord('post');
    },

    deactivate: function() {
        var post = this.controller.get("model");
        if (post.get('isNew')) {
            post.destroyRecord();
        }
    }
});