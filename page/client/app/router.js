import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('navtest');
  this.route('home', {path: "/"});
  this.route('create');
  this.route('template-tests');
  this.route('editing-tests');
  this.route('login');
  this.route('signup');
});

export default Router;
