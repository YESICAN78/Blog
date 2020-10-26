import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/Home')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import( '../views/Blog')
  },
  {
    path: '/links',
    name: 'Links',
    component: () => import( '../views/Links')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import( '../views/Message')
  },
  {
    path: '/diary',
    name: 'Diary',
    component: () => import( '../views/Diary')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About')
  },
  {
    path:'/Article/:id',
    name:'Article',
    component:()=>import('../views/Article') 
 },
 {
    path:"/forum",
    name:"Forum",
    component:()=>import('../views/Forum'),
 },
 {
   path:"/Forumarticle/:id",
   name:"Forumarticle",
   component:()=>import("../views/ForumArticle/Article.vue")
 },
 {
  path:"/forumAricleadd",
  name:"ForumAricle",
  component:()=>import('../views/Forum/Articleendit.vue'),
},
 {
   path:'*',
   name:'NoFound',
   component:()=>import('../views/404')
 }
]

const router = new VueRouter({
  routes
})

export default router
