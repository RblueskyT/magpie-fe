<template>
  <div class="bottom-menu">
    <a-menu
      v-model:selected-keys="bottomMenuKey"
      mode="horizontal"
      @menu-item-click="goTo()"
    >
      <a-menu-item key="0" :disabled="homePageLoading">
        <template #icon>
          <icon-home />
        </template>
        Home
      </a-menu-item>
      <a-menu-item key="1" :disabled="homePageLoading">
        <template #icon>
          <icon-send />
        </template>
        Pay
      </a-menu-item>
      <a-menu-item key="2" :disabled="homePageLoading">
        <template #icon>
          <icon-swap />
        </template>
        Transfer
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';

  const bottomMenuKey: any = inject('bottomMenuKey');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const homePageLoading: any = inject('homePageLoading');
  const goTo = () => {
    if (bottomMenuKey.value[0] === '1' || bottomMenuKey.value[0] === '2') {
      drawerTwoVisibleFlag.value = true;
    }
  };
</script>

<style lang="less" scoped>
  .bottom-menu {
    width: 100%;
  }

  .bottom-menu :deep(.arco-menu-inner) {
    text-align: center;
    padding: 14px 0;
  }

  .bottom-menu :deep(.arco-menu-item) {
    width: 145px;
    margin-left: 0;
    padding: 0;
  }
</style>
