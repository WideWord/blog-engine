App.SignupRoute = Ember.Route.extend({
    beforeModel: function() {
        if (this.get('session').get('isAuthenticated')) {
            this.transitionTo('posts');
        }
    },

    model: function() {
        return this.store.createRecord('user');
    }
});