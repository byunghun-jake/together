<template>
  <header>
    <router-link class="logo" :to="{ name: 'ContentList' }">
      <div class="logo-wrapper">
        <img src="@/assets/images/logo.png" alt="로고" />
      </div>
    </router-link>
    <nav>
      <router-link :to="{ name: 'ContentList' }">OTT 추천</router-link>
      <router-link :to="{ name: 'PartyList' }">OTT 파티</router-link>
    </nav>
    <div>
      <router-link class="btn login" v-if="true" :to="{ name: 'Login' }">
        로그인
      </router-link>
      <div class="btn user" v-else>User NickName</div>
    </div>
  </header>
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
header {
  @apply flex justify-between items-center w-full h-16 border-b px-4;

  .logo-wrapper {
    @apply overflow-hidden w-20 h-10;

    img {
      @apply object-contain object-center;
    }
  }

  nav {
    @apply hidden md:flex mx-auto gap-20;

    a {
      @apply text-lg font-bold text-gray-300;
    }

    .router-link-active {
      @apply text-indigo-900;
    }
  }

  .btn {
    @apply text-sm text-white font-bold py-2 px-4 rounded-full bg-indigo-900;
  }
}
</style>
