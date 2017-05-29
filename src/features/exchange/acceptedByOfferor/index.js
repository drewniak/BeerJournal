import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './acceptedByOfferor.routes';
import AcceptedByOfferorController from './acceptedByOfferor.controller';

export default angular.module('acceptedByOfferor', [uirouter, 'ngMaterial'])
    .controller('AcceptedByOfferorController', AcceptedByOfferorController)
    .config(routing)
    .name;
