/**
 * Created by wojciech_dymek on 24.05.17.
 */
export default function imageFallback() {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
}