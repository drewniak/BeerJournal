import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';


import routing from './exchange.routes';
import ExchangeController from './exchange.controller';

export default angular.module('exchange', [uirouter, 'ngMaterial'])
    .controller('ExchangeController', ExchangeController)
    .config(routing)
    .name;
