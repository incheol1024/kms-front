import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
Vue.use(Vuetify);
Vue.use(VueCodemirror);
Vue.use(CKEditor);
Vue.use(VuetifyUploadButton);

const EventBus = new Vue();

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/title', component: Vue.component('title-component')},
    {path: '/sites/:id', component: Vue.component('sites-component'), props: true},
    {path: '/solutions/:id', component: Vue.component('solutions-component'), props: true},
    {path: '/qna/:name/:id', component: Vue.component('qna-component'), props: true},
    {path: '/search', component: Vue.component('search-component')},
    {path: '/help', component: Vue.component('help-component')},
    {path: '/sites/write/:menuId/:siteId/:projectId/:boardId', component: Vue.component('siteswrite-component'), props: true},
    {path: '/solutions/write/:menuId/:boardId', component: Vue.component('solwrite-component'), props: true},
    {path: '/write/:id', component: Vue.component('write-component'), props: true},
    {path: '/qna/write/:name/:id', component: Vue.component('qnawrite-component'), props: true},
    {path: '/qna/answer/:name/:id/:qid', component: Vue.component('qnapost-component'), props: true},
    {
        path: '/setting',
        component: Vue.component('setting-component'),
        children: [
            {
                path: 'user',
                component: Vue.component('user-component')
            },
            {
                path: 'group',
                component: Vue.component('group-component')
            },
            {
                path: 'permission',
                component: Vue.component('permission-component')
            }
        ]
    }
]
})
