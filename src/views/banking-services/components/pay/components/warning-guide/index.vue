<template>
  <div class="payment-warning-guide-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <Info :question="props.question" />
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import NavBar from './components/navbar.vue';
  import Info from './components/info.vue';

  const props = defineProps<{
    question: number;
  }>();
</script>

<style lang="less" scoped>
  .payment-warning-guide-layout > .arco-layout {
    height: 100vh;
  }

  .payment-warning-guide-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid white;
  }

  .payment-warning-guide-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
</style>
