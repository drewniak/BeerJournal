import angular from "angular";
import uirouter from "angular-ui-router";
import "angular-material";
import "angular-base64"
import "angular-bootstrap-lightbox"
import "angular-ui-bootstrap"
import "angular-sessionstorage"
import "angular-route"

import "../style/app.css";
import "../style/galeryListStyle.css";
import "../style/itemDetails.css"

import routing from "./app.config.js";
import collections from "../features/collections";
import login from "../features/login";
import registration from "../features/registration"
import home from "../features/home";
import allusers from "../features/allusers"
import AddNewItemController from "../features/addNewItem"
import itemDetailsController from "../features/itemDetails"

let app = () => {
    return {
        template: require('./app.html'),
        controllerAs: 'app'
    }
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uirouter, collections, login, registration, home, allusers, itemDetailsController, AddNewItemController, 'ngSessionStorage', 'ngMaterial','base64', 'ngRoute','ui.bootstrap','bootstrapLightbox'])
    .directive('app', app)
    .config(routing)
    .run(run);

run.$inject = ['$rootScope', '$location', '$sessionStorage', '$http', '$base64'];
function run($rootScope, $location, $sessionStorage, $http, $base64) {
    $rootScope.globals = {};
    $rootScope.globals.currentUser = $sessionStorage.getObject('user');

    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.auth;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var loggedIn = $rootScope.globals && $rootScope.globals.currentUser;
        if (!loggedIn && $location.path() !== "/login" && $location.path() !== "/registration") {
            $location.path('/home');
        }
        if (loggedIn && $location.path() == "/login") {
            $location.path('/collections');
        }
    });
}


export default MODULE_NAME;
