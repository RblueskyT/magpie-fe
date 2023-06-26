<template>
  <div class="payment-container">
    <a-space direction="vertical" :size="16" fill> </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue';
  import numberFormatter from '@/utils/number-formatter';

  const bankAccounts: any = inject('bankAccounts');
  const paymentForm = reactive({
    from: '',
    to: '',
    amount: 0,
    reference: '',
    date: '',
    paymentPurpose: '',
  });
</script>

<style lang="less" scoped>
  .payment-container {
    padding: 8px 8px;
    height: 100%;
    overflow-y: auto;
  }
</style>
