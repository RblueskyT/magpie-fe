<template>
  <div class="payment-container">
    <a-space direction="vertical" :size="16" fill> </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue';

  const bankAccounts: any = inject('bankAccounts');
  const paymentForm = reactive({
    from: '',
    to: '',
    amount: 0,
    reference: '',
    date: '',
    paymentPurpose: '',
  });
  const numberFormatter = (value: string) => {
    const values = value.split('.');
    values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return values.join('.');
  };
</script>

<style lang="less" scoped>
  .payment-container {
    padding: 8px 8px;
    height: 100%;
    overflow-y: auto;
  }
</style>
