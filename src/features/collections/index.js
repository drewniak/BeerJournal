import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';
import 'angular-file-upload';

import routing from './collections.routes';
import CollectionsController from './collections.controller';
import imageFallback from '../../app/imageFallback'

export default angular.module('collections', [uirouter, 'ngMaterial', 'angularFileUpload'])
    .controller('CollectionsController', CollectionsController)
    .config(routing)
    .directive('errSrc',imageFallback)
    .name;
