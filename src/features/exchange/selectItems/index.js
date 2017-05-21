import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';
import 'angular-file-upload';

import routing from './itemsSelection.routes';
import ItemsSelectionController from './itemsSelection.controller';

export default angular.module('itemSelection', [uirouter, 'ngMaterial', 'angularFileUpload'])
    .controller('ItemsSelectionController', ItemsSelectionController)
    .config(routing)
    .name;
