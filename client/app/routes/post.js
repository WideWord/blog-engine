App.PostRoute = Ember.Route.extend({
    model: function(params) {
        var post = this.store.find('post', params.post_id);
        return post;
    },

    setupController: function (controller, post) {
        var session = this.get('session');
        this.controller.set('model', post);
        if (session.get('isAuthenticated') && session.get('user').get('id') == post.get('author.id')) {
            this.controller.set('isOwn', true);
        } else {
            this.controller.set('isOwn', false);
        }
    }

});