define('page/router', ['exports', 'ember', 'page/config/environment'], function (exports, _ember, _pageConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _pageConfigEnvironment['default'].locationType,
    rootURL: _pageConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('home', { path: "/" });
    this.route('page', { path: '/page/:page_name' });
    this.route('dashboard');
  });

  exports['default'] = Router;
});