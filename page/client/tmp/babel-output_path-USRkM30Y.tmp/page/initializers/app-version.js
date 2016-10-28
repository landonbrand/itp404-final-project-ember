define('page/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'page/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _pageConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_pageConfigEnvironment['default'].APP.name, _pageConfigEnvironment['default'].APP.version)
  };
});