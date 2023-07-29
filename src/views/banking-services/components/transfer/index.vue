<template>
  <div id="transferModalDrawerContainer" class="transfer-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <TransferForm />
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <!-- CONFIRM GO BACK -->
    <a-modal
      v-model:visible="goBackModalTransferVisibleFlag"
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
      popup-container="#transferModalDrawerContainer"
      :esc-to-close="false"
      @ok="confirmGoBack()"
      @cancel="cancelGoBack()"
    >
      <div>Are you sure you want to cancel the transfer?</div>
    </a-modal>
    <!-- CHOOSE FROM AND CHOOSE TO -->
    <a-drawer
      v-model:visible="transferDrawerVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      :width="500"
      popup-container="#transferModalDrawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <From v-if="transferDrawerContent === 'from'" />
      <To v-if="transferDrawerContent === 'to'" />
    </a-drawer>
    <!-- REVIEW TRANSFER DETAILS -->
    <a-drawer
      v-model:visible="reviewDetailsDrawerVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      :width="500"
      popup-container="#transferModalDrawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <ReviewDetails v-if="transferForm.to.length > 0" />
    </a-drawer>
    <!-- TRANSFER SUCCESS -->
    <a-drawer
      v-model:visible="transferSuccessDrawerVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      :width="500"
      popup-container="#transferModalDrawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <TransferSuccess />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject, provide } from 'vue';
  import NavBar from './components/navbar.vue';
  import TransferForm from './components/transfer-form.vue';
  import From from './components/from/index.vue';
  import To from './components/to/index.vue';
  import ReviewDetails from './components/review-details/index.vue';
  import TransferSuccess from './components/transfer-success.vue';

  const bottomMenuKey: any = inject('bottomMenuKey');
  const transferForm: any = inject('transferForm');
  const transferFormTempAmount: any = inject('transferFormTempAmount');
  const transferFormTempDate: any = inject('transferFormTempDate');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const goBackModalTransferVisibleFlag = ref(false);
  const transferDrawerVisibleFlag = ref(false);
  const transferDrawerContent = ref(''); // 'from' or 'to'
  const disableContinueFlag = ref(true);
  const reviewDetailsDrawerVisibleFlag = ref(false);
  const transferSuccessDrawerVisibleFlag = ref(false);
  const cancelGoBack = () => {
    goBackModalTransferVisibleFlag.value = false;
  };
  const confirmGoBack = () => {
    transferForm.value.from = '';
    transferForm.value.to = '';
    transferForm.value.amount = 0;
    transferFormTempAmount.value = 0;
    transferForm.value.date = '';
    transferFormTempDate.value = '';
    drawerTwoVisibleFlag.value = false;
    bottomMenuKey.value[0] = '0';
  };

  provide('goBackModalTransferVisibleFlag', goBackModalTransferVisibleFlag);
  provide('transferDrawerVisibleFlag', transferDrawerVisibleFlag);
  provide('transferDrawerContent', transferDrawerContent);
  provide('disableContinueFlag', disableContinueFlag);
  provide('reviewDetailsDrawerVisibleFlag', reviewDetailsDrawerVisibleFlag);
  provide('transferSuccessDrawerVisibleFlag', transferSuccessDrawerVisibleFlag);
</script>

<style lang="less" scoped>
  .transfer-layout {
    position: relative;
    overflow: hidden;
  }

  .transfer-layout > .arco-layout {
    height: 100vh;
  }

  .transfer-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .transfer-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;
  }

  .transfer-layout :deep(.arco-modal-container) {
    z-index: inherit;
    position: absolute;
  }

  .transfer-layout :deep(.arco-modal-simple) {
    padding: 16px;
  }

  .transfer-layout :deep(.arco-modal-simple > .arco-modal-footer) {
    text-align: right;
  }

  .transfer-layout
    :deep(.arco-modal-simple > .arco-modal-footer > .arco-btn-text) {
    color: #1d2129;
  }
</style>
