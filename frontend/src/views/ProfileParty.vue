<template>
  <div class="container max-w-screen-md px-4 pt-6">
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
import { Party } from '@/libs/interfaces/party'

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
.profile-party__box--array {
  @apply grid gap-2;

  .profile-party__box {
    @apply px-4 py-4 border rounded-md;

    .profile-party__box__image--size {
      @apply w-12 h-12;
    }
  }
}

.profile-party__text--array {
  @apply text-2xl font-bold mb-4;
}

@media (min-width: 768px) {
  .profile-party__box--array {
    @apply grid grid-cols-2;
  }
  .profile-party__box {
    @apply p-4 border rounded-md;
  }
  .profile-party__text--array {
    @apply text-2xl font-bold;
  }
}
</style>
