import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';
import 'angular-file-upload';
import moment from 'angular-moment';

import routing from './events.routes';
import EventsController from './events.controller';
import imageFallback from "../../app/imageFallback"

export default angular.module('events', [uirouter, moment,'ngMaterial', 'angularFileUpload'])
    .controller('EventsController', EventsController)
    .config(routing)
    .directive('errSrc', imageFallback)
    .name;
