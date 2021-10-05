<template>
  <div class="container max-w-lg">
    <section class="form-section">
      <header>
        <h3>내 정보</h3>
      </header>
      <form @submit="handleSubmit">
        <div class="fields">
          <Textinput
            v-for="(field, key) in formData"
            :key="key"
            :formData="formData"
            :field="field"
            :name="key"
            v-model="field.value"
            @update:validate="handleUpdateValidate"
          />
        </div>
        <div class="buttons">
          <button :class="{ valid: formIsValid }" :disabled="!formIsValid">
            확인
          </button>
          <router-link :to="{ name: 'ProfileChangePassword' }">
            비밀번호 변경
          </router-link>
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { computed, defineComponent, onMounted, ref } from 'vue'
import Textinput from '@/components/Common/TextInput.vue'
import { ValidateData, FormData } from '@/libs/interface'
import { requiredValidator } from '@/libs/validator'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ProfileEdit',
  components: {
    Textinput,
  },
  props: {
    userId: {
      type: [String, Number],
    },
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const loading = ref<boolean>(true)
    const formData = ref<FormData>({
      nickName: {
        label: '닉네임',
        value: '',
        type: 'text',
        errors: {},
        placeholder: '닉네임을 입력하세요',
        validators: [requiredValidator],
      },
      username: {
        label: '이름',
        value: '',
        type: 'text',
        errors: {},
        placeholder: '이름을 입력하세요',
        validators: [requiredValidator],
      },
      phoneNumber: {
        label: '휴대폰 번호',
        value: '',
        type: 'text',
        errors: {},
        placeholder: '휴대폰 번호는 "-"를 포함하여 입력하세요',
        validators: [requiredValidator],
      },
    })

    const formIsValid = computed(() => {
      return Object.keys(formData.value).every((key) => {
        return Object.keys(formData.value[key].errors).length === 0
      })
    })

    const handleSubmit = async (event: Event) => {
      event.preventDefault()
      console.log('submit')
      try {
        const username = formData.value.username.value
        const nick_name = formData.value.nickName.value
        const phone_number = formData.value.phoneNumber.value

        const user = await store.dispatch('auth/updateUserData', {
          username,
          nick_name,
          phone_number,
        })
        console.log(user)
      } catch (error) {
        console.log(error)
      }
      // router.push({ name: 'ProfileMain' })
    }

    const handleUpdateValidate = (validateRes: ValidateData) => {
      const { key, type, status } = validateRes

      if (status) {
        delete formData.value[key].errors[type]
      } else if (validateRes.message) {
        formData.value[key].errors[type] = validateRes.message
      } else {
        throw new Error('망했어요')
      }
    }

    onMounted(async () => {
      try {
        const { nickName, username, phoneNumber } = await store.dispatch(
          'auth/getUserData'
        )
        formData.value.nickName.value = nickName
        formData.value.username.value = username
        formData.value.phoneNumber.value = phoneNumber
      } catch (error) {
        console.log(error)
      }
      loading.value = false
    })

    return {
      loading,
      formData,
      formIsValid,
      handleSubmit,
      handleUpdateValidate,
    }
  },
})
</script>

<style lang="scss" scoped>
.form-section {
  @apply grid gap-10 py-10 px-4;

  header h3 {
    @apply text-xl font-bold;
  }

  form {
    @apply grid gap-10;

    .fields {
      @apply grid gap-4;
    }

    .buttons {
      @apply grid gap-2;

      button {
        @apply py-4 max-w-xs w-full mx-auto bg-gray-100 text-gray-400 font-bold rounded-xl;

        &.valid {
          @apply bg-indigo-900 text-white;
        }
      }
      a {
        @apply mx-auto;
      }
    }
  }
}
</style>
