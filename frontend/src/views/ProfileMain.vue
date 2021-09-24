<template>
  <div class="container max-w-screen-md">
    <div class="profile-main__info__section">
      <div class="profile-main__info__top--array">
        <div class="text-2xl font-bold">내 정보</div>
        <div class="text-gray-400">
          <router-link :to="{ name: 'ProfileEdit' }">수정</router-link>
        </div>
      </div>
      <div class="profile-main__info--array">
        <p class="text-gray-500">닉네임</p>
        <p>누클리어 런치 디텍티드</p>
      </div>
      <div class="profile-main__info--array">
        <p class="text-gray-500">이름</p>
        <p>김정은</p>
      </div>
      <div class="profile-main__info--array">
        <p class="text-gray-500">휴대폰 번호</p>
        <p>010-1803-1806</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileMain',
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.profile-main__info__section {
  @apply py-6 px-4 grid gap-4;

  .profile-main__info__top--array {
    @apply flex justify-between items-center;
  }

  .profile-main__info--array {
    @apply flex justify-between items-center;
  }
}
</style>
