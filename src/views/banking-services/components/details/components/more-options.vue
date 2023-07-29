<template>
  <div class="more-options">
    <a-list :bordered="false" :split="false">
      <a-list-item>
        <a-button type="text" size="large" long @click="goToPay()">
          <template #icon>
            <icon-send />
          </template>
          <template #default>Pay</template>
        </a-button>
      </a-list-item>
      <a-list-item>
        <a-button type="text" size="large" long @click="goToTransfer()">
          <template #icon>
            <icon-swap />
          </template>
          <template #default>Transfer</template>
        </a-button>
      </a-list-item>
      <a-list-item>
        <a-button type="text" size="large" long @click="goToManagePayees()">
          <template #icon>
            <icon-user-group />
          </template>
          <template #default>Manage Payees</template>
        </a-button>
      </a-list-item>
      <a-list-item>
        <a-button type="text" size="large" long @click="closeMenu()">
          <template #icon>
            <icon-close />
          </template>
          <template #default>Close Menu</template>
        </a-button>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';

  const focusedAccountIdx: any = inject('focusedAccountIdx');
  const moreOptionsDrawerVisibleFlag: any = inject(
    'moreOptionsDrawerVisibleFlag'
  );
  const detailsDrawerVisibleFlag: any = inject('detailsDrawerVisibleFlag');
  const detailsDrawerContent: any = inject('detailsDrawerContent');
  const bottomMenuKey: any = inject('bottomMenuKey');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const paymentForm: any = inject('paymentForm');
  const transferForm: any = inject('transferForm');
  const goToPay = () => {
    paymentForm.value.from = focusedAccountIdx.value;
    bottomMenuKey.value[0] = '1';
    drawerTwoVisibleFlag.value = true;
    moreOptionsDrawerVisibleFlag.value = false;
  };
  const goToTransfer = () => {
    transferForm.value.from = focusedAccountIdx.value;
    bottomMenuKey.value[0] = '2';
    drawerTwoVisibleFlag.value = true;
    moreOptionsDrawerVisibleFlag.value = false;
  };
  const goToManagePayees = () => {
    detailsDrawerContent.value = 'payees';
    detailsDrawerVisibleFlag.value = true;
    moreOptionsDrawerVisibleFlag.value = false;
  };
  const closeMenu = () => {
    moreOptionsDrawerVisibleFlag.value = false;
  };
</script>

<style lang="less" scoped>
  .more-options :deep(.arco-list-content > .arco-list-item) {
    padding: 0px 0px;
  }

  .more-options :deep(.arco-btn) {
    justify-content: start;
  }

  .more-options :deep(.arco-btn-size-large) {
    height: 60px;
    font-size: 16px;
  }
</style>
