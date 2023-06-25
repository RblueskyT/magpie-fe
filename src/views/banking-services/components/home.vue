<template>
  <div class="home-container">
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
              <a-link>Details</a-link>
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
                style="margin: 0; color: #4e5969"
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
</template>

<script lang="ts" setup>
  import { inject } from 'vue';

  const bankAccounts: any = inject('bankAccounts');
  const numberFormatter = (value: string) => {
    const values = value.split('.');
    values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return values.join('.');
  };
</script>

<style lang="less" scoped>
  .home-container {
    padding: 8px 8px;
    height: 100%;
    overflow-y: auto;
  }
</style>
