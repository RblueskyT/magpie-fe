<template>
  <a-list
    v-show="billingRecordsLoading[props.panel] === false"
    size="small"
    :bordered="false"
    :max-height="681"
    hoverable
    @reach-bottom="fetchMoreBillingRecords"
  >
    <template
      v-if="billingRecords[Number(focusedAccountIdx)][props.panel].length > 10"
      #scroll-loading
    >
      <a-empty
        v-if="reachBottomFlag"
        description="You don't have more transactions to show."
        style="padding: 0px; flex-direction: column"
      >
        <template #image>
          <icon-info-circle />
        </template>
      </a-empty>
      <a-spin v-else />
    </template>
    <template #empty>
      <a-empty description="No data" style="flex-direction: column" />
    </template>
    <a-list-item
      v-for="(itemRecord, indexRecord) in billingRecords[
        Number(focusedAccountIdx)
      ][props.panel]"
      :key="indexRecord"
      :class="itemRecord.title ? 'date-of-records' : 'record-content'"
      @click="showTransactionDetails(itemRecord)"
    >
      <div v-if="itemRecord.title">
        {{ itemRecord.title }}
      </div>
      <a-list-item-meta v-if="!itemRecord.title" :title="itemRecord.payee">
        <template #avatar>
          <a-avatar
            v-if="itemRecord.type === 'Out' && itemRecord.pending === false"
            shape="circle"
            style="
              border: 1px solid #f73131;
              color: #f73131;
              background-color: white;
            "
          >
            {{ itemRecord.type }}
          </a-avatar>
          <a-avatar
            v-else-if="itemRecord.type === 'In' && itemRecord.pending === false"
            shape="circle"
            style="
              border: 1px solid #00b42a;
              color: #00b42a;
              background-color: white;
            "
          >
            {{ itemRecord.type }}
          </a-avatar>
          <a-avatar
            v-else
            shape="circle"
            style="
              border: 1px dashed #86909c;
              color: #86909c;
              background-color: white;
            "
          >
            {{ itemRecord.type }}
          </a-avatar>
        </template>
      </a-list-item-meta>
      <template v-if="!itemRecord.title" #extra>
        <div class="amount-and-balance" style="height: 100%; display: flex">
          <a-space direction="vertical" :size="0" fill>
            <a-typography-text
              v-if="itemRecord.type === 'Out'"
              style="font-size: 16px; line-height: 1"
            >
              -£{{ numberFormatter(itemRecord.amount.toString()) }}
            </a-typography-text>
            <a-typography-text
              v-else
              type="success"
              style="font-size: 16px; line-height: 1"
            >
              £{{ numberFormatter(itemRecord.amount.toString()) }}
            </a-typography-text>
            <a-typography-text
              v-if="itemRecord.pending === false"
              type="secondary"
              style="line-height: 1"
            >
              £{{ numberFormatter(itemRecord.balance.toString()) }}
            </a-typography-text>
            <a-typography-text v-else type="secondary" style="line-height: 1">
              {{ itemRecord.date }}
            </a-typography-text>
          </a-space>
        </div>
      </template>
    </a-list-item>
  </a-list>
  <div
    v-show="billingRecordsLoading[props.panel] === true"
    class="panel-spin-container"
  >
    <a-spin :size="48" tip="Loading ..." />
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    queryBillingRecordListAll,
    queryBillingRecordListIn,
    queryBillingRecordListOut,
  } from '@/api/banking-services';
  import numberFormatter from '@/utils/number-formatter';

  const props = defineProps<{
    panel: string;
  }>();
  const focusedAccountIdx: any = inject('focusedAccountIdx');
  const focusedAccount: any = inject('focusedAccount');
  const billingRecords: any = inject('billingRecords');
  const currentPage: any = inject('currentPage');
  const totalPage: any = inject('totalPage');
  const billingRecordsLoading: any = inject('billingRecordsLoading');
  const detailsDrawerVisibleFlag: any = inject('detailsDrawerVisibleFlag');
  const detailsDrawerContent: any = inject('detailsDrawerContent');
  const transactionDetails: any = inject('transactionDetails');
  const reachBottomFlag = ref(false);
  const listBillingRecords = async (
    enableLoading: boolean,
    accountIdx: number,
    newPage: number
  ) => {
    billingRecordsLoading.value[props.panel] = enableLoading;
    try {
      const reqData = {
        sortCode: focusedAccount.value.sortCode,
        accountNumber: focusedAccount.value.accountNumber,
        page: newPage,
      };
      let resData: any;
      if (props.panel === 'all') {
        resData = await queryBillingRecordListAll(reqData);
      } else if (props.panel === 'in') {
        resData = await queryBillingRecordListIn(reqData);
      } else {
        resData = await queryBillingRecordListOut(reqData);
      }
      if ((resData as any).code === 20000) {
        let convertedResData: any = [];
        for (let i = 0; i < resData.data.dailyRecords.length; i += 1) {
          const collectionTitle = { title: resData.data.dailyRecords[i].date };
          convertedResData.push(collectionTitle);
          convertedResData = convertedResData.concat(
            resData.data.dailyRecords[i].records
          );
        }
        billingRecords.value[accountIdx][props.panel] =
          billingRecords.value[accountIdx][props.panel].concat(
            convertedResData
          );
      } else {
        Message.error(
          'Sorry, the billing records cannot be retrieved at this time'
        );
      }
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      billingRecordsLoading.value[props.panel] = false;
      if (
        currentPage.value[accountIdx][props.panel] ===
        totalPage.value[accountIdx][props.panel]
      ) {
        reachBottomFlag.value = true;
      }
    }
  };
  const fetchMoreBillingRecords = () => {
    const accountIdx = Number(focusedAccountIdx.value);
    if (
      currentPage.value[accountIdx][props.panel] <
      totalPage.value[accountIdx][props.panel]
    ) {
      let enableLoading = false;
      if (currentPage.value[accountIdx][props.panel] === 0) {
        enableLoading = true;
      }
      currentPage.value[accountIdx][props.panel] += 1;
      listBillingRecords(
        enableLoading,
        accountIdx,
        currentPage.value[accountIdx][props.panel]
      );
    }
  };
  const updateReachBottomFlag = () => {
    const accountIdx = Number(focusedAccountIdx.value);
    if (
      currentPage.value[accountIdx][props.panel] ===
      totalPage.value[accountIdx][props.panel]
    ) {
      reachBottomFlag.value = true;
    }
  };
  const showTransactionDetails = (record: any) => {
    if (!record.title) {
      transactionDetails.value.type = record.type;
      transactionDetails.value.payee = record.payee;
      transactionDetails.value.amount = record.amount;
      transactionDetails.value.date = record.date;
      transactionDetails.value.balance = record.balance;
      transactionDetails.value.pending = record.pending;
      transactionDetails.value.remark = record.remark;
      detailsDrawerContent.value = 'transaction';
      detailsDrawerVisibleFlag.value = true;
    }
  };

  updateReachBottomFlag();
</script>

<style lang="less" scoped>
  .date-of-records {
    background-color: #f2f3f5;
  }

  .amount-and-balance :deep(.arco-space-fill) {
    justify-content: space-between;
    align-items: end;
  }

  .panel-spin-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
