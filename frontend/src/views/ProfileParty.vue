<template>
  <div>
    <p class="text-2xl font-bold profile-party__text--array">내 파티</p>
    <div class="profile-party__netflix__box">
      <div class="profile-party__netflix__box__text--array">
        <p class="font-semibold">넷플릭스 프리미엄</p>
        <img
          src="@/assets/images/Netflix.png"
          class="profile-party__netfilx__box__image--size"
          alt="넷플릭스"
        />
      </div>
      <div class="profile-party__netflix__box__text--array">
        <p>21.12.25까지 (109일)</p>
        <p>10,900원</p>
      </div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileParty',
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.profile-party__text--array {
  margin-top: 45px;
  margin-left: 30px;
  margin-bottom: 15px;
}

.profile-party__netflix__box {
  border: 1px red solid;
  border-radius: 1%;
  width: 93%;
  height: 500px;
  margin: 10px auto;
  padding: 30px 30px;
}

.profile-party__netfilx__box__image--size {
  width: 50px;
  height: 50px;
}

.profile-party__netflix__box__text--array {
  display: flex;
  justify-content: space-between;
  // margin-top: 20px;
  margin-bottom: 30px;
}
</style>
