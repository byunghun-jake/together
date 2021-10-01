import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

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
import ResetPasswordConfirm from '@/views/ResetPasswordConfirm.vue'

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
        meta: { requiresAuth: true },
      },
      {
        path: ':partyId/join',
        name: 'PartyJoin',
        component: PartyJoin,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: ':partyId/join/confirm',
        name: 'PartyJoinConfirm',
        component: PartyJoinConfirm,
        props: true,
        meta: { requiresAuth: true },
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
        meta: { requiresNoAuth: true },
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: { requiresNoAuth: true },
      },
      {
        path: 'reset-password-confirm/:uid/token/:token/',
        name: 'ResetPasswordConfirm',
        component: ResetPasswordConfirm,
        meta: { requiresNoAuth: true },
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: { requiresNoAuth: true },
      },
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
        meta: { requiresMyAuth: true },
      },
      {
        path: 'changepassword',
        name: 'ProfileChangePassword',
        component: ProfileChangePassword,
        meta: { requiresAuth: true },
      },
      {
        path: ':userId/party',
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isLogin']) {
    alert('로그인 해야 들어올 수 있음')
    router.push({ name: 'Login' })
  }
  if (to.meta.requiresNoAuth && store.getters['auth/isLogin']) {
    alert('로그인 상태에서는 들어올 수 없음')
    router.push({ name: 'ContentList' })
  }
  if (
    to.meta.requiresMyAuth &&
    store.getters['auth/getUserPK'] != to?.params.userId
  ) {
    alert('내 정보만 수정할 수 있음')
    router.push({ name: 'ContentList' })
  }
  next()
})

export default router
