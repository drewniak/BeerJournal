import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';
import 'angular-route'
import 'angular-jk-rating-stars';

import routing from './itemDetails.routes';
import itemDetailsController from './itemDetails.controller';

export default angular.module('itemDetailsController', [uirouter, 'ngMaterial', 'ngRoute','jkAngularRatingStars'])
    .controller('itemDetailsController', itemDetailsController)
    .config(routing)
    .name;