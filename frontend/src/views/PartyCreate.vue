<template>
  <div class="container">
    <section class="noti-section">
      <div class="noti-box">
        <p>파티를 만들고,</p>
        <p>다른 사람들과 함께 하세요 🎉</p>
      </div>
    </section>
    <section class="service-section">
      <header class="section-header">
        <h1 class="section-title" :class="{ selected: provider }">
          서비스 선택
        </h1>
        <button
          class="reset-service-btn"
          @click="handleResetProvider()"
          v-if="provider"
        >
          다시 선택
        </button>
      </header>
      <div class="service-list">
        <button
          class="service"
          :class="{ selected: provider === '넷플릭스' }"
          v-if="!provider || provider === '넷플릭스'"
          @click="handleSelectProvider('넷플릭스')"
        >
          <div class="logo-wrapper">
            <img src="@/assets/images/netflix.png" alt="넷플릭스" />
          </div>
          <p class="service-name">넷플릭스</p>
        </button>
        <button
          class="service"
          :class="{ selected: provider === '왓챠' }"
          v-if="!provider || provider === '왓챠'"
          @click="handleSelectProvider('왓챠')"
        >
          <div class="logo-wrapper">
            <img src="@/assets/images/watcha.png" alt="왓챠" />
          </div>
          <p class="service-name">왓챠</p>
        </button>
        <button
          class="service"
          :class="{ selected: provider === '웨이브' }"
          v-if="!provider || provider === '웨이브'"
          @click="handleSelectProvider('웨이브')"
        >
          <div class="logo-wrapper">
            <img src="@/assets/images/wavve.png" alt="웨이브" />
          </div>
          <p class="service-name">웨이브</p>
        </button>
      </div>
    </section>
    <section class="party-section">
      <header class="section-header">
        <h1 class="section-title">파티 정보</h1>
      </header>
      <template v-if="provider">
        <form class="grid gap-4">
          <TextInput
            v-for="(field, key) in inputForm"
            :key="key"
            v-model="field.value"
            :name="key"
            :field="field"
            :formData="inputForm"
            @update:validate="handleUpdateValidate($event)"
          />
          <textarea v-model="desc" placeholder="상세 정보"></textarea>
        </form>
      </template>
    </section>
    <div class="button-wrapper">
      <button
        class="create-party-button"
        :class="{ disabled: !formIsValid }"
        :disabled="!formIsValid"
        @click="handleSubmit"
      >
        파티 등록하기
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import TextInput from '@/components/Common/TextInput.vue'
import { requiredValidator } from '@/libs/validator'
import { PartyForm, Provider, ValidateData } from '@/libs/interface'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PartyCreate',
  components: { TextInput },
  setup() {
    const router = useRouter()
    const store = useStore()
    const provider = ref<Provider>('')
    const inputForm = ref<PartyForm>({
      title: {
        label: '파티 이름',
        type: 'text',
        value: '',
        placeholder: '파티 이름을 입력하세요',
        errors: {},
        validators: [requiredValidator],
      },
      serviceId: {
        label: '계정',
        type: 'text',
        value: '',
        placeholder: '공유할 서비스 계정을 입력하세요',
        errors: {},
        validators: [requiredValidator],
      },
      servicePassword: {
        label: '비밀번호',
        type: 'text',
        value: '',
        placeholder: '공유할 서비스 비밀번호를 입력하세요',
        errors: {},
        validators: [],
      },
      memberLimit: {
        label: '모집인원',
        type: 'number',
        value: 0,
        placeholder: '모집인원',
        errors: {},
      },
      endDate: {
        label: '파티 종료일',
        type: 'date',
        value: new Date().toISOString().slice(0, 10),
        placeholder: '',
        errors: {},
      },
      pricePerDay: {
        label: '하루 이용료',
        type: 'number',
        value: 0,
        placeholder: '하루 이용료를 입력하세요.',
        errors: {},
      },
    })
    const desc = ref<string>('')

    const checkErrorFromInputForm = computed(() => {
      return Object.keys(inputForm.value).every((fieldKey) => {
        return (
          inputForm.value[fieldKey].value &&
          Object.keys(inputForm.value[fieldKey].errors).length === 0
        )
      })
    })

    const formIsValid = computed(() => {
      return (
        checkErrorFromInputForm.value &&
        provider.value.length !== 0 &&
        desc.value.length !== 0
      )
    })

    const handleUpdateValidate = (data: ValidateData) => {
      const { key, type, status, message } = data
      if (!status && message) {
        inputForm.value[key].errors[type] = message
      } else {
        delete inputForm.value[key].errors[type]
      }
    }

    const handleSelectProvider = (p: Provider) => {
      provider.value = p
    }

    const handleResetProvider = () => {
      provider.value = ''
    }

    const handleSubmit = async () => {
      const data: { [key: string]: Provider | string | number } = {
        desc: desc.value,
        // 하드코딩
        providerName: provider.value,
        providerLogoUrl: '@/assets/images/netflix.png',
        providerPricePerDay: 300,
        hostName: '김병훈',
        membersCount: 3,
      }
      Object.keys(inputForm.value).forEach((fieldKey) => {
        console.log(fieldKey, typeof inputForm.value[fieldKey].value)
        data[fieldKey] = inputForm.value[fieldKey].value
      })
      const ok = confirm('생성하시겠습니까?')
      if (ok) {
        console.log(data)
        await store.dispatch('party/postParty', data)
      }
    }

    return {
      desc,
      provider,
      inputForm,
      formIsValid,
      handleSelectProvider,
      handleResetProvider,
      handleUpdateValidate,
      handleSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  @apply grid max-w-lg;
}

.noti-section {
  @apply py-6 px-4;

  .noti-box {
    @apply w-full py-4 text-center bg-indigo-50 rounded-lg;

    p {
      @apply text-lg font-bold text-indigo-500;
    }
  }
}

.service-section {
  @apply p-4;
  .section-header {
    @apply mb-4 flex items-center justify-between;
    .section-title {
      @apply text-2xl font-bold;

      &.selected {
        @apply text-gray-400;
      }
    }
    .reset-service-btn {
      @apply text-sm text-gray-400;
    }
  }

  .service-list {
    @apply grid gap-2;

    .service {
      @apply py-2 flex gap-4 items-center;

      &:hover:not(.selected) {
        @apply bg-gray-100 cursor-pointer;
      }

      &.selected .service-name {
        @apply text-gray-400;
      }

      .logo-wrapper {
        @apply w-8 h-8 overflow-hidden rounded;
      }
      .service-name {
        @apply text-lg text-gray-700 font-medium;
      }
    }
  }
}

.party-section {
  @apply p-4 mb-6;

  .section-header {
    @apply mb-4;

    .section-title {
      @apply text-2xl font-bold;
    }
  }

  textarea {
    resize: none;
    @apply p-4 border border-gray-300 placeholder-gray-300 rounded-md;
  }
}

.button-wrapper {
  @apply flex items-center justify-center px-4;

  .create-party-button {
    @apply place-self-center w-full py-4 text-center rounded-xl font-bold bg-indigo-900 text-white;

    &.disabled {
      @apply bg-gray-200 text-gray-400;
    }
  }
}
</style>
