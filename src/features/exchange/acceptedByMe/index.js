import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './acceptedByMe.routes';
import AcceptedByMeController from './acceptedByMe.controller';

export default angular.module('acceptedByMe', [uirouter, 'ngMaterial'])
    .controller('AcceptedByMeController', AcceptedByMeController)
    .config(routing)
    .name;
