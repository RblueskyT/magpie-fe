<template>
  <div class="transfer-from-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <Radios />
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import NavBar from './components/navbar.vue';
  import Radios from './components/radios.vue';
</script>

<style lang="less" scoped>
  .transfer-from-layout {
    position: relative;
    overflow: hidden;
  }

  .transfer-from-layout > .arco-layout {
    height: 100vh;
  }

  .transfer-from-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .transfer-from-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
</style>
