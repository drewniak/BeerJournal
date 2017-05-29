import angular from 'angular';
import 'angular-material';

import ThemeController from './theme.controller';

export default angular.module('theme', ['ngMaterial'])
    .directive('themed', ['$rootScope', function($rootScope) {
        return {
            restrict: 'A',
            controller : ThemeController,
            controllerAs: 'vm',
            link: (scope, element, attrs) => {


                scope.$watch('$root.themeColor', function() {
                    let themeColor = $rootScope.themeColor;

                    let gradientStyle = "" +
                        "background: " + themeColor + "; " +
                        "background: -moz-linear-gradient(top, #fff -5%, " + themeColor + " 55%); " +
                        "background: -webkit-linear-gradient(top, #fff -5%, " + themeColor + " 55%); " +
                        "background: linear-gradient(to bottom, #fff -5%, " + themeColor + " 55%); " +
                        "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff', endColorstr='" + + themeColor + "',GradientType=0); " +
                        "background-attachment: fixed;";


                    element.attr("style", gradientStyle);
                });


            }
        }
    }])
    .controller('ThemeController', ThemeController)
    .name;