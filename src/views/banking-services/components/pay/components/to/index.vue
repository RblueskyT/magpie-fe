<template>
  <div id="payToDrawerContainer" class="pay-to-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <Radios />
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <!-- ADD NEW PAYEE -->
    <a-drawer
      v-model:visible="payToDrawerVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      :width="500"
      popup-container="#payToDrawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <AddPayee />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, provide } from 'vue';
  import NavBar from './components/navbar.vue';
  import Radios from './components/radios.vue';
  import AddPayee from './components/add-payee/index.vue';

  const payToDrawerVisibleFlag = ref(false);

  provide('payToDrawerVisibleFlag', payToDrawerVisibleFlag);
</script>

<style lang="less" scoped>
  .pay-to-layout {
    position: relative;
    overflow: hidden;
  }

  .pay-to-layout > .arco-layout {
    height: 100vh;
  }

  .pay-to-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .pay-to-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
</style>
