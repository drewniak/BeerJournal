import angular from "angular";
import uirouter from "angular-ui-router";
import "angular-material";
import "angular-base64"
import "angular-cookies"
import "angular-bootstrap-lightbox"
import "angular-ui-bootstrap"

import "../style/app.css";
import "../style/galeryListStyle.css";

import routing from "./app.config.js";
import collections from "../features/collections";
import login from "../features/login";
import registration from "../features/registration"
import home from "../features/home";
import allusers from "../features/allusers"
import AddNewItemController from "../features/addNewItem"
import UserService from "../features/UserService/UserService"
import AuthService from "../features/authService/AuthService"


let app = () => {
    return {
        template: require('./app.html'),
        controllerAs: 'app'
    }
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uirouter, collections, login, registration, home, allusers, AddNewItemController, 'ngCookies', 'ngMaterial','base64','ui.bootstrap','bootstrapLightbox'])
    .factory('UserService', UserService)
    .factory('AuthService', AuthService)
    .directive('app', app)
    .config(['$cookiesProvider', function($cookiesProvider) {
        // Set $cookies defaults
        $cookiesProvider.defaults.path = '/';
        $cookiesProvider.defaults.secure = true;
    }])
    .config(routing)
    .run(run);

run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
function run($rootScope, $location, $cookies, $http) {
    //TODO
    $rootScope.globals = {};
    /*$rootScope.globals = $cookies.getObject('user');
    if ($rootScope.globals) {
        console.log($rootScope.globals)
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }*/

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var loggedIn = $rootScope.globals.currentUser;
        if (!loggedIn && $location.path() !== "/login" && $location.path() !== "/registration") {
            $location.path('/home');
        }
    });
}


export default MODULE_NAME;
