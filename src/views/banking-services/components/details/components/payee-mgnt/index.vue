<template>
  <div id="payeeMgntDrawerContainer" class="payee-mgnt-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <Payees />
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <!-- DELETE A PAYEE -->
    <a-drawer
      v-model:visible="deleteDrawerVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      :width="500"
      popup-container="#payeeMgntDrawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <DeletePayee />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, provide } from 'vue';
  import NavBar from './components/navbar.vue';
  import Payees from './components/payees.vue';
  import DeletePayee from './components/delete-payee/index.vue';

  const deleteDrawerVisibleFlag = ref(false);
  const focusedPayee = ref({
    id: -1, // use the index of the payee as its id
    name: '',
    type: '',
    sortCode: '',
    accountNumber: '',
    reference: '',
    lastPaidDate: '',
    lastPaidAmount: 0,
  });

  provide('deleteDrawerVisibleFlag', deleteDrawerVisibleFlag);
  provide('focusedPayee', focusedPayee);
</script>

<style lang="less" scoped>
  .payee-mgnt-layout {
    position: relative;
    overflow: hidden;
  }

  .payee-mgnt-layout > .arco-layout {
    height: 100vh;
  }

  .payee-mgnt-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .payee-mgnt-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
</style>
