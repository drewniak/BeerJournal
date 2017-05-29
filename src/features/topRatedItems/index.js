import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-material';
import moment from 'angular-moment';

import routing from './topRatedList.routes';
import TopRatedList from './topRatedList.controller';

export default angular.module('topRatedList', [uirouter, moment,'ngMaterial'])
    .controller('TopRatedListController', TopRatedList)
    .config(routing)
    .name;
