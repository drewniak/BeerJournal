import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './acceptedByOwner.routes';
import AcceptedByOwnerController from './acceptedByOwner.controller';

export default angular.module('acceptedByOwner', [uirouter, 'ngMaterial'])
    .controller('AcceptedByOwnerController', AcceptedByOwnerController)
    .config(routing)
    .name;
