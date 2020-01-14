import lessRoot from 'less/lib/less';
import PluginLoader from 'less/lib/less-browser/plugin-loader';
import LogListener from 'less/lib/less-browser/log-listener';
import ImageSize from 'less/lib/less-browser/image-size';

export default (options = {}) => {
    const less = lessRoot();

    less.options = options;
    less.PluginLoader = PluginLoader;

    LogListener(less, options);
    ImageSize(less.environment);

    // Setup user functions - Deprecate?
    if (options.functions) {
        less.functions.functionRegistry.addMultiple(options.functions);
    }

    function clone(obj) {
        const cloned = {};
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                cloned[prop] = obj[prop];
            }
        }
        return cloned;
    }

    function loadStyles(lessText, modifyVars) {
        return new Promise((resolve, reject) => {
            const instanceOptions = clone(options);
            instanceOptions.modifyVars = modifyVars;
            instanceOptions.filename = document.location.href.replace(/#.*$/, '');

            less.render(lessText, instanceOptions, (e, result) => {
                if (result?.css) {
                    resolve(result.css);
                } else {
                    reject('less解析失败');
                }
            });
        });
    }

    less.refreshStyles = loadStyles;
    return loadStyles;
};