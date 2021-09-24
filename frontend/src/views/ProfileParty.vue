<template>
  <div class="container max-w-screen-md">
    <p class="profile-party__text--array">내 파티</p>
    <div class="profile-party__box--array">
      <ProfilePartyMine
        v-for="party in parties"
        :key="party.id"
        :party="party"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import ProfilePartyMine from '@/components/ProfilePartyMine.vue'

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
  name: 'ProfileParty',
  components: {
    ProfilePartyMine,
  },
  setup() {
    const parties = ref<Party[]>()

    onMounted(async () => {
      try {
        const res = await axios.get(`http://localhost:3000/myparty`)
        parties.value = res.data
      } catch (error) {
        console.log(error)
      }
    })
    return {
      parties,
    }
  },
})
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .profile-party__box--array {
    @apply grid grid-flow-row grid-cols-2;
  }
  .profile-party__box {
    @apply mr-1 ml-1 mt-1 mb-1 px-4 py-4 border rounded-md;
  }
}

.profile-party__text--array {
  @apply mt-6 mb-4 ml-2 text-2xl font-bold;
}

@media (max-width: 767px) {
  .profile-party__box {
    @apply mx-4 mb-2 px-4 py-4 border rounded-md;

    .profile-party__box__text--array {
      @apply flex justify-between mb-8;

      .profile-party__box__image--size {
        @apply w-12 h-12;
      }
    }
  }
}
</style>
