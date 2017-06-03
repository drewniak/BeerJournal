import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './closed.routes';
import ClosedController from './closed.controller';

export default angular.module('closed', [uirouter, 'ngMaterial'])
    .controller('ClosedController', ClosedController)
    .config(routing)
    .name;
