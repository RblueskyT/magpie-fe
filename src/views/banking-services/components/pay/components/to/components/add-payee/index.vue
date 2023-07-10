<template>
  <div id="addPayeeModalDrawerContainer" class="add-payee-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <AddForm />
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <!-- TODO: MODAL AND DRAWER -->
  </div>
</template>

<script lang="ts" setup>
  import NavBar from './components/navbar.vue';
  import AddForm from './components/add-form.vue';
</script>

<style lang="less" scoped>
  .add-payee-layout {
    position: relative;
    overflow: hidden;
  }

  .add-payee-layout > .arco-layout {
    height: 100vh;
  }

  .add-payee-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .add-payee-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
</style>
