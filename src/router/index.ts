import { imageEmits } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {path:'/login',component:()=>import('@/views/login/LoginPage.vue'),
    redirect:'/login/login',
    children:[
      {path:'/login/login',component:()=>import('@/views/login/loginOrRegister/Login.vue')},
      {path:'/login/register',component:()=>import('@/views/login/loginOrRegister/Register.vue')}
    ]

   },//登录页
   {path:'/',component:()=>import('@/views/layout/LayoutContainer.vue'),
    redirect:'/classroom',
    children:[
      {path:'/classroom',component:()=>import('@/views/classroom/ClassroomSearch.vue')},
      {path:'/user/useravatar',component:()=>import('@/views/user/UserAvatar.vue')},
      {path:'/user/userprofile',component:()=>import('@/views/user/UserProfile.vue')},
      {path:'/user/userpassword',component:()=>import('@/views/user/UserPassword.vue')},
      {path:'/discussion',component:()=>import('@/views/discussion/DiscussionPage.vue')}
    ]
   }
  ],
})

export default router
