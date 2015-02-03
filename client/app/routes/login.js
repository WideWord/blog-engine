App.LoginRoute = Ember.Route.extend({
    beforeModel: function() {
        if (this.get('session').get('isAuthenticated')) {
            this.transitionTo('posts');
        }
    }
});
