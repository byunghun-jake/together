<template>
  <div class="profile-party__box" :class="provider">
    <header>
      <div class="profile-party__box__text--array">
        <p class="font-semibold">{{ party.providerName }}</p>
        <img
          :src="providerLogoUrl"
          class="profile-party__box__image--size"
          alt="이미지"
        />
      </div>
      <div class="profile-party__box__text--array2">
        <p>21.12.25까지 (109일)</p>
        <p class="font-bold">10,900원</p>
      </div>
    </header>
    <div class="detail-info" v-if="isExpanded">
      <hr />
      <div class="account-info">
        <h4>계정 정보</h4>
        <div class="info-wrapper">
          <p>아이디</p>
          <p>northKing@NK.com</p>
        </div>
        <div class="info-wrapper">
          <p>비밀번호</p>
          <input type="password" value="12335" style="text-align: right" />
        </div>
      </div>
      <div class="host-info">
        <h4>파티장 정보</h4>
        <div class="info-wrapper">
          <p>이름</p>
          <p>김일성</p>
        </div>
        <div class="info-wrapper">
          <p>휴대폰 번호</p>
          <p>011-247-1001</p>
        </div>
      </div>
    </div>
    <button class="toggle-button" @click="handleToggleClick">
      <span class="material-icons" v-if="isExpanded">expand_less</span>
      <span class="material-icons" v-else>expand_more</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Party } from '@/libs/interfaces/party'
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue'

export default defineComponent({
  name: 'ProfilePartyMine',
  props: {
    party: {
      type: Object as PropType<Party>,
      required: true,
    },
  },
  setup(props) {
    const providerLogoUrl = `https://image.tmdb.org/t/p/w200${props.party.provider.logoUrl}`
    const isExpanded = ref<boolean>(false)

    const setIsExpanded = () => {
      console.log(window.innerWidth)
      isExpanded.value = window.innerWidth >= 768 ? true : false
    }

    onMounted(() => {
      setIsExpanded()
      window.addEventListener('resize', setIsExpanded)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', setIsExpanded)
    })

    const handleToggleClick = () => {
      isExpanded.value = !isExpanded.value
    }

    return {
      providerLogoUrl,
      isExpanded,
      handleToggleClick,
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
    @apply flex justify-between;

    .profile-party__box__image--size {
      @apply w-12 h-12;
    }
  }

  .profile-party__box__text--array2 {
    @apply flex justify-between;
  }

  .profile-party__box__text--array3 {
    @apply font-semibold mt-4;
  }

  .profile-party__box__text--array4 {
    @apply flex justify-between my-2 mx-0;
  }

  header {
    @apply grid gap-8 mb-6;
  }

  .detail-info {
    @apply grid gap-6;

    .info-wrapper {
      @apply flex items-center justify-between;
    }

    .account-info,
    .host-info {
      @apply grid gap-2;

      h4 {
        @apply font-bold text-gray-600;
      }
    }
  }

  .toggle-button {
    @apply w-full md:hidden hover:bg-gray-100;
  }
}
</style>
