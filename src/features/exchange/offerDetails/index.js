import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';
import 'angular-file-upload';

import routing from './offerDetails';
import OfferDetailsController from './offerDetails.controller';

export default angular.module('offerDetails', [uirouter, 'ngMaterial'])
    .controller('OfferDetailsController', OfferDetailsController)
    .config(routing)
    .name;
