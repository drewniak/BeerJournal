import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './waitingForContractor.routes';
import WaitingForContractorController from './waitingForContractor.controller';

export default angular.module('waitingForContractor', [uirouter, 'ngMaterial'])
    .controller('WaitingForContractorController', WaitingForContractorController)
    .config(routing)
    .name;
