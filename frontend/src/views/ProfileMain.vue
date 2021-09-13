<template>
  <div>
    <div class="profile-main__info--array">
      <div class="text-2xl font-bold">내 정보</div>
      <div class="text-gray-400">수정</div>
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
.profile-main-container {
  display: flex;
  justify-content: center;
}

.profile-main__info--array {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 86%;
  margin: 45px auto;
}
</style>
