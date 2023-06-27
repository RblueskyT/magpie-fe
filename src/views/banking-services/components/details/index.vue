<template>
  <div class="details-layout">
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
  </div>
</template>

<script lang="ts" setup>
  import { computed, provide, inject, readonly } from 'vue';
  import NavBar from './components/navbar.vue';
  import Overview from './components/overview.vue';
  import BillingRecords from './components/billing-records.vue';

  const bankAccounts: any = inject('bankAccounts');
  const focusedAccountIdx: any = inject('focusedAccountIdx');
  const focusedAccount = computed(() => {
    return bankAccounts.value[Number(focusedAccountIdx.value)];
  });

  provide('focusedAccount', readonly(focusedAccount));
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
