App.PostsNewController = Ember.ObjectController.extend({
    actions: {
        create: function() {
            var post = this.get('model');
            var self = this;
            post.save().then(function() {
                self.transitionToRoute('post', post);
            }, function() {})
        }
    }

});
