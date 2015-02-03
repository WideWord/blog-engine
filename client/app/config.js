window.ENV = {
    "simple-auth" : {
        store: 'simple-auth-session-store:local-storage',
        authorizer: 'authorizer:local',
        authenticationRoute: 'login',
        routeAfterAuthentication: 'posts',
        routeIfAlreadyAuthenticated: 'posts'
    }
}