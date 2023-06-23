<template>
  <div class="accounts-overview-container">
    <a-space direction="vertical" :size="16" fill>
      <a-card
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
                BASIC BANK ACCOUNT
              </a-typography-title>
            </a-col>
            <a-col :span="8" style="text-align: right">
              <a-link>Details</a-link>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: left">
              <a-typography-text type="secondary">
                00-00-00 12345678
              </a-typography-text>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: left">
              <a-typography-title
                :heading="5"
                style="margin: 0; color: #4e5969"
              >
                £2,370.31
              </a-typography-title>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: left">
              <a-typography-text type="secondary">
                Balance incl. pending: £1,000.35
              </a-typography-text>
            </a-col>
          </a-row>
        </a-space>
      </a-card>
      <a-card
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
                BASIC TOP-UP DEBIT CARD
              </a-typography-title>
            </a-col>
            <a-col :span="8" style="text-align: right">
              <a-link>Details</a-link>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: left">
              <a-typography-text type="secondary">
                01-02-03 87654321
              </a-typography-text>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: left">
              <a-typography-title
                :heading="5"
                style="margin: 0; color: #4e5969"
              >
                £3,870.62
              </a-typography-title>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: left">
              <a-typography-text type="secondary">
                Balance incl. pending: £1,702.93
              </a-typography-text>
            </a-col>
          </a-row>
        </a-space>
      </a-card>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useUser from '@/hooks/user';
</script>

<style lang="less" scoped>
  .accounts-overview-container {
    padding: 8px 8px;
    height: 100%;
    overflow-y: auto;
  }
</style>
