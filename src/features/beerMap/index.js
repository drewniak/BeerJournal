let beerStyles = {
    text: {name: "style"},
    children: [
        {
            collapsed: true,
            text: {name: "lager"},
            children: [
                {
                    collapsed: true,
                    text: {name: "german lager"},
                    children: [
                        {
                            text: {name: "marzen"},
                        },
                        {
                            text: {name: "kolsch"},
                        },
                        {
                            collapsed: true,
                            text: {name: "bock"},
                            children: [
                                {
                                    text: {name: "dopper bock"},
                                },
                            ]
                        },
                        {
                            text: {name: "dunkel"},
                        },
                    ]
                },
                {
                    collapsed: true,
                    stackChildren: true,
                    text: {name: "american lager"},
                    children: [
                        {
                            text: {name: "malt liquor"},
                        },
                        {
                            text: {name: "ice beer"},
                        },
                        {
                            text: {name: "light beer"},
                        },
                    ]
                },
                {
                    collapsed: true,
                    stackChildren: true,
                    text: {name: "pilsner"},
                    children: [
                        {
                            text: {name: "german pilsner"},
                        },
                        {
                            text: {name: "american pilsner"},
                        },
                        {
                            text: {name: "bohemian pilsner"},
                        },
                    ]
                },
                {
                    collapsed: true,
                    stackChildren: true,
                    text: {name: "european lager"},
                    children: [
                        {
                            text: {name: "pale lager"},
                        },
                        {
                            text: {name: "dark lager"},
                        },
                    ]
                },
            ]
        },
        {
            collapsed: true,
            text: {name: "ale"},
            children: [
                {
                    collapsed: true,
                    text: {name: "german ale"},
                    children: [
                        {
                            collapsed: true,
                            stackChildren: true,
                            text: {name: "weissbier"},
                            children: [
                                {
                                    text: {name: "dunkel-weizen"},
                                },
                                {
                                    text: {name: "hefeweizen"},
                                },
                            ]
                        },
                    ]
                },
                {
                    text: {name: "brown ale"},
                },
                {
                    text: {name: "lambic ale"},
                },
                {
                    collapsed: true,
                    text: {name: "pale ale"},
                    children: [
                        {
                            collapsed: true,
                            text: {name: "bitter"},
                            children: [
                                {
                                    text: {name: "esb"},
                                },
                            ]
                        },
                        {
                            collapsed: true,
                            text: {name: "india pale ale"},
                            children: [
                                {
                                    text: {name: "double IPA"},
                                },
                            ]
                        },
                        {
                            collapsed: true,
                            text: {name: "strong ale"},
                            children: [
                                {
                                    text: {name: "barley wine"},
                                },
                            ]
                        },
                        {
                            text: {name: "american pale"},
                        },
                    ]
                },
                {
                    collapsed: true,
                    text: {name: "belgian ale"},
                    children: [
                        {
                            collapsed: true,
                            text: {name: "belgian ale"},
                            children: [
                                {
                                    collapsed: true,
                                    text: {name: "belgian pale"},
                                    children: [
                                        {
                                            collapsed: true,
                                            text: {name: "belgian strong pale ale"},
                                            children: [
                                                {
                                                    text: {name: "tripel"},
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            text: {name: "saison"},
                        },
                        {
                            text: {name: "witbier"},
                        },
                    ]
                },
                {
                    text: {name: "irish ale"},
                },
                {
                    collapsed: true,
                    stackChildren: true,
                    text: {name: "porter"},
                    children: [
                        {
                            text: {name: "american porter"},
                        },
                        {
                            text: {name: "english porter"},
                        },
                    ]
                },
                {
                    collapsed: true,
                    stackChildren: true,
                    text: {name: "stout"},
                    children: [
                        {
                            text: {name: "irish stout"},
                        },
                        {
                            text: {name: "american stout"},
                        },
                        {
                            text: {name: "imperial stout"},
                        },
                        {
                            text: {name: "oatmeal stout"},
                        },
                    ]
                }
            ]
        }
    ]
};

export default angular.module('beerMap', [])
    .directive('beerMap', [function() {
        return {
            template: require('./beerMap.html'),
            restrict: 'E',
            scope: {
                selectedName: '=model'
            },
            link: (scope, element, attrs) => {
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