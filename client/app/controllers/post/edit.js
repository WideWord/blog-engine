App.PostEditController = Ember.ObjectController.extend({
    actions: {
        update: function() {
            var self = this;
            var post = this.get('model');
            post.save().then(function() {
                self.transitionTo('post.index', post);
            })
        }
    }
});