import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import PartyLayout from '@/layouts/PartyLayout.vue'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import ContentList from '@/views/ContentList.vue'
import ContentDetail from '@/views/ContentDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ContentLayout',
    component: ContentLayout,
    children: [
      {
        path: '/',
        name: 'ContentList',
        component: ContentList,
      },
      {
        path: '/:contentId',
        name: 'ContentDetail',
        component: ContentDetail,
        props: true,
      },
    ],
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
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
