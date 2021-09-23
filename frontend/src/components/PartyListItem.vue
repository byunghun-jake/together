<template>
  <li class="party-list-item">
    <router-link to="#">
      <div class="party">
        <div class="infos">
          <div class="text">
            <h3>{{ party.provider }} 프리미엄</h3>
            <p>{{ party.title }}</p>
          </div>
          <div class="logo-wrapper">로고</div>
        </div>
        <div class="members">
          <span class="material-icons" v-for="i in 5" :key="i">star</span>
        </div>
        <div class="details">
          <div>
            <p class="date">{{ party.endDate }}까지 ({{ party.restDays }}일)</p>
          </div>
          <div class="price-wrapper">
            <p class="original-price">
              {{ toCurrency(party.originalPricePerDay * party.restDays) }}
            </p>
            <p class="price">
              {{ toCurrency(party.pricePerDay * party.restDays) }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Party {
  id: number
  provider: string
  title: string
  logoUrl: string
  member: {
    totalCount: number
    joinCount: number
  }
  endDate: string
  restDays: number
  pricePerDay: number
}

export default defineComponent({
  name: 'PartyListItem',
  props: {
    party: Object as PropType<Party>,
  },
  setup() {
    const toCurrency = (price: number): string => {
      return `${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`
    }
    return { toCurrency }
  },
})
</script>

<style lang="scss" scoped>
.party {
  @apply grid gap-4 p-4 border rounded-md border-gray-100;

  .infos {
    @apply flex justify-between;

    .text {
      h3 {
        @apply font-bold mb-1;
      }
      p {
        @apply text-xs;
      }
    }
  }

  .members {
    @apply flex gap-2;

    .material-icons {
      font-size: 2rem;
    }
  }

  .details {
    @apply flex justify-between;

    .date {
      @apply text-xs;
    }

    .price-wrapper {
      @apply text-right;

      .original-price {
        @apply text-red-600 text-sm font-bold line-through;
      }

      .price {
        @apply font-bold text-gray-700;
      }
    }
  }
}
</style>
