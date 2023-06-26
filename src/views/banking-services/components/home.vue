<template>
  <div v-if="homePageLoading === false" class="home-container">
    <a-space direction="vertical" :size="16" fill>
      <a-card
        v-for="(itemAccount, indexAccount) in bankAccounts"
        :key="indexAccount"
        :style="{ height: '140px', padding: '10px 10px' }"
        :bordered="false"
      >
        <a-space direction="vertical" :size="8" fill>
          <a-row>
            <a-col :span="16" style="text-align: left">
              <a-typography-title
                :heading="6"
                style="margin: 0; color: #f53f3f"
              >
                {{ itemAccount.bankAccountType }}
              </a-typography-title>
            </a-col>
            <a-col :span="8" style="text-align: right">
              <a-link @click="setFocusedAccountIdx(indexAccount.toString())">
                Details
              </a-link>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: left">
              <a-typography-text type="secondary">
                {{ itemAccount.sortCode }} {{ itemAccount.accountNumber }}
              </a-typography-text>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: left">
              <a-typography-title
                :heading="5"
                style="margin: 0; color: #272e3b"
              >
                £{{ numberFormatter(itemAccount.balance.toString()) }}
              </a-typography-title>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: left">
              <a-typography-text type="secondary">
                Balance incl. pending: £{{
                  numberFormatter(itemAccount.balanceInclPending.toString())
                }}
              </a-typography-text>
            </a-col>
          </a-row>
        </a-space>
      </a-card>
    </a-space>
  </div>
  <div v-if="homePageLoading === true" class="home-spin-container">
    <a-spin :size="48" tip="Loading ..." />
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import numberFormatter from '@/utils/number-formatter';

  const bankAccounts: any = inject('bankAccounts');
  const homePageLoading: any = inject('homePageLoading');
  const focusedAccountIdx: any = inject('focusedAccountIdx');
  const setFocusedAccountIdx = (newValue: string) => {
    focusedAccountIdx.value = newValue;
  };
</script>

<style lang="less" scoped>
  .home-container {
    padding: 8px 8px;
    height: 100%;
    overflow-y: auto;
  }
  .home-spin-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
