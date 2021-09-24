<template>
  <section class="banner-section"></section>
  <div class="container">
    <section class="loading-section" v-if="loading">로딩중이다!</section>
    <section class="party-section" v-else>
      <header class="section-header">파티에 참여하세요!</header>
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
import { defineComponent, onMounted, ref } from 'vue'
import PartyListItem from '@/components/PartyListItem.vue'
import { useStore } from 'vuex'
import { Party } from '@/libs/interface'

export default defineComponent({
  name: 'PartyList',
  components: { PartyListItem },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const parties = ref<Party[]>([])

    onMounted(async () => {
      parties.value = await store.dispatch('party/getAllParties')
      loading.value = false
    })
    return { loading, parties }
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
    @apply text-2xl font-bold mb-4;
  }

  .party-list {
    @apply grid gap-4 md:grid-cols-2 xl:grid-cols-3;
  }
}
</style>
