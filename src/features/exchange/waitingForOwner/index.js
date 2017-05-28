import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './waitingForOwner.routes';
import WaitingForOwnerController from './waitingForOwner.controller';

export default angular.module('waitingForOwner', [uirouter, 'ngMaterial'])
    .controller('WaitingForOwnerController', WaitingForOwnerController)
    .config(routing)
    .name;
