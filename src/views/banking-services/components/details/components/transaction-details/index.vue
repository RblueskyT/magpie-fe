<template>
  <div class="transaction-details-layout">
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
  import NavBar from './components/navbar.vue';
  import Info from './components/info.vue';
</script>

<style lang="less" scoped>
  .transaction-details-layout > .arco-layout {
    height: 100vh;
  }

  .transaction-details-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .transaction-details-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }
</style>
