<template>
  <nav>
    <router-link :to="{ name: 'ContentList' }" class="nav-link">
      <span class="material-icons">home</span>
      <span class="label">홈</span>
    </router-link>
    <router-link :to="{ name: 'PartyList' }" class="nav-link">
      <span class="material-icons">accessibility_new</span>
      <span class="label">파티</span>
    </router-link>
    <router-link :to="{ name: 'Login' }" class="nav-link" v-if="true">
      <span class="material-icons">supervised_user_circle</span>
      <span class="label">로그인</span>
    </router-link>
    <router-link :to="{ name: 'ProfileMain' }" class="nav-link" v-else>
      <span class="material-icons">supervised_user_circle</span>
      <span class="label">내 정보</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
nav {
  @apply fixed md:hidden bottom-0 left-0 right-0 flex items-center justify-between bg-white px-6 py-2 border-t rounded-t-2xl border-gray-200;

  .nav-link {
    @apply flex flex-col items-center justify-center w-10 h-10;

    .label {
      @apply text-xs;
    }
  }
}
</style>
