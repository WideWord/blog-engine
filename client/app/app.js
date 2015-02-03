window.App = Ember.Application.create();

App.ApplicationAdapter = DS.ActiveModelAdapter.extend({
    namespace: 'api'
});

App.ApplicationSerializer = DS.ActiveModelSerializer.extend({
    primaryKey: "_id"
});
