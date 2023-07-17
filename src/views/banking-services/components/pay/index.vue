<template>
  <div id="paymentModalDrawerContainer" class="payment-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <PaymentForm />
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <!-- CONFIRM GO BACK -->
    <a-modal
      v-model:visible="goBackModalPayVisibleFlag"
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
    <!-- CHOOSE FROM AND CHOOSE TO -->
    <a-drawer
      v-model:visible="payDrawerVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      :width="500"
      popup-container="#paymentModalDrawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <From v-if="payDrawerContent === 'from'" />
      <To v-if="payDrawerContent === 'to'" />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject, provide } from 'vue';
  import NavBar from './components/navbar.vue';
  import PaymentForm from './components/payment-form.vue';
  import From from './components/from/index.vue';
  import To from './components/to/index.vue';

  const bottomMenuKey: any = inject('bottomMenuKey');
  const paymentForm: any = inject('paymentForm');
  const paymentFormTempAmount: any = inject('paymentFormTempAmount');
  const paymentFormTempDate: any = inject('paymentFormTempDate');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const goBackModalPayVisibleFlag = ref(false);
  const payDrawerVisibleFlag = ref(false);
  const payDrawerContent = ref(''); // 'from' or 'to'
  const continueLoading = ref(false);
  const disableContinueFlag = ref(true);
  const warningGuideDrawerVisibleFlag = ref(false);
  const warningGuideUserChoice = ref(0);
  const warningDrawerVisibleFlag = ref(false);
  const cancelGoBack = () => {
    goBackModalPayVisibleFlag.value = false;
  };
  const confirmGoBack = () => {
    paymentForm.value.from = '';
    paymentForm.value.to = '';
    paymentForm.value.amount = 0;
    paymentFormTempAmount.value = 0;
    paymentForm.value.reference = '';
    paymentForm.value.date = '';
    paymentFormTempDate.value = '';
    paymentForm.value.paymentPurpose = '';
    drawerTwoVisibleFlag.value = false;
    bottomMenuKey.value[0] = '0';
  };

  provide('goBackModalPayVisibleFlag', goBackModalPayVisibleFlag);
  provide('payDrawerVisibleFlag', payDrawerVisibleFlag);
  provide('payDrawerContent', payDrawerContent);
  provide('continueLoading', continueLoading);
  provide('disableContinueFlag', disableContinueFlag);
  provide('warningGuideDrawerVisibleFlag', warningGuideDrawerVisibleFlag);
  provide('warningGuideUserChoice', warningGuideUserChoice);
  provide('warningDrawerVisibleFlag', warningDrawerVisibleFlag);
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
    background-color: #f2f3f5;
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
