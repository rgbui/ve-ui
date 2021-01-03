import "../util/array";
import "./assert/font-awesome/less/font-awesome.less";
import "./assert/style/theme.less";
import "./assert/style/site.less";
import "../components/declare.components";

import Vue from 'vue';
import App from './app.vue';
import Axios from "axios";
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.config.silent = true;

Vue.config.errorHandler = function (err, vm, info) {
    console.log(err, vm, info);
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        { name: 'component', path: '/component', component: () => import('./component/component.vue') }
    ]
})
Axios.defaults.withCredentials = true;
new Vue({
    el: document.body.appendChild(document.createElement('div')),
    router,
    render: h => h(App, { ref: 'app' })
});
