<template>
  <div class="payees">
    <a-list
      v-if="focusedAccount.payees.length > 0"
      size="small"
      :bordered="false"
    >
      <a-list-item
        v-for="(itemPayee, indexPayee) in focusedAccount.payees"
        :key="indexPayee"
      >
        <a-list-item-meta>
          <template #avatar>
            <a-avatar
              v-if="itemPayee.type === 'Personal'"
              shape="circle"
              style="
                border: 1px solid #f73131;
                color: #f73131;
                background-color: white;
              "
            >
              {{ itemPayee.type }}
            </a-avatar>
            <a-avatar
              v-else
              shape="circle"
              style="
                border: 1px solid #cc9213;
                color: #cc9213;
                background-color: white;
              "
            >
              {{ itemPayee.type }}
            </a-avatar>
          </template>
          <template #title>
            {{ itemPayee.name.toUpperCase() }}
          </template>
          <template #description>
            {{ itemPayee.sortCode }} {{ itemPayee.accountNumber }}
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-link @click="openDeleteDrawer(indexPayee, itemPayee)">
            Delete
          </a-link>
        </template>
      </a-list-item>
    </a-list>
    <div
      v-if="focusedAccount.payees.length === 0"
      class="payees-empty-container"
    >
      <a-empty>
        <template #image>
          <icon-info-circle />
        </template>
        You currently have no payees.
      </a-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';

  const focusedAccount: any = inject('focusedAccount');
  const deleteDrawerVisibleFlag: any = inject('deleteDrawerVisibleFlag');
  const focusedPayee: any = inject('focusedPayee');
  const openDeleteDrawer = (payeeId: number, payeeInfo: any) => {
    focusedPayee.value.id = payeeId;
    focusedPayee.value.name = payeeInfo.name;
    focusedPayee.value.type = payeeInfo.type;
    focusedPayee.value.sortCode = payeeInfo.sortCode;
    focusedPayee.value.accountNumber = payeeInfo.accountNumber;
    focusedPayee.value.reference = payeeInfo.reference;
    focusedPayee.value.lastPaidDate = payeeInfo.lastPaidDate;
    focusedPayee.value.lastPaidAmount = payeeInfo.lastPaidAmount;
    deleteDrawerVisibleFlag.value = true;
  };
</script>

<style lang="less" scoped>
  .payees {
    height: 100%;
  }

  .payees :deep(.arco-list) {
    border-radius: 0px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .payees-empty-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
