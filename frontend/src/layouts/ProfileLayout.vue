<template>
  <div>
    <div class="profile-main__navbar__button">
      <div>
        <router-link :to="{ name: 'ProfileMain' }">프로필</router-link>
      </div>
      <div class="profile-main__navbar__button--space">
        <router-link :to="{ name: 'ProfileParty' }">파티 관리</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileLayout',
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.profile-main__navbar__button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  height: 50px;
}
.profile-main__navbar__button--space {
  margin-left: 40px;
}
</style>
