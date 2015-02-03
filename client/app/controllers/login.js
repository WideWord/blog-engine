
App.LoginController = Ember.Controller.extend({
    errorMessage: null,
    actions: {
        login: function() {
            this.set('errorMessage', null);
            var data = this.getProperties('username', 'password');
            var session = this.get('session');

            var self = this;
            session.authenticate('authenticator:local', data).then(function() {
                self.transitionToRoute('posts');
            }, function(err) {
                self.set('errorMessage', err.responseJSON.errors);
            }).catch(function(err) {
                self.set('errorMessage', err.errors);
            });
        }
    }
});