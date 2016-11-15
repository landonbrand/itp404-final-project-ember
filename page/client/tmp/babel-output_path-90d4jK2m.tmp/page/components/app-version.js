define('page/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'page/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _pageConfigEnvironment) {

  var name = _pageConfigEnvironment['default'].APP.name;
  var version = _pageConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});