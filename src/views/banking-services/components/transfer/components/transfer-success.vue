<template>
  <div class="transfer-success-layout">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <a-result status="success" style="padding: 12px 12px 12px 12px">
          <template #title>
            <a-typography-title
              :heading="5"
              style="margin-top: 16px; margin-bottom: 32px"
            >
              Success
            </a-typography-title>
          </template>
          <template #subtitle>
            <a-typography-paragraph
              type="secondary"
              style="margin-bottom: 32px"
            >
              Transfer completed.
            </a-typography-paragraph>
          </template>
          <template #extra>
            <a-space direction="vertical" :size="16" fill>
              <a-button
                type="primary"
                shape="round"
                size="large"
                long
                @click="gotIt()"
              >
                Got It
              </a-button>
              <a-button
                type="outline"
                shape="round"
                size="large"
                long
                @click="makeAnotherTransfer()"
              >
                Make Another Transfer
              </a-button>
            </a-space>
          </template>
        </a-result>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';

  const bottomMenuKey: any = inject('bottomMenuKey');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const reviewDetailsDrawerVisibleFlag: any = inject(
    'reviewDetailsDrawerVisibleFlag'
  );
  const transferSuccessDrawerVisibleFlag: any = inject(
    'transferSuccessDrawerVisibleFlag'
  );
  const gotIt = () => {
    reviewDetailsDrawerVisibleFlag.value = false;
    transferSuccessDrawerVisibleFlag.value = false;
    drawerTwoVisibleFlag.value = false;
    bottomMenuKey.value[0] = '0';
  };
  const makeAnotherTransfer = () => {
    reviewDetailsDrawerVisibleFlag.value = false;
    transferSuccessDrawerVisibleFlag.value = false;
  };
</script>

<style lang="less" scoped>
  .transfer-success-layout > .arco-layout {
    height: 100vh;
  }

  .transfer-success-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
</style>
