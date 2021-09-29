<template>
  <div class="container">
    <section class="noti-section">
      <div class="noti-box">
        <p>파티를 만들고,</p>
        <p>다른 사람들과 함께 하세요 🎉</p>
      </div>
    </section>
    <section></section>
    <section class="confirm-section">
      <h3>파티 참가 정보</h3>
      <div class="info-container">
        <div class="info">
          <span class="label">서비스</span>
          <span class="value"></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Party } from '@/libs/interface'
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PartyJoinConfirm',
  props: {
    partyId: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const loading = ref<boolean>(true)
    const party = ref<Party>()

    onMounted(async () => {
      try {
        const _party = await store.dispatch('party/getParty', props.partyId)
        party.value = _party
      } catch (error) {
        console.log(error)
      }
      loading.value = false
    })

    return {
      loading,
      party,
    }
  },
})
</script>

<style lang="scss" scoped>
.noti-section {
  @apply py-6 px-4;

  .noti-box {
    @apply w-full py-4 text-center bg-indigo-50 rounded-lg;

    p {
      @apply text-lg font-bold text-indigo-500;
    }
  }
}

.confirm-section {
  .info-container {
    @apply p-4 border rounded-md grid gap-4;

    .info,
    .total-cost {
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
