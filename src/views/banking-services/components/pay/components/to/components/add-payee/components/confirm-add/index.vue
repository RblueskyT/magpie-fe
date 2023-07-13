<template>
  <div class="add-payee-warning-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <Info />
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import { ref, provide } from 'vue';
  import NavBar from './components/navbar.vue';
  import Info from './components/info.vue';

  const continueBtnLoading = ref(false);

  provide('continueBtnLoading', continueBtnLoading);
</script>

<style lang="less" scoped>
  .add-payee-warning-layout > .arco-layout {
    height: 100vh;
  }

  .add-payee-warning-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid white;
  }

  .add-payee-warning-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
</style>
