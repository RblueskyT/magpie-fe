<template>
  <div id="paymentModalDrawerContainer" class="payment-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        test
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <!-- CONFIRM GO BACK -->
    <a-modal
      v-model:visible="goBackModalVisibleFlag"
      :width="400"
      title="Warning"
      title-align="start"
      :mask-closable="false"
      simple
      ok-text="YES"
      cancel-text="NO"
      :ok-button-props="{ type: 'text' }"
      :cancel-button-props="{ type: 'text' }"
      :render-to-body="false"
      popup-container="#paymentModalDrawerContainer"
      :esc-to-close="false"
      @ok="confirmGoBack()"
      @cancel="cancelGoBack()"
    >
      <div>Are you sure you want to cancel the payment?</div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject, provide } from 'vue';
  import NavBar from './components/navbar.vue';

  const bottomMenuKey: any = inject('bottomMenuKey');
  const paymentForm: any = inject('paymentForm');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const goBackModalVisibleFlag = ref(false);
  const cancelGoBack = () => {
    goBackModalVisibleFlag.value = false;
  };
  const confirmGoBack = () => {
    paymentForm.value.from = '';
    paymentForm.value.to = '';
    paymentForm.value.amount = 0;
    paymentForm.value.reference = '';
    paymentForm.value.date = '';
    paymentForm.value.paymentPurpose = '';
    drawerTwoVisibleFlag.value = false;
    bottomMenuKey.value[0] = '0';
  };

  provide('goBackModalVisibleFlag', goBackModalVisibleFlag);
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

  .payment-layout :deep(.arco-modal-container) {
    z-index: inherit;
    position: absolute;
  }

  .payment-layout :deep(.arco-modal-simple) {
    padding: 16px;
  }

  .payment-layout :deep(.arco-modal-simple > .arco-modal-footer) {
    text-align: right;
  }

  .payment-layout
    :deep(.arco-modal-simple > .arco-modal-footer > .arco-btn-text) {
    color: #1d2129;
  }
</style>
