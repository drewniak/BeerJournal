import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './canceled.routes';
import CanceledController from './canceled.controller';

export default angular.module('canceled', [uirouter, 'ngMaterial'])
    .controller('CanceledController', CanceledController)
    .config(routing)
    .name;
