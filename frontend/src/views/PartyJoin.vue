<template>
  <div class="container">
    <section class="loading-section" v-if="loading">로딩!</section>
    <div v-else class="py-10 px-4 grid gap-10">
      <section class="partyinfo-section">
        <h3>파티 정보</h3>
        <div class="info-container">
          <div class="info">
            <span class="label">서비스</span>
            <span class="value">{{ party.providerName }}</span>
          </div>
          <div class="info">
            <span class="label">파티 이름</span>
            <span class="value">{{ party.title }}</span>
          </div>
          <div class="info">
            <span class="label">파티장</span>
            <span class="value">{{ party.hostName }}</span>
          </div>
          <div class="info">
            <span class="label">파티 종료일</span>
            <span class="value"> {{ party.endDate }} ({{ restDays }}일) </span>
          </div>
          <div class="info">
            <span class="label">참가비</span>
            <span class="value">
              {{ toCurrency(cost) }}
            </span>
          </div>
        </div>
      </section>
      <section class="payinfo-section">
        <h3>결제 정보</h3>
        <div class="info-container">
          <div class="info">
            <span class="label">이름</span>
            <span class="value">{{ me.name }}</span>
          </div>
          <div class="info">
            <span class="label">참가비</span>
            <span class="value">
              {{ toCurrency(cost) }}
            </span>
          </div>
          <div class="info">
            <span class="label">참가 수수료</span>
            <span class="value">
              {{ toCurrency(fee) }}
            </span>
          </div>
          <div class="info">
            <span class="label">결제방법</span>
            <span class="value">신용카드 </span>
          </div>
          <div class="total-cost">
            <span class="label">결제 금액</span>
            <span class="value">{{ toCurrency(cost + fee) }}</span>
          </div>
        </div>
      </section>
      <button class="submit-button" @click="handleClick">결제하기</button>
    </div>
  </div>
</template>

<script lang="ts">
import { getRestDays, toCurrency } from '@/libs/func'
import { Party, User } from '@/libs/interface'
import axios from 'axios'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    const loading = ref(true)
    const party = ref<Party>()
    const restDays = ref<number>(0)
    const cost = computed(
      () => party.value && party.value.pricePerDay * restDays.value
    )
    const fee = computed(
      () =>
        party.value &&
        Math.floor(party.value.pricePerDay * restDays.value * 0.1)
    )
    // 임시
    const me = ref<User>()

    const handleClick = () => {
      const ok = confirm('결제를 하시겠습니까?')
      if (ok) {
        router.push({
          name: 'PartyJoinConfirm',
          params: { partyId: props.partyId },
        })
      }
    }

    onMounted(async () => {
      try {
        const res = await axios.get('http://localhost:3000/me')
        me.value = res.data
      } catch (error) {
        console.log(error)
      }

      try {
        const _party: Party = await store.dispatch(
          'party/getParty',
          props.partyId
        )
        party.value = _party
        restDays.value = getRestDays(_party.endDate)
      } catch (error) {
        console.log(error)
      }
      loading.value = false
    })

    return { loading, me, cost, fee, party, restDays, toCurrency, handleClick }
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

.partyinfo-section,
.payinfo-section {
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

    .total-cost {
      @apply p-4 border border-indigo-900 bg-indigo-100 font-bold;
    }
  }
}

.submit-button {
  @apply py-4 rounded-xl bg-indigo-900 text-white font-bold w-full max-w-xs mx-auto;
}
</style>
