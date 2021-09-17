<template>
  <div class="container">
    <div class="body">
      <div class="logo">
        <!-- temporary element -->
        <img src="@/images/temp_auth_logo.png" alt="OTT_logo" />
      </div>
      <div class="login-container">
        <div class="login-container__input-list">
          <Textinput
            v-for="(field, key) in formData"
            v-model="field.value"
            :key="key"
            :name="key"
            :field="field"
            :formData="formData"
            @submit="login"
            @update:validate="handleUpdateValidate($event)"
          />
        </div>
        <div class="login-container__sub-option">
          <div>
            <input
              class="mr-1 bg-indigo-800"
              type="checkbox"
              id="checkSaveEmail"
              v-model="isSaveEmail"
            />
            <label
              class="relative bottom-0.5 text-xs text-gray-600"
              for="checkSaveEmail"
              >이메일 저장하기</label
            >
          </div>
          <router-link
            class="relative top-1 text-xs text-gray-600 float-right"
            :to="{ name: 'ResetPassword' }"
            >비밀번호 찾기
          </router-link>
        </div>
        <button
          class="login-container__login-btn"
          :class="{ disabled: !isValidFormData }"
          :disabled="!isValidFormData"
          @click="login"
        >
          <!-- TODO: 로딩 상태 분기해서 로딩스피너와 교체할 것 -->
          로그인
        </button>
        <router-link
          class="text-sm text-center text-gray-600 font-medium"
          :to="{ name: 'Login' }"
          >이메일로 회원가입하기
        </router-link>
        <!-- Social Login area -->
        <hr class="my-4" />
        <button class="login-container__social-btn kakao">
          카카오로 시작하기
        </button>
        <button class="login-container__social-btn google">
          구글로 시작하기
        </button>
        <button class="login-container__social-btn naver">
          네이버로 시작하기
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Textinput from '@/components/TextInput.vue'
import { emailValidator } from '@/libs/validator'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { FormDataList, ValidateData } from '@/libs/interface'

export default defineComponent({
  name: 'Login',
  components: {
    Textinput,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const isSaveEmail = ref<boolean>(
      localStorage.getItem('email') ? true : false
    )

    const isValidFormData = computed(() => {
      const keys = Object.keys(formData.value)
      return keys.every((key) => {
        const errors = Object.keys(formData.value[key].errors)
        return formData.value[key].value !== '' && !errors.length
      })
    })

    const formData = ref<FormDataList>({
      email: {
        label: '이메일',
        type: 'email',
        value: localStorage.getItem('email') || '',
        placeholder: '이메일을 입력하세요.',
        validator: emailValidator,
        errors: {},
      },
      password: {
        label: '비밀번호',
        type: 'password',
        value: '',
        placeholder: '비밀번호를 입력하세요.',
        errors: {},
      },
    })

    const handleUpdateValidate = (data: ValidateData) => {
      const { key, type, status, message } = data
      // message와 같이 undefined로 올 수도 있는 경우, 체크를 잘 해주어야 함
      if (!status && message) {
        formData.value[key].errors[type] = message
      } else {
        delete formData.value[key].errors[type]
      }
    }

    const login = async () => {
      // validate check
      // if isSaveEmail, save to localStorage
      const keys = Object.keys(formData.value)
      return
    }

    return {
      store,
      router,
      isSaveEmail,
      isValidFormData,
      formData,
      handleUpdateValidate,
      login,
    }
  },
})
</script>

<style lang="scss" scoped>
.body {
  @apply flex flex-col justify-center items-center w-full h-screen -mt-4 mb-4;

  .logo {
    @apply mb-4;
  }
  .login-container {
    @apply grid gap-2 px-8 w-full;

    &__input-list {
      @apply grid gap-3 w-full;
    }
    &__login-btn {
      @apply w-full rounded-lg py-3 text-sm text-white font-bold bg-indigo-900;

      &.disabled {
        @apply opacity-50;
      }
    }
    &__sub-option {
      @apply flex flex-row justify-between;
    }
    &__social-btn {
      @apply w-full rounded-lg py-3 text-sm text-gray-600 font-bold;

      &.kakao {
        @apply bg-yellow-400;
      }
      &.google {
        @apply bg-gray-100;
      }
      &.naver {
        @apply bg-green-500;
      }
    }
  }
}
</style>
