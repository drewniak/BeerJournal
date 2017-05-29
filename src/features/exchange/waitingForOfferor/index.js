import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './waitingForOfferor.routes';
import WaitingForOfferorController from './waitingForOfferor.controller';

export default angular.module('waitingForOfferor', [uirouter, 'ngMaterial'])
    .controller('WaitingForOfferorController', WaitingForOfferorController)
    .config(routing)
    .name;
