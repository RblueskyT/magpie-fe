<template>
  <a-space direction="vertical" :size="24" fill>
    <div class="transaction-type">
      <a-avatar
        v-if="
          transactionDetails.type === 'Out' &&
          transactionDetails.pending === false
        "
        shape="circle"
        :size="80"
        style="
          border: 2px solid #f73131;
          color: #f73131;
          background-color: white;
        "
      >
        {{ transactionDetails.type }}
      </a-avatar>
      <a-avatar
        v-else-if="
          transactionDetails.type === 'In' &&
          transactionDetails.pending === false
        "
        shape="circle"
        :size="80"
        style="
          border: 2px solid #00b42a;
          color: #00b42a;
          background-color: white;
        "
      >
        {{ transactionDetails.type }}
      </a-avatar>
      <a-avatar
        v-else
        shape="circle"
        :size="80"
        style="
          border: 2px dashed #86909c;
          color: #86909c;
          background-color: white;
        "
      >
        {{ transactionDetails.type }}
      </a-avatar>
    </div>
    <div class="transaction-key-info">
      <a-typography-title
        type="secondary"
        :heading="5"
        style="margin: 0; line-height: 20px"
      >
        {{ transactionDetails.payeeOrPayer }}
      </a-typography-title>
    </div>
    <div class="transaction-key-info">
      <a-typography-title
        v-if="transactionDetails.type === 'Out'"
        :heading="5"
        style="margin: 0; line-height: 20px"
      >
        -£{{ numberFormatter(transactionDetails.amount.toString()) }}
      </a-typography-title>
      <a-typography-title
        v-else
        type="success"
        :heading="5"
        style="margin: 0; line-height: 20px"
      >
        £{{ numberFormatter(transactionDetails.amount.toString()) }}
      </a-typography-title>
    </div>
    <div class="transaction-remark">
      <a-typography-title type="secondary" :heading="6" style="margin: 0">
        {{ transactionDetails.remark }}
      </a-typography-title>
      <a-typography-title
        v-if="transactionDetails.pending === false"
        type="secondary"
        :heading="6"
        style="margin: 0"
      >
        On {{ transactionDetails.date }}
      </a-typography-title>
      <a-typography-title
        v-else
        type="secondary"
        :heading="6"
        style="margin: 0"
      >
        Pending
      </a-typography-title>
    </div>
  </a-space>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import numberFormatter from '@/utils/number-formatter';

  const transactionDetails: any = inject('transactionDetails');
</script>

<style lang="less" scoped>
  .transaction-type {
    padding-top: 24px;
    text-align: center;
  }

  .transaction-key-info {
    text-align: center;
  }

  .transaction-remark {
    height: 72px;
    width: 500px;
    padding: 12px 0px;
    text-align: center;
    background-color: #f2f3f5;
  }
</style>
