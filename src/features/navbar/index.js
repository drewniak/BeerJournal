import angular from 'angular';
import 'angular-material';
import 'angular-local-storage';
import imageFallback from "../../app/imageFallback"

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
    .directive('errSrc', imageFallback)
    .controller('NavbarController', NavbarController)
    .name;