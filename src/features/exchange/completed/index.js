import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './completed.routes';
import CompletedController from './completed.controller';

export default angular.module('completed', [uirouter, 'ngMaterial'])
    .controller('CompletedController', CompletedController)
    .config(routing)
    .name;
