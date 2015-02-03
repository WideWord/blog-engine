
App.SignupController = Ember.ObjectController.extend({
    actions: {
        signup: function() {
            var session = this.get('session');
            var user = this.get('model');

            var self = this;
            user.save().then(function() {
                session.authenticate('authenticator:local', {username: user.get('username'), password: user.get('password') }).then(function() {
                    self.transitionToRoute('posts');
                });
            }, function() {

            });
        }
    }
});