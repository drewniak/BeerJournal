import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './accepted.routes';
import AcceptedController from './accepted.controller';

export default angular.module('accepted', [uirouter, 'ngMaterial'])
    .controller('AcceptedController', AcceptedController)
    .config(routing)
    .name;
