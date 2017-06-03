import angular from 'angular';
import 'angular-material';
import "angular-cookies"
import imageFallback from "../../app/imageFallback"

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
    .directive('errSrc', imageFallback)
    .controller('NavbarController', NavbarController)
    .name;