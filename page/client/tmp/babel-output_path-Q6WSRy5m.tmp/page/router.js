define('page/router', ['exports', 'ember', 'page/config/environment'], function (exports, _ember, _pageConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _pageConfigEnvironment['default'].locationType,
    rootURL: _pageConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('navtest');
    this.route('home', { path: "/" });
    this.route('create');
    this.route('template-tests');
    this.route('editing-tests');
    this.route('login');
    this.route('signup');
    this.route('page', { path: '/page/:page_name' });
  });

  exports['default'] = Router;
});