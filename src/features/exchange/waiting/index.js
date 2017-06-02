import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './waiting.routes';
import WaitingController from './waiting.controller';

export default angular.module('waiting', [uirouter, 'ngMaterial'])
    .controller('WaitingController', WaitingController)
    .config(routing)
    .name;
