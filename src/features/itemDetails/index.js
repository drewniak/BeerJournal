import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';
import 'angular-route'

import routing from './itemDetails.routes';
import itemDetailsController from './itemDetails.controller';
import imageFallback from "../../app/imageFallback"

export default angular.module('itemDetailsController', [uirouter, 'ngMaterial', 'ngRoute'])
    .controller('itemDetailsController', itemDetailsController)
    .config(routing)
    .directive('errSrc', imageFallback)
    .name;