<template>
  <div class="overview">
    <a-row style="width: 100%">
      <a-col :span="12" style="text-align: left">
        <a-space direction="vertical" :size="4" fill>
          <a-typography-text style="font-size: 16px" type="secondary">
            Balance
          </a-typography-text>
          <a-typography-title :heading="4" style="margin: 0; color: #272e3b">
            £{{ numberFormatter(focusedAccount.balance.toString()) }}
          </a-typography-title>
          <a-typography-text style="font-size: 16px; color: #86909c">
            Pending
          </a-typography-text>
        </a-space>
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a-space direction="vertical" :size="4" fill>
          <a-typography-text style="font-size: 16px" type="secondary">
            Balance incl. pending
          </a-typography-text>
          <a-typography-title :heading="4" style="margin: 0; color: #272e3b">
            £{{ numberFormatter(focusedAccount.balanceInclPending.toString()) }}
          </a-typography-title>
          <a-typography-text style="font-size: 16px; color: #86909c">
            <span v-if="computePending().positive === false">-</span>£{{
              numberFormatter(computePending().result.toString())
            }}
          </a-typography-text>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import Decimal from 'decimal.js';
  import numberFormatter from '@/utils/number-formatter';

  const focusedAccount: any = inject('focusedAccount');
  const computePending = () => {
    const balanceOne = new Decimal(focusedAccount.value.balance);
    const balanceTwo = new Decimal(focusedAccount.value.balanceInclPending);
    let resultVal = balanceOne.minus(balanceTwo);
    let positiveFlag = false;
    if (resultVal <= new Decimal(0)) {
      resultVal = balanceTwo.minus(balanceOne);
      positiveFlag = true;
    }
    return { result: resultVal, positive: positiveFlag };
  };
</script>

<style lang="less" scoped>
  .overview {
    display: flex;
    align-items: center;
    padding: 12px;
    height: 100%;
  }
</style>
