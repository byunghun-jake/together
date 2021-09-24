<template>
  <nav class="profile-main__navbar__button">
    <router-link :to="{ name: 'ProfileMain' }" :class="{ active: !partyactive }"
      >프로필</router-link
    >
    <router-link
      :to="{ name: 'ProfileParty' }"
      :class="{ active: partyactive }"
      class="profile-main__navbar__button--space"
      >파티 관리</router-link
    >
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    // console.log(route.path)

    const partyactive = ref<boolean>(route.path.includes('myparty'))

    watch(
      () => route.path,
      (newroute) => {
        // console.log(newroute)
        partyactive.value = newroute.includes('myparty')
      }
    )
    return { partyactive }
  },
})
</script>

<style lang="scss" scoped>
.profile-main__navbar__button {
  @apply flex justify-center items-center h-14 border border-gray-300;

  a {
    @apply font-semibold text-gray-300;
  }

  .active {
    @apply text-indigo-900;
  }
}

.profile-main__navbar__button--space {
  @apply ml-6;
}
</style>
