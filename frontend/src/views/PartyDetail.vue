<template>
  <div class="container">
    <section class="loading-section" v-if="loading">로딩 중</section>
    <section class="party-detail-section" v-else>
      <div class="party-info-container">
        <div class="logo-wrapper">
          <img src="@/assets/images/netflix.png" alt="로고" />
        </div>
        <h1 class="title">{{ party.title }}</h1>
        <div class="infos">
          <p class="host">파티장: 향긋하다</p>
          <p class="endDate">{{ party.endDate }} 까지</p>
          <div class="price-wrapper">
            <p class="original-price">58,647원</p>
            <div class="price_per-day">
              <span class="price">9,265원</span>
            </div>
          </div>
        </div>
      </div>
      <div class="remain-container">
        <h3>남은 자리</h3>
        <ul class="member-list">
          <li v-for="i in 2" :key="i">
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
          <li v-for="i in 3" :key="i">
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
      <div class="rule-container">
        <h3>규칙</h3>
        <ul class="rule-list">
          <li class="rule-item" v-for="rule in party.rules" :key="rule">
            {{ rule }}
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
import { Party } from '@/libs/interface'
import { useStore } from 'vuex'

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

    onMounted(async () => {
      party.value = await store.dispatch('party/getParty', props.partyId)
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

  .rule-container {
    .rule-list {
      @apply flex flex-wrap gap-4;

      .rule-item {
        @apply py-2 px-4 rounded-full bg-gray-100 text-sm;
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
