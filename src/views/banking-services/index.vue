<template>
  <div class="app-container">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <div class="app-inner-container">
          <a-card class="app-inner-card" :bordered="false">
            <div id="drawerContainer" class="app-inner-content">
              <div class="home-layout">
                <a-layout>
                  <a-layout-header>
                    <NavBar />
                  </a-layout-header>
                  <a-layout-content>
                    <Home />
                  </a-layout-content>
                  <a-layout-footer>
                    <BottomMenu />
                  </a-layout-footer>
                </a-layout>
              </div>
            </div>
          </a-card>
        </div>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <!-- DETAILS -->
    <a-drawer
      v-model:visible="drawerOneVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      :width="500"
      popup-container="#drawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <AccountDetails v-if="focusedAccountIdx.length !== 0" />
    </a-drawer>
    <!-- PAY AND TRANSFER -->
    <a-drawer
      v-model:visible="drawerTwoVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      :width="500"
      popup-container="#drawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <Pay v-if="bottomMenuKey[0] === '1'" />
      <Transfer v-if="bottomMenuKey[0] === '2'" />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch, provide, readonly } from 'vue';
  import { getGroup } from '@/utils/auth';
  import NavBar from './components/navbar.vue';
  import Home from './components/home.vue';
  import BottomMenu from './components/bottom-menu.vue';
  import AccountDetails from './components/details/index.vue';
  import Pay from './components/pay/index.vue';
  import Transfer from './components/transfer/index.vue';

  const group = computed(() => {
    const rawGroup = getGroup();
    const finalGroup = [
      rawGroup?.substring(0, 3),
      rawGroup?.substring(3, 6),
      rawGroup?.substring(6, 9),
      rawGroup?.substring(9),
    ];
    return finalGroup;
  });
  const currentScenario = ref(0);
  const bankAccounts: any = ref([]);
  const homePageLoading = ref(false);
  const bottomMenuKey = ref(['0']);
  const drawerOneVisibleFlag = ref(false);
  const drawerTwoVisibleFlag = ref(false);
  const focusedAccountIdx = ref(''); // this is used for the control of the 'DETAILS' panel
  const billingRecordsMaxHeight = ref(681);
  const billingRecords: any = ref([
    {
      all: [],
      in: [],
      out: [],
    },
    {
      all: [],
      in: [],
      out: [],
    },
  ]);
  const pendingBillingRecords: any = ref([
    {
      all: [],
      in: [],
      out: [],
    },
    {
      all: [],
      in: [],
      out: [],
    },
  ]);
  const currentPage = ref([
    {
      all: 0,
      in: 0,
      out: 0,
    },
    {
      all: 0,
      in: 0,
      out: 0,
    },
  ]);
  const totalPage = ref([
    {
      all: 2,
      in: 1,
      out: 2,
    },
    {
      all: 1,
      in: 1,
      out: 1,
    },
  ]);
  const paymentForm = ref({
    from: '',
    to: '',
    amount: 0,
    reference: '',
    date: '',
    paymentPurpose: '',
  });
  const paymentFormTempAmount = ref(0);
  const paymentFormTempDate = ref('');
  const transferForm = ref({
    from: '',
    to: '',
    amount: 0,
    date: '',
  });
  const transferFormTempAmount = ref(0);
  const transferFormTempDate = ref('');

  // Check whether to open the drawer - details
  watch(focusedAccountIdx, () => {
    if (
      bottomMenuKey.value[0] === '0' &&
      focusedAccountIdx.value.length !== 0
    ) {
      drawerOneVisibleFlag.value = true;
    } else {
      drawerOneVisibleFlag.value = false;
    }
  });
  // hide the scrollbar if other drawers pop up
  watch(drawerTwoVisibleFlag, () => {
    if (drawerTwoVisibleFlag.value === true) {
      if (drawerOneVisibleFlag.value === true) {
        billingRecordsMaxHeight.value = 0;
      }
    }
    if (drawerTwoVisibleFlag.value === false) {
      if (drawerOneVisibleFlag.value === true) {
        billingRecordsMaxHeight.value = 681;
      }
    }
  });

  provide('group', readonly(group));
  provide('currentScenario', currentScenario);
  provide('bankAccounts', bankAccounts);
  provide('homePageLoading', homePageLoading);
  provide('bottomMenuKey', bottomMenuKey);
  provide('focusedAccountIdx', focusedAccountIdx);
  provide('billingRecordsMaxHeight', billingRecordsMaxHeight);
  provide('billingRecords', billingRecords);
  provide('pendingBillingRecords', pendingBillingRecords);
  provide('currentPage', currentPage);
  provide('totalPage', readonly(totalPage));
  provide('drawerTwoVisibleFlag', drawerTwoVisibleFlag);
  provide('paymentForm', paymentForm);
  provide('paymentFormTempAmount', paymentFormTempAmount);
  provide('paymentFormTempDate', paymentFormTempDate);
  provide('transferForm', transferForm);
  provide('transferFormTempAmount', transferFormTempAmount);
  provide('transferFormTempDate', transferFormTempDate);
</script>

<style lang="less" scoped>
  .app-container {
    height: 100vh;
  }

  .app-container > .arco-layout > .arco-layout-content {
    background-color: rgb(var(--gray-3));
  }

  .app-inner-container {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .app-inner-card {
    width: 500px;
  }

  .app-inner-card :deep(.arco-card-body) {
    padding: 0px;
  }

  .app-inner-content {
    position: relative;
    overflow: hidden;
  }

  .app-inner-content :deep(.arco-drawer-body) {
    padding: 0px;
  }

  .home-layout :deep(.arco-layout) {
    height: 100vh;
  }

  .home-layout :deep(.arco-layout-header) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f73131;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .home-layout :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;
  }

  .home-layout :deep(.arco-layout-footer) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-top: 1px solid var(--color-neutral-3);
  }
</style>
