<template>
  <section class="banner-section"></section>
  <div class="container">
    <section class="party-section">
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
import { defineComponent } from 'vue'
import PartyListItem from '@/components/PartyListItem.vue'

export default defineComponent({
  name: 'PartyList',
  components: { PartyListItem },
})
</script>

<style lang="scss" scoped>
.banner-section {
  @apply h-44 bg-blue-500;
}

.party-section {
  @apply py-6 px-4;

  .section-header {
    @apply text-2xl font-bold;
  }
}
</style>
