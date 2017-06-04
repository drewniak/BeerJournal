import beerStyles from "./beerStyles";

export default angular.module('beerMap', [])
    .directive('beerMap', [function() {
        return {
            template: require('./beerMap.html'),
            restrict: 'E',
            scope: {
                selectedName: '=model'
            },
            link: (scope, element, attrs) => {
                let lastSelected = null;

                let chart_config = {
                    chart: {
                        container: "#beerMapChart",
                        node: {
                            collapsable: true,
                        },
                        callback: {
                            onTreeLoaded: function () {
                                let nodes = document.querySelectorAll('.node');
                                for (let i = 0; i < nodes.length; i++) {
                                    nodes[i].addEventListener('click', function (event) {
                                        if(lastSelected) {
                                            lastSelected.classList.remove("selected");
                                        }
                                        this.classList.add("selected");
                                        lastSelected = this;

                                        scope.selectedName = this.getElementsByClassName("node-name")[0].innerText;
                                        scope.$apply();
                                    });
                                }
                            }
                        }
                    },

                    nodeStructure: beerStyles
                };

                new Treant(chart_config);
            }
        }
    }])
    .name;