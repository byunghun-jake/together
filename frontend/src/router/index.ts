import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import PartyLayout from '@/layouts/PartyLayout.vue'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import ProfileMain from '@/views/ProfileMain.vue'
import ProfileEdit from '@/views/ProfileEdit.vue'
import ProfileChangePassword from '@/views/ProfileChangePassword.vue'
import ProfileParty from '@/views/ProfileParty.vue'
import ContentList from '@/views/ContentList.vue'
import ContentDetail from '@/views/ContentDetail.vue'
import PartyList from '@/views/PartyList.vue'
import PartyDetail from '@/views/PartyDetail.vue'
import PartyJoin from '@/views/PartyJoin.vue'
import PartyJoinConfirm from '@/views/PartyJoinConfirm.vue'
import PartyCreate from '@/views/PartyCreate.vue'

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import ChangePassword from '@/views/ChangePassword.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ContentLayout',
    component: ContentLayout,
    children: [
      {
        path: '',
        name: 'ContentList',
        component: ContentList,
      },
      {
        path: ':contentId',
        name: 'ContentDetail',
        component: ContentDetail,
        props: true,
      },
    ],
  },
  {
    path: '/party',
    name: 'PartyLayout',
    component: PartyLayout,
    children: [
      {
        path: '',
        name: 'PartyList',
        component: PartyList,
      },
      {
        path: ':partyId',
        name: 'PartyDetail',
        component: PartyDetail,
        props: true,
      },
      {
        path: 'create',
        name: 'PartyCreate',
        component: PartyCreate,
      },
      {
        path: ':partyId/join',
        name: 'PartyJoin',
        component: PartyJoin,
        props: true,
      },
      {
        path: ':partyId/join/confirm',
        name: 'PartyJoinConfirm',
        component: PartyJoinConfirm,
        props: true,
      },
    ],
  },
  {
    path: '/auth',
    name: 'AuthLayout',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
      },
      {
        path: 'change-password/:uid/token/:token/',
        name: 'ChangePassword',
        component: ChangePassword,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
      // {
      //   path: 'logout',
      //   name: 'Logout',
      //   component: Logout,
      // },
    ],
  },
  {
    path: '/profile',
    name: 'ProfileLayout',
    component: ProfileLayout,
    children: [
      {
        path: ':userId',
        name: 'ProfileMain',
        component: ProfileMain,
        props: true,
      },
      {
        path: ':userId/edit',
        name: 'ProfileEdit',
        component: ProfileEdit,
        props: true,
      },
      {
        path: 'changepassword',
        name: 'ProfileChangePassword',
        component: ProfileChangePassword,
      },
      {
        path: 'myparty',
        name: 'ProfileParty',
        component: ProfileParty,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
