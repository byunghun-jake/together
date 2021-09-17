<template>
  <div class="grid gap-1">
    <div class="input-container">
      <input
        autocomplete="off"
        :type="field.type"
        :value="modelValue"
        :class="{ active: labelActive, isError: isError }"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
        @keydown.enter="$emit('submit')"
      />
      <label
        class="input-container__placeholder"
        :class="{ active: labelActive, isError: isError }"
      >
        <p v-if="labelActive">{{ field.label }}</p>
        <p v-else>{{ field.placeholder }}</p>
      </label>
      <div
        class="error-list"
        v-if="field.errors && Object.keys(field.errors).length"
      >
        <p
          v-for="(error, key) in field.errors"
          :key="key"
          class="error-list__item"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { FormDataListItem, ValidateParam, ValidateData } from '@/libs/interface'

export default defineComponent({
  name: 'TextInput',
  props: {
    field: {
      type: Object as PropType<FormDataListItem>,
    },
    modelValue: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  emits: ['update:modelValue', 'update:validate'],
  setup(props, { emit }) {
    const modelValue = computed(() => props.modelValue)
    const labelActive = ref<boolean>(Boolean(props.modelValue))
    const isError = ref<boolean>(false)

    const validate = (text: string) => {
      const name = props.name
      const validator = props.field?.validator
      if (validator && name) {
        const validateParam: ValidateParam = {
          key: name,
          value: text,
          form: props.field,
        }
        const res: ValidateData = validator(validateParam)
        emit('update:validate', res)
      }
    }

    const handleBlur = (event: any) => {
      if (event.target.value !== '') {
        validate(event.target.value)
      }
      labelActive.value = props.modelValue ? true : false
    }

    const handleFocus = () => {
      labelActive.value = true
    }

    // any의 사용에 대한 확신이 없음. 수정 필요
    const handleInput = (event: any) => {
      // modelValue를 먼저 업데이트 해 줘야 validate가 정상적인 로직으로 진행된다.
      emit('update:modelValue', event.target.value)
      if (props.field?.errors) {
        validate(event.target.value)
      }
    }

    watch(modelValue, (value) => {
      // 입력값이 변할 때마다 에러 체크
      labelActive.value = Boolean(value)
      if (props.field?.errors) {
        isError.value =
          Object.keys(props.field?.errors).length === 0 ? false : true
      }
    })

    return {
      labelActive,
      isError,
      handleBlur,
      handleFocus,
      handleInput,
    }
  },
})
</script>

<style lang="scss" scoped>
.input-container {
  @apply relative w-full;

  input {
    @apply relative mb-1 text-sm outline-none px-4 py-3 z-10 rounded-md bg-transparent border border-gray-300 w-full py-2;

    &.active {
      @apply border-indigo-900;
    }
    &.isError {
      @apply border-red-500;
    }
  }
  &__placeholder {
    @apply absolute top-3 left-3 text-sm text-gray-300 transition-all;
    transform: translate(0);

    &.active {
      @apply bg-white rounded-md text-xs text-indigo-900 p-1 z-10;
      transform: translate(0, -100%);
    }
    &.isError {
      @apply text-red-500;
    }
  }
  .error-list {
    &__item {
      @apply text-xs text-red-500;
    }
  }
}
</style>
