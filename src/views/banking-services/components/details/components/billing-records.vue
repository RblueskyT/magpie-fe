<template>
  <div class="billing-records">
    <a-tabs size="large" type="rounded" :justify="true" :animation="true">
      <a-tab-pane key="ALL" title="ALL" :disabled="billingRecordsLoading">
        <a-list size="small" :bordered="false" :max-height="681" hoverable>
          <a-list-item
            v-for="(itemRecord, indexRecord) in billingRecords[
              Number(focusedAccountIdx)
            ].all"
            :key="indexRecord"
            :class="itemRecord.title ? 'date-of-records' : 'record-content'"
          >
            <div v-if="itemRecord.title">
              {{ itemRecord.title }}
            </div>
            <a-list-item-meta
              v-if="!itemRecord.title"
              :title="itemRecord.payee"
            >
              <template #avatar>
                <a-avatar
                  v-if="
                    itemRecord.type === 'Out' && itemRecord.pending === false
                  "
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
                  v-else-if="
                    itemRecord.type === 'In' && itemRecord.pending === false
                  "
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
              <div
                class="amount-and-balance"
                style="height: 100%; display: flex"
              >
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
                  <a-typography-text type="secondary" style="line-height: 1">
                    £{{ numberFormatter(itemRecord.balance.toString()) }}
                  </a-typography-text>
                </a-space>
              </div>
            </template>
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <a-tab-pane key="IN" title="IN" :disabled="billingRecordsLoading">
        Content of Tab Panel 2
      </a-tab-pane>
      <a-tab-pane key="OUT" title="OUT" :disabled="billingRecordsLoading">
        Content of Tab Panel 3
      </a-tab-pane>
    </a-tabs>
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
        let convertedResData: any = [];
        for (let i = 0; i < resData.data.dailyRecords.length; i += 1) {
          const collectionTitle = { title: resData.data.dailyRecords[i].date };
          convertedResData.push(collectionTitle);
          convertedResData = convertedResData.concat(
            resData.data.dailyRecords[i].records
          );
        }
        billingRecords.value[accountIdx].all =
          billingRecords.value[accountIdx].all.concat(convertedResData);
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
        let convertedResData: any = [];
        for (let i = 0; i < resData.data.dailyRecords.length; i += 1) {
          const collectionTitle = { title: resData.data.dailyRecords[i].date };
          convertedResData.push(collectionTitle);
          convertedResData = convertedResData.concat(
            resData.data.dailyRecords[i].records
          );
        }
        billingRecords.value[accountIdx].in =
          billingRecords.value[accountIdx].in.concat(convertedResData);
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
        let convertedResData: any = [];
        for (let i = 0; i < resData.data.dailyRecords.length; i += 1) {
          const collectionTitle = { title: resData.data.dailyRecords[i].date };
          convertedResData.push(collectionTitle);
          convertedResData = convertedResData.concat(
            resData.data.dailyRecords[i].records
          );
        }
        billingRecords.value[accountIdx].out =
          billingRecords.value[accountIdx].out.concat(convertedResData);
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

  .date-of-records {
    background-color: #f2f3f5;
  }

  .amount-and-balance :deep(.arco-space-fill) {
    justify-content: space-between;
    align-items: end;
  }
</style>
