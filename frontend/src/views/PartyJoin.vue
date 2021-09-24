<template>
  <div class="container">
    <section class="loading-section" v-if="loading">로딩!</section>
    <div v-else class="py-10 px-4 grid gap-10">
      <section class="partyinfo-section">
        <h3>파티 정보</h3>
        <div class="info-container">
          <div class="info">
            <span class="label">서비스</span>
            <span class="value">넷플릭스</span>
          </div>
          <div class="info">
            <span class="label">파티 이름</span>
            <span class="value">ㄹㄹ</span>
          </div>
          <div class="info">
            <span class="label">파티장</span>
            <span class="value">향긋하다</span>
          </div>
          <div class="info">
            <span class="label">파티 기간</span>
            <span class="value">2021. 09. 09 ~ 2021. 12. 25 (109일)</span>
          </div>
          <div class="info">
            <span class="label">참가비</span>
            <span class="value">9,265원</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PartyJoin',
  setup() {
    const loading = ref(false)
    return { loading }
  },
})
</script>

<style lang="scss" scoped>
h3 {
  @apply text-xl font-bold mb-4;
}

.partyinfo-section {
  .info-container {
    @apply p-4 border rounded-md grid gap-4;

    .info {
      @apply flex justify-between;

      .label {
        flex-basis: 100px;
        @apply flex-shrink-0;
      }

      .value {
        @apply text-right;
      }
    }
  }
}
</style>
