<template>
  <div class="billing-records">
    <a-tabs size="large" type="rounded" :justify="true" :animation="true">
      <a-tab-pane key="ALL" title="ALL" :disabled="billingRecordsLoading.all">
        <BrsTabPanel panel="all" />
      </a-tab-pane>
      <a-tab-pane key="IN" title="IN" :disabled="billingRecordsLoading.in">
        <BrsTabPanel panel="in" />
      </a-tab-pane>
      <a-tab-pane key="OUT" title="OUT" :disabled="billingRecordsLoading.out">
        <BrsTabPanel panel="out" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref, provide } from 'vue';
  import BrsTabPanel from './brs-tab-panel.vue';

  const billingRecordsLoading = ref({
    all: false,
    in: false,
    out: false,
  });

  provide('billingRecordsLoading', billingRecordsLoading);
</script>

<style lang="less" scoped>
  .billing-records {
    height: 100%;
    padding-top: 16px;
  }

  .billing-records :deep(.arco-tabs-nav-tab-list) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0px 6px;
  }

  .billing-records :deep(.arco-tabs-tab) {
    width: 140px;
    justify-content: center;
  }

  .billing-records :deep(.arco-list) {
    border-radius: 0px;
    border-top: 1px solid var(--color-neutral-3);
    border-bottom: 1px solid var(--color-neutral-3);
  }
</style>
