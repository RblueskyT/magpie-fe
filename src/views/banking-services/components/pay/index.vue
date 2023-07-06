<template>
  <div class="payment-layout">
    <a-layout>
      <a-layout-header>
        test
      </a-layout-header>
      <a-layout-content>
        test
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import numberFormatter from '@/utils/number-formatter';

  const paymentForm: any = inject('paymentForm');
</script>

<style lang="less" scoped>
  .payment-layout {
    position: relative;
    overflow: hidden;
  }

  .payment-layout > .arco-layout {
    height: 100vh;
  }

  .payment-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .payment-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
</style>
