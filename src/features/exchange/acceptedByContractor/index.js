import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './acceptedByContractor.routes';
import AcceptedByContractorController from './acceptedByContractor.controller';

export default angular.module('acceptedByContractor', [uirouter, 'ngMaterial'])
    .controller('AcceptedByContractorController', AcceptedByContractorController)
    .config(routing)
    .name;
