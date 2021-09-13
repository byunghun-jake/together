import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ContentsLayout from '@/layouts/ContentsLayout.vue'
import PartyLayout from '@/layouts/PartyLayout.vue'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import ProfileMain from '@/views/ProfileMain.vue'
import ProfileParty from '@/views/ProfileParty.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ContentsLayout',
    component: ContentsLayout,
    // children: [
    //   {
    //     path: '/',
    //     name: 'ContentsList',
    //     component: ContentsList
    //   }
    // ]
  },
  {
    path: '/party',
    name: 'PartyLayout',
    component: PartyLayout,
  },
  {
    path: '/auth',
    name: 'AuthLayout',
    component: AuthLayout,
  },
  {
    path: '/profile',
    name: 'ProfileLayout',
    component: ProfileLayout,
    children: [
      {
        path: '',
        name: 'ProfileMain',
        component: ProfileMain,
      },
      {
        path: 'party',
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
