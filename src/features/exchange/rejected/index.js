import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './rejected.routes';
import RejectedController from './rejected.controller';

export default angular.module('rejected', [uirouter, 'ngMaterial'])
    .controller('RejectedController', RejectedController)
    .config(routing)
    .name;
