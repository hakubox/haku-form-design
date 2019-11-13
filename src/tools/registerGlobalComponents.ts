import Vue from 'vue';

const components = require.context('../components/', true, /\.(vue|ts|js)$/);

const install = function():void {
    components.keys().forEach(name => {
        let componentName = name.substr(name.lastIndexOf('/') + 1).replace(/\.\/|\.(js|ts|vue)/g, '');
        Vue.component(componentName, components(name).default);
    });
};

export default {
    install,
    ...components
};
