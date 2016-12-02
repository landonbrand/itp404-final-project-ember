define('page/tests/helpers/resolver', ['exports', 'page/resolver', 'page/config/environment'], function (exports, _pageResolver, _pageConfigEnvironment) {

  var resolver = _pageResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _pageConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _pageConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});