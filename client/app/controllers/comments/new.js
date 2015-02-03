App.CommentsNewController = Ember.ObjectController.extend({
    body: '',

    actions: {
        create: function() {
            var self = this;
            var post = this.parentController.get('model');
            var comment = this.store.createRecord('comment', {
                post: post,
                body: this.get('body')
            });
            comment.save().then(function() {
                self.set('body', '');
            }, function(err) {
                comment.destroyRecord();
            });
        }
    }
});