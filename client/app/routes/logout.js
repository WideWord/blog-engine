App.LogoutRoute = Ember.Route.extend({
    beforeModel: function() {
        var session = this.get('session');
        session.invalidate();
        this.transitionTo('posts');
    }
});
