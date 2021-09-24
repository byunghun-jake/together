<template>
  <div class="profile-party__box" :class="provider">
    <div class="profile-party__box__text--array">
      <p class="font-semibold">{{ party.provider }}</p>
      <img
        :src="require(`@/assets/images/${provider}.png`)"
        class="profile-party__box__image--size"
        alt="이미지"
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
import { defineComponent, PropType, ref } from 'vue'

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
  name: 'ProfilePartyMine',
  props: {
    party: {
      type: Object as PropType<Party>,
      required: true,
    },
  },
  setup(prop) {
    const provider = ref<string>('netflix')

    switch (prop.party.provider) {
      case '넷플릭스': {
        provider.value = 'netflix'
        break
      }
      case '왓챠': {
        provider.value = 'watcha'
        break
      }
      case '웨이브': {
        provider.value = 'wavve'
        break
      }
    }

    return {
      provider,
    }
  },
})
</script>

<style lang="scss" scoped>
.profile-party__box {
  &.netflix {
    @apply border-red-500;
  }
  &.watcha {
    @apply border-pink-500;
  }
  &.wavve {
    @apply border-blue-500;
  }

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
</style>
