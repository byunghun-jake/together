<template>
  <div class="container max-w-screen-md">
    <div class="profile-edit__main__section">
      <p class="text-2xl font-bold mt-2 mb-2">내 정보</p>
      <div class="profile-edit__box__form">
        <p class="text-xs text-gray-400">닉네임</p>
        <input class="text-sm" value="누클리어 런치 디텍티드" />
      </div>
      <div class="profile-edit__box__form">
        <p class="text-xs text-gray-400">이름</p>
        <input class="text-sm" value="김정은" />
      </div>
      <div class="profile-edit__box__form">
        <p class="text-xs text-gray-400">휴대폰 번호</p>
        <input class="text-sm" value="010-1717-1602" />
      </div>
      <p class="text-sm text-gray-700">
        휴대폰 번호를 변경하려면 새로운 번호 인증을 해야 합니다.
      </p>
      <button class="profile-edit__cert__box__form">
        <p>휴대폰 본인인증</p>
      </button>
      <div class="profile-edit__button__box--array">
        <router-link
          :to="{ name: 'ProfileMain' }"
          class="profile-edit__checkbox--form"
          >확인</router-link
        >
        <router-link
          :to="{ name: 'ProfileChangePassword' }"
          class="profile-edit__changepw--array"
          >비밀번호 변경</router-link
        >
      </div>
    </div>
  </div>
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
.profile-edit__main__section {
  @apply py-4 px-4 grid gap-2;

  .profile-edit__box__form {
    @apply flex flex-col justify-center items-start px-4 border border-gray-300 rounded-md;
    height: 60px;
  }

  .profile-edit__cert__box__form {
    @apply flex justify-center items-center border rounded-full text-white text-sm;
    width: 126px;
    height: 36px;
    background-color: #312e81;
  }

  .profile-edit__button__box--array {
    @apply flex flex-col justify-center items-center;
  }

  .profile-edit__checkbox--form {
    @apply flex justify-center items-center mt-8 mx-auto mb-2 h-14 border rounded-xl text-white;
    width: 382px;
    background-color: #312e81;
  }

  .profile-edit__changepw--array {
    @apply mx-auto my-0;
  }
}
</style>
