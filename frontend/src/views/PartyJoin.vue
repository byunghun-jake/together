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
            <span class="value">{{ party.title }}</span>
          </div>
          <div class="info">
            <span class="label">파티장</span>
            <span class="value">{{ party.host }}</span>
          </div>
          <div class="info">
            <span class="label">파티 종료일</span>
            <span class="value">
              {{ party.endDate }} ({{ party.restDays }}일)
            </span>
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
import { Party } from '@/libs/interface'
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PartyJoin',
  props: {
    partyId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const loading = ref(true)
    const party = ref<Party>()
    onMounted(async () => {
      try {
        const _party: Party = await store.dispatch(
          'party/getParty',
          props.partyId
        )
        party.value = _party
      } catch (error) {
        console.log(error)
      }
      loading.value = false
    })

    return { loading, party }
  },
})
</script>

<style lang="scss" scoped>
.container {
  @apply max-w-3xl;
}

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
