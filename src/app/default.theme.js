themeConfig.$inject = ['$mdThemingProvider'];

export default function themeConfig($mdThemingProvider) {

    $mdThemingProvider
        .definePalette('accentPalette', {
            '50': '#c8c8c8',
            '100': '#bbbbbb',
            '200': '#aeaeae',
            '300': '#a1a1a1',
            '400': '#959595',
            '500': '#888',
            '600': '#7b7b7b',
            '700': '#6e6e6e',
            '800': '#626262',
            '900': '#4c4c4c',
            'A100': '#d4d4d4',
            'A200': '#e1e1e1',
            'A400': '#eeeeee',
            'A700': '#6e6e6e',
            'contrastDefaultColor': 'light'
        });

    $mdThemingProvider
        .definePalette('bjDarkGray', {
                '50': '#737373',
                '100': '#666666',
                '200': '#595959',
                '300': '#4d4d4d',
                '400': '#404040',
                '500': '#333',
                '600': '#262626',
                '700': '#1a1a1a',
                '800': '#0d0d0d',
                '900': '#000000',
                'A100': '#808080',
                'A200': '#8c8c8c',
                'A400': '#999999',
                'A700': '#000000',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['A100', 'A200', 'A400', 'A700']
            });

    $mdThemingProvider.setDefaultTheme('bjBeerTheme');

    $mdThemingProvider.theme('bjBeerTheme')
        .primaryPalette('bjDarkGray', {
            'default': '500',
            'hue-1': '200',
            'hue-2': '800',
            'hue-3': 'A700'
        })
        .accentPalette('accentPalette', {
            'default': '900',
            'hue-1': '100',
            'hue-2': '700',
            'hue-3': 'A400'
        });
}