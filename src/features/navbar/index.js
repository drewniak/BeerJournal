import angular from 'angular';
import 'angular-material';
import 'angular-local-storage';

import NavbarController from './navbar.controller';

export default angular.module('navbar', ['ngMaterial', 'LocalStorageModule'])
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