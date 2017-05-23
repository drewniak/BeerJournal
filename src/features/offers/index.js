import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './offers.routes';
import OffersController from './offers.controller';

export default angular.module('offers', [uirouter, 'ngMaterial'])
    .controller('OffersController', OffersController)
    .config(routing)
    .name;
