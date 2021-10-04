<template>
  <section class="info-section">
    <header class="section-header">
      <span class="title">{{ content.title }}</span>
      <div class="sim-rate" v-if="false">{{ content.simRate }}%</div>
    </header>
    <ul class="provider-list">
      <li
        class="provider-item"
        v-for="provider in content.providers"
        :key="provider.id"
      >
        {{ provider.name }}
      </li>
    </ul>
    <div class="details">
      <div>{{ content.releaseDate }}</div>
      <div v-if="content.rated">{{ content.rated }}</div>
      <div v-if="content.seasons">시즌 {{ content.seasons }}개</div>
    </div>
    <div class="overview">
      {{ content.overview }}
    </div>
    <fieldset class="rating-wrapper" @change="handleChange" v-if="isLogin">
      <template v-for="i in 5" :key="i">
        <input
          type="radio"
          v-model="rating"
          :id="`rating${6 - i}`"
          name="rating"
          :value="6 - i"
        />
        <label class="material-icons star" :for="`rating${6 - i}`">star</label>
      </template>
    </fieldset>
  </section>
</template>

<script lang="ts">
import { Content } from '@/libs/interfaces/content'
import { computed, defineComponent, PropType, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ContentDetailInfoSection',
  props: {
    content: {
      type: Object as PropType<Content>,
    },
  },
  setup() {
    const store = useStore()
    const rating = ref<number | null>(null)
    const isLogin = computed(() => store.getters['auth/isLogin'])

    const handleChange = () => {
      const ok = confirm(`내가 매긴 점수: ${rating.value}점`)
      if (ok) {
        console.log(rating.value)
      } else {
        rating.value = null
      }
    }

    return {
      rating,
      isLogin,
      handleChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.info-section {
  @apply relative z-10 p-4 grid gap-4 md:text-white;

  .section-header {
    @apply flex justify-between items-center;

    .title {
      @apply text-2xl font-bold;
    }

    .sim-rate {
      @apply text-xs text-yellow-400 bg-gray-900 rounded-md py-0.5 px-2;
    }
  }

  .provider-list {
    @apply flex flex-wrap gap-2;
  }

  .details {
    @apply flex gap-2 text-sm;
  }

  .overview {
    word-break: keep-all;
    max-height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: break-spaces;
    @apply text-sm;
  }

  .rating-wrapper {
    @apply p-2 border border-gray-200 rounded mr-auto flex flex-row-reverse gap-1;

    input {
      @apply hidden;
    }
    .star {
      @apply text-gray-200;
    }

    input:checked ~ label, /* show gold star when clicked */
    &:not(:checked) > label:hover, /* hover current star */
    &:not(:checked) > label:hover ~ label {
      @apply text-yellow-400;
    }

    input:checked + label:hover, /* hover current star when changing rating */
    input:checked ~ label:hover,
    label:hover ~ input:checked ~ label, /* lighten current selection */
    input:checked ~ label:hover ~ label {
      @apply text-yellow-300;
    }
  }
}
</style>
