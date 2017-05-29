import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';
import "angular-bootstrap-lightbox"
import "angular-ui-bootstrap"

import routing from './allusers.routes';
import AllUsersController from './allusers.controller';
import imageFallback from "../../app/imageFallback"

export default angular.module('allusers', [uirouter, 'ngMaterial','ui.bootstrap','bootstrapLightbox'])
    .controller('AllUsersController', AllUsersController)
    .config(routing)
    .directive('errSrc', imageFallback)
    .name;
