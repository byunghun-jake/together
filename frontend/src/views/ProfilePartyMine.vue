<template>
  <div class="profile-party__box border-red-500">
    <div class="profile-party__box__text--array">
      <p class="font-semibold">넷플릭스 프리미엄</p>
      <img
        src="@/assets/images/Netflix.png"
        class="profile-party__box__image--size"
        alt="넷플릭스"
      />
    </div>
    <div class="profile-party__box__text--array2">
      <p>21.12.25까지 (109일)</p>
      <p class="font-bold">10,900원</p>
    </div>
    <hr />
    <div class="show">
      <p class="profile-party__box__text--array3">계정 정보</p>
      <div class="profile-party__box__text--array4">
        <p>아이디</p>
        <p>northKing@NK.com</p>
      </div>
      <div class="profile-party__box__text--array4">
        <p>비밀번호</p>
        <input type="password" value="12335" style="text-align: right" />
      </div>
      <p class="profile-party__box__text--array3">파티장 정보</p>
      <div class="profile-party__box__text--array4">
        <p>이름</p>
        <p>김일성</p>
      </div>
      <div class="profile-party__box__text--array4">
        <p>휴대폰 번호</p>
        <p>011-247-1001</p>
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
@media (min-width: 768px) {
  .profile-party__box--array {
    @apply grid grid-flow-row grid-cols-2;
  }

  .profile-party__box {
  }
}
.profile-party__text--array {
  @apply mt-6 mb-4 ml-4  text-2xl font-bold;
}

.profile-party__box {
  @apply mx-4 mb-2 px-4 py-4 border rounded-md;

  .profile-party__box__text--array {
    @apply flex justify-between mb-8;

    .profile-party__box__image--size {
      @apply w-12 h-12;
    }
  }

  .profile-party__box__text--array2 {
    @apply flex justify-between mb-4;
  }

  .profile-party__box__text--array3 {
    @apply font-semibold mt-4;
  }

  .profile-party__box__text--array4 {
    @apply flex justify-between my-2 mx-0;
  }
}

details summary {
  cursor: pointer;
}
</style>
