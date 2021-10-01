<template>
  <section class="banner-section"></section>
  <div class="container">
    <section class="loading-section" v-if="loading">로딩중이다!</section>
    <section class="party-section" v-else>
      <header class="section-header">
        <h1>파티에 참여하세요!</h1>
        <router-link :to="{ name: 'PartyCreate' }" v-if="isLogin">
          파티 만들기
        </router-link>
      </header>
      <ul class="party-list">
        <PartyListItem
          v-for="party in parties"
          :key="party.id"
          :party="party"
        />
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import PartyListItem from '@/components/PartyListItem.vue'
import { useStore } from 'vuex'
import { Party } from '@/libs/interface'

export default defineComponent({
  name: 'PartyList',
  components: { PartyListItem },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const isLogin = computed(() => store.getters['auth/isLogin'])
    const parties = ref<Party[]>([])

    onMounted(async () => {
      parties.value = await store.dispatch('party/getAllParties')
      loading.value = false
    })
    return { loading, isLogin, parties }
  },
})
</script>

<style lang="scss" scoped>
.banner-section {
  @apply h-44 bg-blue-500;
}

.party-section {
  @apply py-6 px-4;

  .section-header {
    @apply mb-4 flex items-center justify-between;

    h1 {
      @apply text-2xl font-bold;
    }

    a {
      @apply inline-block py-2 px-4 text-sm text-white font-bold rounded-full bg-indigo-900;
    }
  }

  .party-list {
    @apply grid gap-4 md:grid-cols-2 xl:grid-cols-3;
  }
}
</style>
