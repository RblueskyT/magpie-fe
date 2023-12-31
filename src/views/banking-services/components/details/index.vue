<template>
  <div id="detailsDrawerContainer" class="details-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <Overview />
      </a-layout-content>
      <a-layout-footer>
        <BillingRecords />
      </a-layout-footer>
    </a-layout>
    <!-- TRANSACTION DETAILS AND PAYEE MANAGEMENT -->
    <a-drawer
      v-model:visible="detailsDrawerVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      :width="500"
      popup-container="#detailsDrawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <TransactionDetails v-if="detailsDrawerContent === 'transaction'" />
      <PayeeMgnt v-if="detailsDrawerContent === 'payees'" />
    </a-drawer>
    <!-- MORE OPTIONS -->
    <a-drawer
      v-model:visible="moreOptionsDrawerVisibleFlag"
      placement="bottom"
      :closable="false"
      :height="240"
      popup-container="#detailsDrawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <MoreOptions />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch, provide, inject, readonly } from 'vue';
  import NavBar from './components/navbar.vue';
  import MoreOptions from './components/more-options.vue';
  import Overview from './components/overview.vue';
  import BillingRecords from './components/billing-records.vue';
  import TransactionDetails from './components/transaction-details/index.vue';
  import PayeeMgnt from './components/payee-mgnt/index.vue';

  const bankAccounts: any = inject('bankAccounts');
  const focusedAccountIdx: any = inject('focusedAccountIdx');
  const focusedAccount = computed(() => {
    return bankAccounts.value[Number(focusedAccountIdx.value)];
  });
  const billingRecordsMaxHeight: any = inject('billingRecordsMaxHeight');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const moreOptionsDrawerVisibleFlag = ref(false);
  const detailsDrawerVisibleFlag = ref(false);
  const detailsDrawerContent = ref(''); // 'transaction' or 'payees'
  const transactionDetails = ref({
    type: '',
    payeeOrPayer: '',
    amount: 0,
    date: '',
    balance: 0,
    pending: false,
    remark: '',
  });

  watch(moreOptionsDrawerVisibleFlag, () => {
    if (moreOptionsDrawerVisibleFlag.value === true) {
      billingRecordsMaxHeight.value = 0;
    } else if (
      moreOptionsDrawerVisibleFlag.value === false &&
      detailsDrawerVisibleFlag.value === false &&
      drawerTwoVisibleFlag.value === false
    ) {
      billingRecordsMaxHeight.value = 681;
    }
  });
  watch(detailsDrawerVisibleFlag, () => {
    if (detailsDrawerVisibleFlag.value === true) {
      billingRecordsMaxHeight.value = 0;
    } else {
      billingRecordsMaxHeight.value = 681;
    }
  });

  provide('focusedAccount', readonly(focusedAccount));
  provide('moreOptionsDrawerVisibleFlag', moreOptionsDrawerVisibleFlag);
  provide('detailsDrawerVisibleFlag', detailsDrawerVisibleFlag);
  provide('detailsDrawerContent', detailsDrawerContent);
  provide('transactionDetails', transactionDetails);
</script>

<style lang="less" scoped>
  .details-layout {
    position: relative;
    overflow: hidden;
  }

  .details-layout > .arco-layout {
    height: 100vh;
  }

  .details-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .details-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .details-layout > .arco-layout > .arco-layout-footer {
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 750px;
    border-top: 1px solid var(--color-neutral-3);
  }
</style>
