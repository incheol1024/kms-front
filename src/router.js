import Vue from 'vue'
import Router from 'vue-router'
import help from "./views/help-component.vue"
import qna from "./views/qna-component.vue"
import search from "./views/search-component.vue"
import setting from "./views/setting-component.vue"
import site from "./views/sites-component.vue"
import solution from "./views/solutions-component.vue"
import title from "./views/title-component.vue";
import sitesWrite from "./views/site/siteswrite-component.vue"
import solutionWrite from "./views/solution/solwrite-component.vue"
import solutionbugWrite from "./views/solution/solbugwrite-component.vue"
import solutionsiteWrite from "./views/solution/solsitewrite-component.vue"
import solutionmanualWrite from "./views/solution/solmanualwrite-component.vue"
import qnaWrite from "./views/writingboard/qnawrite-component.vue"
import qnaPost from "./views/board/qnapost-component.vue"
import user from "./views/setting/user-component.vue"
import group from "./views/setting/group-component.vue"
import permission from "./views/setting/permission-component.vue"
import project from "./views/site/project-component.vue"
import boardList from "./views/site/boardList-component.vue"
import login from "./views/login-component.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/login', component: login },
        { path: '/title', component: title },
        { path: '/sites/:id', component: site, props: true },
        { path: '/solutions/:id', component: solution, props: true },
        { path: '/qna/:name/:id', component: qna, props: true },
        { path: '/search', component: search },
        { path: '/help', component: help },
        { path: '/sites/write/:menuId/:siteId/:projectId/:boardId', component: sitesWrite, props: true },
        { path: '/sites/:id/:siteId', component: project, props: true },
        { path: '/sites/:id/:siteId/:projectId', component: boardList, props: true },
        { path: '/solutions/write/:menuId/:boardId', component: solutionWrite, props: true },
        { path: '/solutions/write/bug/:menuId/:boardId', component: solutionbugWrite, props: true },
        { path: '/solutions/write/site/:menuId/:boardId', component: solutionsiteWrite, props: true },
        { path: '/solutions/write/manual/:menuId/:boardId', component: solutionmanualWrite, props: true },
        //누구냐 이거
        //{path: '/write/:id', component: Vue.component('write-component'), props: true},
        { path: '/qna/write/:name/:id', component: qnaWrite, props: true },
        { path: '/qna/answer/:name/:id/:qid', component: qnaPost, props: true },
        {
            path: '/setting',
            component: setting,
            children: [
                {
                    path: 'user',
                    component: user
                },
                {
                    path: 'group',
                    component: group
                },
                {
                    path: 'permission',
                    component: permission
                }
            ]
        }
    ]
})
