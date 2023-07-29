<template>
  <div class="authorise-transfer-container">
    <a-descriptions size="large" :column="1" style="margin-bottom: 16px">
      <a-descriptions-item label="From">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 4px">
          {{ bankAccounts[Number(transferForm.from)].bankAccountType }}
        </a-typography-paragraph>
        <a-typography-paragraph type="secondary" style="margin-bottom: 0px">
          {{ bankAccounts[Number(transferForm.from)].sortCode }}
          {{ bankAccounts[Number(transferForm.from)].accountNumber }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="To">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 4px">
          {{ bankAccounts[Number(transferForm.to)].bankAccountType }}
        </a-typography-paragraph>
        <a-typography-paragraph type="secondary" style="margin-bottom: 0px">
          {{ bankAccounts[Number(transferForm.to)].sortCode }}
          {{ bankAccounts[Number(transferForm.to)].accountNumber }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="Amount">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 0px">
          £{{ numberFormatter(transferForm.amount.toString()) }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="Date">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 0px">
          {{ transferForm.date }}
        </a-typography-paragraph>
      </a-descriptions-item>
    </a-descriptions>
    <a-button
      type="primary"
      shape="round"
      size="large"
      long
      style="margin-bottom: 16px"
      :loading="authoriseBtnLoading"
      @click="authoriseTheTransfer()"
    >
      Authorise Transfer
    </a-button>
    <a-button
      type="outline"
      shape="round"
      size="large"
      long
      :disabled="authoriseBtnLoading"
      @click="changeTransferDetails()"
    >
      Change Transfer Details
    </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import Decimal from 'decimal.js';
  import dayjs from 'dayjs';
  import numberFormatter from '@/utils/number-formatter';
  import { Message } from '@arco-design/web-vue';
  import { authoriseTransfer } from '@/api/banking-services';

  const bankAccounts: any = inject('bankAccounts');
  const billingRecords: any = inject('billingRecords');
  const pendingBillingRecords: any = inject('pendingBillingRecords');
  const transferForm: any = inject('transferForm');
  const transferFormTempAmount: any = inject('transferFormTempAmount');
  const transferFormTempDate: any = inject('transferFormTempDate');
  const disableContinueFlag: any = inject('disableContinueFlag');
  const reviewDetailsDrawerVisibleFlag: any = inject(
    'reviewDetailsDrawerVisibleFlag'
  );
  const authoriseBtnLoading: any = inject('authoriseBtnLoading');
  const transferSuccessDrawerVisibleFlag: any = inject(
    'transferSuccessDrawerVisibleFlag'
  );
  const authoriseTheTransfer = async () => {
    authoriseBtnLoading.value = true;
    try {
      const reqData = transferForm.value;
      const resData = await authoriseTransfer(reqData);
      if (resData.data.status === 200) {
        // update account details
        const currentBalanceOne = new Decimal(
          bankAccounts.value[Number(transferForm.value.from)].balance
        );
        const currentBalanceInclPendingOne = new Decimal(
          bankAccounts.value[Number(transferForm.value.from)].balanceInclPending
        );
        const currentBalanceTwo = new Decimal(
          bankAccounts.value[Number(transferForm.value.to)].balance
        );
        const currentBalanceInclPendingTwo = new Decimal(
          bankAccounts.value[Number(transferForm.value.to)].balanceInclPending
        );
        const transferAmount = new Decimal(transferForm.value.amount);
        const newBalanceOne = currentBalanceOne.minus(transferAmount);
        const newBalanceInclPendingOne =
          currentBalanceInclPendingOne.minus(transferAmount);
        const newBalanceTwo = currentBalanceTwo.plus(transferAmount);
        const newBalanceInclPendingTwo =
          currentBalanceInclPendingTwo.plus(transferAmount);
        if (
          dayjs().format('YYYYMMDD') ===
          dayjs(transferForm.value.date).format('YYYYMMDD')
        ) {
          // update from
          bankAccounts.value[Number(transferForm.value.from)].balance =
            Number(newBalanceOne);
          bankAccounts.value[
            Number(transferForm.value.from)
          ].balanceInclPending = Number(newBalanceInclPendingOne);
          // update to
          bankAccounts.value[Number(transferForm.value.to)].balance =
            Number(newBalanceTwo);
          bankAccounts.value[Number(transferForm.value.to)].balanceInclPending =
            Number(newBalanceInclPendingTwo);
        } else {
          // update from
          bankAccounts.value[
            Number(transferForm.value.from)
          ].balanceInclPending = Number(newBalanceInclPendingOne);
          // update to
          bankAccounts.value[Number(transferForm.value.to)].balanceInclPending =
            Number(newBalanceInclPendingTwo);
        }
        // add transfer to billing records
        const newBillingRecordOne = {
          amount: transferForm.value.amount,
          balance: Number(newBalanceInclPendingOne),
          date: transferForm.value.date,
          payeeOrPayer: 'MYSELF',
          pending: true,
          remark: 'TRANSFER TO MYSELF',
          type: 'Out',
        };
        const newBillingRecordTwo = {
          amount: transferForm.value.amount,
          balance: Number(newBalanceInclPendingTwo),
          date: transferForm.value.date,
          payeeOrPayer: 'MYSELF',
          pending: true,
          remark: 'TRANSFER FROM MYSELF',
          type: 'In',
        };
        if (
          dayjs().format('YYYYMMDD') ===
          dayjs(transferForm.value.date).format('YYYYMMDD')
        ) {
          // from
          newBillingRecordOne.pending = false;
          if (
            billingRecords.value[Number(transferForm.value.from)].all.length > 0
          ) {
            if (
              billingRecords.value[Number(transferForm.value.from)].all[0]
                .title === 'Pending'
            ) {
              for (
                let i = 1;
                i <
                billingRecords.value[Number(transferForm.value.from)].all
                  .length;
                i += 1
              ) {
                if (
                  billingRecords.value[Number(transferForm.value.from)].all[i]
                    .title &&
                  billingRecords.value[Number(transferForm.value.from)].all[i]
                    .title !== transferForm.value.date
                ) {
                  billingRecords.value[
                    Number(transferForm.value.from)
                  ].all.splice(
                    i,
                    0,
                    { title: transferForm.value.date },
                    newBillingRecordOne
                  );
                  break;
                }
                if (
                  billingRecords.value[Number(transferForm.value.from)].all[i]
                    .title &&
                  billingRecords.value[Number(transferForm.value.from)].all[i]
                    .title === transferForm.value.date
                ) {
                  billingRecords.value[
                    Number(transferForm.value.from)
                  ].all.splice(i + 1, 0, newBillingRecordOne);
                  break;
                }
              }
              for (
                let i = 1;
                i <
                billingRecords.value[Number(transferForm.value.from)].out
                  .length;
                i += 1
              ) {
                if (
                  billingRecords.value[Number(transferForm.value.from)].out[i]
                    .title &&
                  billingRecords.value[Number(transferForm.value.from)].out[i]
                    .title !== transferForm.value.date
                ) {
                  billingRecords.value[
                    Number(transferForm.value.from)
                  ].out.splice(
                    i,
                    0,
                    { title: transferForm.value.date },
                    newBillingRecordOne
                  );
                  break;
                }
                if (
                  billingRecords.value[Number(transferForm.value.from)].out[i]
                    .title &&
                  billingRecords.value[Number(transferForm.value.from)].out[i]
                    .title === transferForm.value.date
                ) {
                  billingRecords.value[
                    Number(transferForm.value.from)
                  ].out.splice(i + 1, 0, newBillingRecordOne);
                  break;
                }
              }
            } else if (
              billingRecords.value[Number(transferForm.value.from)].all[0]
                .title !== 'Pending' &&
              billingRecords.value[Number(transferForm.value.from)].all[0]
                .title !== transferForm.value.date
            ) {
              billingRecords.value[Number(transferForm.value.from)].all.splice(
                0,
                0,
                { title: transferForm.value.date },
                newBillingRecordOne
              );
              billingRecords.value[Number(transferForm.value.from)].out.splice(
                0,
                0,
                { title: transferForm.value.date },
                newBillingRecordOne
              );
            } else {
              billingRecords.value[Number(transferForm.value.from)].all.splice(
                1,
                0,
                newBillingRecordOne
              );
              billingRecords.value[Number(transferForm.value.from)].out.splice(
                1,
                0,
                newBillingRecordOne
              );
            }
          } else {
            pendingBillingRecords.value[
              Number(transferForm.value.from)
            ].all.unshift(newBillingRecordOne);
            pendingBillingRecords.value[
              Number(transferForm.value.from)
            ].out.unshift(newBillingRecordOne);
          }
          // to
          newBillingRecordTwo.pending = false;
          if (
            billingRecords.value[Number(transferForm.value.to)].all.length > 0
          ) {
            if (
              billingRecords.value[Number(transferForm.value.to)].all[0]
                .title === 'Pending'
            ) {
              for (
                let i = 1;
                i <
                billingRecords.value[Number(transferForm.value.to)].all.length;
                i += 1
              ) {
                if (
                  billingRecords.value[Number(transferForm.value.to)].all[i]
                    .title &&
                  billingRecords.value[Number(transferForm.value.to)].all[i]
                    .title !== transferForm.value.date
                ) {
                  billingRecords.value[
                    Number(transferForm.value.to)
                  ].all.splice(
                    i,
                    0,
                    { title: transferForm.value.date },
                    newBillingRecordTwo
                  );
                  break;
                }
                if (
                  billingRecords.value[Number(transferForm.value.to)].all[i]
                    .title &&
                  billingRecords.value[Number(transferForm.value.to)].all[i]
                    .title === transferForm.value.date
                ) {
                  billingRecords.value[
                    Number(transferForm.value.to)
                  ].all.splice(i + 1, 0, newBillingRecordTwo);
                  break;
                }
              }
              for (
                let i = 1;
                i <
                billingRecords.value[Number(transferForm.value.to)].in.length;
                i += 1
              ) {
                if (
                  billingRecords.value[Number(transferForm.value.to)].in[i]
                    .title &&
                  billingRecords.value[Number(transferForm.value.to)].in[i]
                    .title !== transferForm.value.date
                ) {
                  billingRecords.value[Number(transferForm.value.to)].in.splice(
                    i,
                    0,
                    { title: transferForm.value.date },
                    newBillingRecordTwo
                  );
                  break;
                }
                if (
                  billingRecords.value[Number(transferForm.value.to)].in[i]
                    .title &&
                  billingRecords.value[Number(transferForm.value.to)].in[i]
                    .title === transferForm.value.date
                ) {
                  billingRecords.value[Number(transferForm.value.to)].in.splice(
                    i + 1,
                    0,
                    newBillingRecordTwo
                  );
                  break;
                }
              }
            } else if (
              billingRecords.value[Number(transferForm.value.to)].all[0]
                .title !== 'Pending' &&
              billingRecords.value[Number(transferForm.value.to)].all[0]
                .title !== transferForm.value.date
            ) {
              billingRecords.value[Number(transferForm.value.to)].all.splice(
                0,
                0,
                { title: transferForm.value.date },
                newBillingRecordTwo
              );
              billingRecords.value[Number(transferForm.value.to)].in.splice(
                0,
                0,
                { title: transferForm.value.date },
                newBillingRecordTwo
              );
            } else {
              billingRecords.value[Number(transferForm.value.to)].all.splice(
                1,
                0,
                newBillingRecordTwo
              );
              billingRecords.value[Number(transferForm.value.to)].in.splice(
                1,
                0,
                newBillingRecordTwo
              );
            }
          } else {
            pendingBillingRecords.value[
              Number(transferForm.value.to)
            ].all.unshift(newBillingRecordTwo);
            pendingBillingRecords.value[
              Number(transferForm.value.to)
            ].in.unshift(newBillingRecordTwo);
          }
        }
        if (
          dayjs().format('YYYYMMDD') !==
          dayjs(transferForm.value.date).format('YYYYMMDD')
        ) {
          // from
          if (
            billingRecords.value[Number(transferForm.value.from)].all.length > 0
          ) {
            if (
              billingRecords.value[Number(transferForm.value.from)].all[0]
                .title === 'Pending'
            ) {
              billingRecords.value[Number(transferForm.value.from)].all.splice(
                1,
                0,
                newBillingRecordOne
              );
              billingRecords.value[Number(transferForm.value.from)].out.splice(
                1,
                0,
                newBillingRecordOne
              );
            } else {
              billingRecords.value[Number(transferForm.value.from)].all.splice(
                0,
                0,
                { title: 'Pending' },
                newBillingRecordOne
              );
              billingRecords.value[Number(transferForm.value.from)].out.splice(
                0,
                0,
                { title: 'Pending' },
                newBillingRecordOne
              );
            }
          } else {
            pendingBillingRecords.value[
              Number(transferForm.value.from)
            ].all.unshift(newBillingRecordOne);
            pendingBillingRecords.value[
              Number(transferForm.value.from)
            ].out.unshift(newBillingRecordOne);
          }
          // to
          if (
            billingRecords.value[Number(transferForm.value.to)].all.length > 0
          ) {
            if (
              billingRecords.value[Number(transferForm.value.to)].all[0]
                .title === 'Pending'
            ) {
              billingRecords.value[Number(transferForm.value.to)].all.splice(
                1,
                0,
                newBillingRecordTwo
              );
              billingRecords.value[Number(transferForm.value.to)].in.splice(
                1,
                0,
                newBillingRecordTwo
              );
            } else {
              billingRecords.value[Number(transferForm.value.to)].all.splice(
                0,
                0,
                { title: 'Pending' },
                newBillingRecordTwo
              );
              billingRecords.value[Number(transferForm.value.to)].in.splice(
                0,
                0,
                { title: 'Pending' },
                newBillingRecordTwo
              );
            }
          } else {
            pendingBillingRecords.value[
              Number(transferForm.value.to)
            ].all.unshift(newBillingRecordTwo);
            pendingBillingRecords.value[
              Number(transferForm.value.to)
            ].in.unshift(newBillingRecordTwo);
          }
        }
        // clear the transfer form
        transferForm.value.from = '';
        transferForm.value.to = '';
        transferForm.value.amount = 0;
        transferFormTempAmount.value = 0;
        transferForm.value.date = '';
        transferFormTempDate.value = '';
        disableContinueFlag.value = true;
        // open the transfer success drawer
        transferSuccessDrawerVisibleFlag.value = true;
      } else {
        Message.error('Sorry, you cannot authorise the transfer at this time');
      }
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      authoriseBtnLoading.value = false;
    }
  };
  const changeTransferDetails = () => {
    reviewDetailsDrawerVisibleFlag.value = false;
  };
</script>

<style lang="less" scoped>
  .authorise-transfer-container {
    height: 100%;
    padding: 12px;
  }

  .authorise-transfer-container :deep(.arco-descriptions-row) {
    vertical-align: top;
  }
</style>
