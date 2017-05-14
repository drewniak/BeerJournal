import angular from "angular";
import _authService from "./auth.service"
import "ng-facebook";

export default angular.module("authService", ['ngFacebook'])
    .service('authService', _authService)
    .config( function( $facebookProvider ) {
        $facebookProvider.setAppId('1618894634805119');
    })
    .run( function( $rootScope ) {
        (function(){
            if (document.getElementById('facebook-jssdk')) {return;}
            var firstScriptElement = document.getElementsByTagName('script')[0];
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';
            facebookJS.src = '//connect.facebook.net/en_US/all.js';
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        }());
    })
    .name;