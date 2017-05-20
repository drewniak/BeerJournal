import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';
import 'angular-file-upload';

import routing from './accountSettings.routes';
import AccountSettingsController from './accountSettings.controller';
import toastr from "angular-toastr"

export default angular.module('accountSetings', [uirouter,toastr, 'ngMaterial', 'angularFileUpload'])
    .controller('AccountSettingsController', AccountSettingsController)
    .config(routing)
    .name;
