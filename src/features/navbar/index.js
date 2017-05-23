import angular from 'angular';
import 'angular-material';
import "angular-cookies"

import NavbarController from './navbar.controller';

export default angular.module('navbar', ['ngMaterial', 'ngCookies'])
    .directive('navbar', [function() {
        return {
            template: require('./navbar.html'),
            restrict: 'E',
            controller : NavbarController,
            controllerAs: 'vm'
        }
    }])
    .controller('NavbarController', NavbarController)
    .name;