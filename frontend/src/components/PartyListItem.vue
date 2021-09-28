<template>
  <li class="party-list-item">
    <router-link :to="{ name: 'PartyDetail', params: { partyId: party.id } }">
      <div class="party">
        <div class="infos">
          <div class="text">
            <h3>{{ party.provider }} 프리미엄</h3>
            <p>{{ party.title }}</p>
          </div>
          <div class="logo-wrapper">
            <img
              :src="require(`@/assets/images/${provider}.png`)"
              :alt="`${party.provider} 로고`"
            />
          </div>
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
    party: {
      type: Object as PropType<Party>,
      required: true,
    },
  },
  setup(props) {
    let provider = ''
    switch (props.party.provider) {
      case '넷플릭스': {
        provider = 'netflix'
        break
      }
      case '왓챠': {
        provider = 'watcha'
        break
      }
      case '웨이브': {
        provider = 'wavve'
        break
      }
    }
    const toCurrency = (price: number): string => {
      return `${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`
    }
    return { toCurrency, provider }
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
        @apply md:text-lg font-bold mb-1;
      }
      p {
        @apply text-xs md:text-sm;
      }
    }

    .logo-wrapper {
      @apply w-8 h-8 md:w-10 md:h-10 rounded overflow-hidden;

      img {
        @apply w-full h-full object-fill;
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
      @apply text-xs md:text-sm;
    }

    .price-wrapper {
      @apply text-right;

      .original-price {
        @apply text-red-600 text-sm md:text-base font-bold line-through;
      }

      .price {
        @apply md:text-lg font-bold text-gray-700;
      }
    }
  }
}
</style>
