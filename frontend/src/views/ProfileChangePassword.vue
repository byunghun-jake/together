<template>
  <div class="container max-w-screen-md">
    <p class="profile-changepassword__top--array">비밀번호 변경</p>
    <div class="profile-changepassword__box__form">
      <input
        class="profile-changepassword__box__form__text--array"
        type="password"
        value=""
        placeholder="현재 비밀번호"
      />
      <input
        class="profile-changepassword__box__form__text--array"
        type="password"
        value=""
        placeholder="새 비밀번호"
      />
      <input
        class="profile-changepassword__box__form__text--array"
        type="password"
        value=""
        placeholder="새 비밀번호 확인"
      />
    </div>
    <div class="profile-changepassword__button__box--array">
      <button class="profile-changepassword__checkbox--form">확인</button>
      <router-link
        :to="{ name: 'ProfileEdit' }"
        class="profile-changepassword__back--array"
        >돌아가기</router-link
      >
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
.profile-changepassword__top--array {
  @apply px-4 pt-6 pb-4 text-2xl font-bold;
}

.profile-changepassword__box__form {
  @apply grid gap-2 mx-4;

  .profile-changepassword__box__form__text--array {
    @apply pt-4 pr-0 pb-4 pl-4 border border-gray-300 rounded-md;
  }
}

.profile-changepassword__button__box--array {
  @apply flex flex-col justify-center items-center pt-10;

  .profile-changepassword__checkbox--form {
    @apply flex justify-center items-center mx-auto mb-2 h-14 border rounded-xl text-white;
    width: 382px;
    background-color: #312e81;
  }

  .profile-changepassword__back--array {
    @apply mx-auto my-0;
  }
}
</style>
