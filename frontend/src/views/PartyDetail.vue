<template>
  <div class="container">
    <section class="loading-section" v-if="loading">로딩 중</section>
    <section class="party-detail-section" v-else>
      <div class="party-info-container">
        <div class="logo-wrapper">
          <img
            :src="`https://image.tmdb.org/t/p/w200${party.provider.logoUrl}`"
            alt="로고"
          />
        </div>
        <h1 class="title">{{ party.title }}</h1>
        <div class="infos">
          <p class="host">파티장: 향긋하다</p>
          <p class="endDate">{{ party.endDate }} 까지 ({{ restDays }}일)</p>
          <div class="price-wrapper">
            <p class="original-price">
              {{ toCurrency(party.provider.pricePerDay * restDays) }}
            </p>
            <div class="price_per-day">
              <span class="price">
                {{ toCurrency(party.pricePerDay * restDays) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="remain-container">
        <h3>남은 자리</h3>
        <ul class="member-list">
          <li v-for="i in party.memberLimit - membersCount" :key="i">
            <div class="image-wrapper">
              <img
                class="member-icon"
                src="https://cdn-icons-png.flaticon.com/512/2437/2437116.png"
                alt="남은 자리"
              />
            </div>
          </li>
        </ul>
      </div>
      <div class="members-container">
        <h3>파티원</h3>
        <ul class="member-list">
          <li v-for="i in membersCount" :key="i">
            <div class="image-wrapper">
              <img
                class="member-icon"
                src="https://cdn-icons-png.flaticon.com/512/2437/2437148.png"
                alt="파티원"
              />
            </div>
          </li>
        </ul>
      </div>
      <div class="desc-container">
        <div class="desc">
          {{ party.desc }}
        </div>
      </div>
      <router-link
        class="join-link"
        :to="{ name: 'PartyJoin', params: { partyId } }"
      >
        파티 참가하기
      </router-link>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { getRestDays, toCurrency } from '@/libs/func'
import { Party } from '@/libs/interfaces/party'

export default defineComponent({
  name: 'PartyDetail',
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
    const restDays = ref<number>(0)
    const membersCount = ref<number>(0)

    onMounted(async () => {
      try {
        const _party: Party = await store.dispatch(
          'party/getParty',
          props.partyId
        )
        party.value = _party
        restDays.value = getRestDays(_party.endDate)
        membersCount.value = _party.payments.length
      } catch (error) {
        console.log(error.response)
      }
      loading.value = false
    })

    return { loading, party, restDays, membersCount, toCurrency }
  },
})
</script>

<style lang="scss" scoped>
.container {
  @apply max-w-3xl;
}

.party-detail-section {
  @apply grid gap-8 py-6 px-4;

  h3 {
    @apply text-xl font-bold mb-4;
  }

  .party-info-container {
    .logo-wrapper {
      @apply w-12 h-12 overflow-hidden mb-4;
    }

    .title {
      @apply text-2xl font-bold mb-2;
    }

    .infos {
      @apply grid gap-2;

      .host,
      .endDate {
        @apply font-bold;
      }

      .price-wrapper {
        @apply grid place-items-end pb-4 border-b;

        .original-price {
          @apply text-gray-400 line-through;
        }
        .price_per-day {
          @apply flex gap-2 items-baseline;
          .price {
            @apply text-xl font-bold text-indigo-600;
          }
          .per-day {
            @apply text-sm text-gray-400;
          }
        }
      }
    }
  }

  .remain-container,
  .members-container {
    .member-list {
      @apply flex flex-wrap gap-10;
      .image-wrapper {
        @apply w-20 h-20 overflow-hidden;
      }
    }
  }

  .desc-container {
    .desc {
      @apply p-4 bg-gray-50 rounded-md border border-gray-300;
    }
  }
  .join-link {
    @apply place-self-center w-full md:max-w-sm bg-indigo-900 rounded-xl py-4 font-bold text-white text-center;
  }
}
</style>
