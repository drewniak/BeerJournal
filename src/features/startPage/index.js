import angular from "angular";
import uirouter from "angular-ui-router";
import routing from "./start.routes";
import animate from "angular-animate";
import StartController from './start.controller';


export default angular.module('start', [uirouter,animate])
    .config(routing)
    .controller('StartController', StartController)
    .name;