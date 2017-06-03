import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './waitingForMe.routes';
import WaitingForMeController from './waitingForMe.controller';

export default angular.module('waitingForMe', [uirouter, 'ngMaterial'])
    .controller('WaitingForMeController', WaitingForMeController)
    .config(routing)
    .name;
