/**
 * Created by wojciech_dymek on 22.04.17.
 */
import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';

import routing from './addNewItem.routes';
import AddNewItemController from './addNewItem.controller';

export default angular.module('AddNewItemController', [uirouter, 'ngMaterial','ui.bootstrap', 'base64'])
    .controller('AddNewItemController', AddNewItemController)
    .config(routing)
    .name;