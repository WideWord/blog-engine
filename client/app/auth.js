
Ember.Application.initializer({
    name: 'authentication',
    before: 'simple-auth',
    initialize: function(container, application) {

        var store = container.lookup('store:main');

        var Authenticator = SimpleAuth.Authenticators.Base.extend({
            authenticate: function(data) {
                return new Ember.RSVP.Promise(function(ok, fail) {
                    $.post('/api/users/login', data)
                        .done(function(data) {
                            if (data.errors) {
                                fail(data.errors);
                            } else {
                                data.user = store.find('user', data.user.id);
                                ok(data);
                            }
                        })
                        .fail(function(err) {
                            fail(err);
                        });
                });
            },
            restore: function(data) {
                return new Ember.RSVP.Promise(function(ok, fail) {
                    $.post('/api/users/restore', {
                        token: data.token
                    })
                        .done(function(data) {
                            if (data.errors) {
                                fail(data.errors);
                            } else {
                                data.user = store.find('user', data.user.id);
                                ok(data);
                            }
                        })
                        .fail(function(errors) {
                            fail(errors);
                        });
                });
            }
        });

        var Authorizer = SimpleAuth.Authorizers.Base.extend({
            authorize: function(jqXHR) {
                var token = this.get("session.token");
                if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
                    jqXHR.setRequestHeader('X-Token', token);
                }
            }
        });


        container.register('authenticator:local', Authenticator);
        container.register('authorizer:local', Authorizer);
    }
});


