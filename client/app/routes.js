App.Router.map(function() {

    this.resource('posts', function() {
        this.route('new');
    });

    this.resource('post', {path: '/post/:post_id'}, function() {
        this.route('edit');
        this.route('delete');
    });

    this.route("login");
    this.route("logout");
    this.route("signup");
});