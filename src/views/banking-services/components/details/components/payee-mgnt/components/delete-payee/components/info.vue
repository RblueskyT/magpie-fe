<template>
  <div class="confirm-delete-container">
    <a-space direction="vertical" :size="24" fill>
      <a-space direction="vertical" :size="16" fill>
        <a-space direction="vertical" :size="24" fill>
          <a-typography-text>
            Are you sure you want to delete this payee?
          </a-typography-text>
          <a-descriptions size="medium" :column="1">
            <a-descriptions-item label="Name">
              {{ focusedPayee.name.toUpperCase() }}
            </a-descriptions-item>
            <a-descriptions-item label="Sort Code">
              {{ focusedPayee.sortCode }}
            </a-descriptions-item>
            <a-descriptions-item label="Account No.">
              {{ focusedPayee.accountNumber }}
            </a-descriptions-item>
            <a-descriptions-item label="Account Type">
              {{ focusedPayee.type }}
            </a-descriptions-item>
            <a-descriptions-item label="Reference">
              {{ focusedPayee.reference.toUpperCase() }}
            </a-descriptions-item>
            <a-descriptions-item label="Last Paid">
              {{ focusedPayee.lastPaidDate }}
            </a-descriptions-item>
            <a-descriptions-item label="Amount"
              >£{{
                numberFormatter(focusedPayee.lastPaidAmount.toString())
              }}</a-descriptions-item
            >
          </a-descriptions>
        </a-space>
        <a-typography-text>
          Deleting this payee will also delete any payments you might have set
          up to go in the future.
        </a-typography-text>
      </a-space>
      <a-button
        type="primary"
        shape="round"
        long
        :loading="deleteBtnLoading"
        @click="confirmDeletePayee()"
      >
        Delete
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { deletePayee } from '@/api/banking-services';
  import numberFormatter from '@/utils/number-formatter';

  const bankAccounts: any = inject('bankAccounts');
  const focusedAccountIdx: any = inject('focusedAccountIdx');
  const focusedAccount: any = inject('focusedAccount');
  const deleteDrawerVisibleFlag: any = inject('deleteDrawerVisibleFlag');
  const focusedPayee: any = inject('focusedPayee');
  const deleteBtnLoading: any = inject('deleteBtnLoading');
  const confirmDeletePayee = async () => {
    deleteBtnLoading.value = true;
    try {
      const reqData = {
        sortCode: focusedAccount.value.sortCode,
        accountNumber: focusedAccount.value.accountNumber,
        payeeId: focusedPayee.value.id,
      };
      const resData = await deletePayee(reqData);
      if (resData.data.status === 200) {
        bankAccounts.value[Number(focusedAccountIdx.value)].payees.splice(
          focusedPayee.value.id,
          1
        );
        deleteDrawerVisibleFlag.value = false;
        Message.success('You have successfully deleted this payee');
      } else {
        Message.error('Sorry, this payee cannot be deleted at this time');
      }
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      deleteBtnLoading.value = false;
    }
  };
</script>

<style lang="less" scoped>
  .confirm-delete-container {
    height: 100%;
    padding: 12px;
  }
</style>
