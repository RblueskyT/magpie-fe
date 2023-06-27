<template>
  <div class="billing-records">test</div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    queryBillingRecordListAll,
    queryBillingRecordListIn,
    queryBillingRecordListOut,
  } from '@/api/banking-services';

  const focusedAccountIdx: any = inject('focusedAccountIdx');
  const focusedAccount: any = inject('focusedAccount');
  const billingRecords: any = inject('billingRecords');
  const currentPage: any = inject('currentPage');
  const billingRecordsLoading = ref(false);
  const listAllBillingRecords = async (
    enableLoading: boolean,
    accountIdx: number,
    newPage: number
  ) => {
    billingRecordsLoading.value = enableLoading;
    try {
      const reqData = {
        sortCode: focusedAccount.value.sortCode,
        accountNumber: focusedAccount.value.accountNumber,
        page: newPage,
      };
      const resData = await queryBillingRecordListAll(reqData);
      if ((resData as any).code === 20000) {
        billingRecords.value[accountIdx].all = billingRecords.value[
          accountIdx
        ].all.concat(resData.data.dailyRecords);
      } else {
        Message.error(
          'Sorry, the billing records cannot be retrieved at this time'
        );
      }
    } catch (error) {
      Message.error('Sorry, an unknown error has occurred');
    }
  };
  const listInBillingRecords = async (accountIdx: number, newPage: number) => {
    try {
      const reqData = {
        sortCode: focusedAccount.value.sortCode,
        accountNumber: focusedAccount.value.accountNumber,
        page: newPage,
      };
      const resData = await queryBillingRecordListIn(reqData);
      if ((resData as any).code === 20000) {
        billingRecords.value[accountIdx].in = billingRecords.value[
          accountIdx
        ].in.concat(resData.data.dailyRecords);
      } else {
        Message.error(
          'Sorry, the billing records cannot be retrieved at this time'
        );
      }
    } catch (error) {
      Message.error('Sorry, an unknown error has occurred');
    }
  };
  const listOutBillingRecords = async (accountIdx: number, newPage: number) => {
    try {
      const reqData = {
        sortCode: focusedAccount.value.sortCode,
        accountNumber: focusedAccount.value.accountNumber,
        page: newPage,
      };
      const resData = await queryBillingRecordListOut(reqData);
      if ((resData as any).code === 20000) {
        billingRecords.value[accountIdx].out = billingRecords.value[
          accountIdx
        ].out.concat(resData.data.dailyRecords);
      } else {
        Message.error(
          'Sorry, the billing records cannot be retrieved at this time'
        );
      }
    } catch (error) {
      Message.error('Sorry, an unknown error has occurred');
    } finally {
      billingRecordsLoading.value = false;
    }
  };
  const getBillingRecords = () => {
    const accountIdx = Number(focusedAccountIdx.value);
    if (currentPage.value[accountIdx].all === 0) {
      listAllBillingRecords(true, accountIdx, 1);
      listInBillingRecords(accountIdx, 1);
      listOutBillingRecords(accountIdx, 1);
      currentPage.value[accountIdx].all = 1;
      currentPage.value[accountIdx].in = 1;
      currentPage.value[accountIdx].out = 1;
    }
  };

  getBillingRecords();
</script>

<style lang="less" scoped></style>
