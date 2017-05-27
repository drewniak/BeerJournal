import angular from "angular";
import uirouter from "angular-ui-router";
import "angular-material";
import "angular-base64"
import "angular-bootstrap-lightbox"
import "angular-ui-bootstrap"
import "angular-sessionstorage"
import "angular-route"
import "angular-wizard"
import "angular-advanced-searchbox"

import "../style/app.css";
import "../style/galeryListStyle.css";
import "../style/itemDetails.css"
import "../style/common.css";
import "../style/navbar.css";
import "../style/beer.theme.css";
import "../style/events.css"
import "../style/advancedSearch.css"
import "../style/rate.css"

import routing from "./app.config.js";
import themeConfig from "./beer.theme"
import collections from "../features/collections";
import login from "../features/login";
import registration from "../features/registration"
import home from "../features/home";
import allusers from "../features/allusers"
import navbar from "../features/navbar"
import authService from "../features/authService"
import AddNewItemController from "../features/addNewItem"
import itemDetailsController from "../features/itemDetails"
import accountSettings from "../features/accountSettings"
import EventsController from  "../features/events"
import EditItemController from "../features/editItem"
import countriesProvider from "../features/countries"
import offers from  "../features/offers"
import exchange from  "../features/exchange"
import StartController from "../features/startPage";
import ItemsSelectionController from "../features/exchange/selectItems"
import OfferDetailsController from "../features/exchange/offerDetails"
import topRatedListController from "../features/topRatedItems"

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uirouter, EditItemController, collections, login, registration, home, allusers, navbar, authService, itemDetailsController, AddNewItemController, EventsController, accountSettings, countriesProvider, StartController, ItemsSelectionController, OfferDetailsController, exchange, offers, topRatedListController, 'ngSessionStorage', 'ngMaterial','base64', 'ngRoute','ui.bootstrap','bootstrapLightbox', 'mgo-angular-wizard', 'angular-advanced-searchbox'])
    .config(routing)
    .config(themeConfig)
    .run(run);

run.$inject = ['$rootScope', '$location', '$sessionStorage', '$http', '$base64'];
function run($rootScope, $location, $sessionStorage, $http, $base64) {
    $rootScope.globals = {};
    $rootScope.globals.currentUser = $sessionStorage.getObject('user');

    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.auth;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        let loggedIn = $rootScope.globals && $rootScope.globals.currentUser;
        if (!loggedIn && $location.path() !== "/login" && $location.path() !== "/registration") {
            $location.path('/home');
        }
        if (loggedIn && $location.path() === "/login") {
            $location.path('/collections');
        }
    });
}


export default MODULE_NAME;
