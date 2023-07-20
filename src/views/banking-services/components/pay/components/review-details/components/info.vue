<template>
  <div class="authorise-payment-container">
    <a-descriptions size="large" :column="1" style="margin-bottom: 16px">
      <a-descriptions-item label="From">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 4px">
          {{ bankAccounts[Number(paymentForm.from)].bankAccountType }}
        </a-typography-paragraph>
        <a-typography-paragraph type="secondary" style="margin-bottom: 0px">
          {{ bankAccounts[Number(paymentForm.from)].sortCode }}
          {{ bankAccounts[Number(paymentForm.from)].accountNumber }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="To">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 4px">
          {{
            bankAccounts[Number(paymentForm.from)].payees[
              Number(paymentForm.to)
            ].name
          }}
        </a-typography-paragraph>
        <a-typography-paragraph type="secondary" style="margin-bottom: 4px">
          {{
            bankAccounts[Number(paymentForm.from)].payees[
              Number(paymentForm.to)
            ].bankName
          }}
        </a-typography-paragraph>
        <a-typography-paragraph type="secondary" style="margin-bottom: 0px">
          {{
            bankAccounts[Number(paymentForm.from)].payees[
              Number(paymentForm.to)
            ].sortCode
          }}
          {{
            bankAccounts[Number(paymentForm.from)].payees[
              Number(paymentForm.to)
            ].accountNumber
          }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="Amount">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 0px">
          £{{ numberFormatter(paymentForm.amount.toString()) }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="Reference">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 0px">
          {{ paymentForm.reference.toUpperCase() }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="Date">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 0px">
          {{ paymentForm.date }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="Payment Purpose">
        <a-typography-paragraph style="font-weight: bold; margin-bottom: 0px">
          {{ paymentForm.paymentPurpose }}
        </a-typography-paragraph>
      </a-descriptions-item>
    </a-descriptions>
    <a-row
      v-if="
        dayjs().format('YYYYMMDD') ===
        dayjs(paymentForm.date).format('YYYYMMDD')
      "
      style="margin-bottom: 32px"
    >
      <a-col :span="3">
        <img
          style="height: 36px"
          src="@/assets/images/faster-payments-logo.png"
          alt="Faster Payments Logo"
        />
      </a-col>
      <a-col :span="21">
        <a-typography-paragraph
          type="secondary"
          style="font-size: 12px; margin-bottom: 0px; padding-left: 8px"
        >
          Your payment will be made with Faster Payments. This will normally
          arrive immediately.
        </a-typography-paragraph>
      </a-col>
    </a-row>
    <a-button
      type="primary"
      shape="round"
      size="large"
      long
      style="margin-bottom: 16px"
      :loading="authoriseBtnLoading"
      @click="authoriseThePayment()"
    >
      Authorise Payment
    </a-button>
    <a-button
      type="outline"
      shape="round"
      size="large"
      long
      :disabled="authoriseBtnLoading"
      @click="changePaymentDetails()"
    >
      Change Payment Details
    </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import Decimal from 'decimal.js';
  import dayjs from 'dayjs';
  import numberFormatter from '@/utils/number-formatter';
  import { Message } from '@arco-design/web-vue';
  import { authorisePayment } from '@/api/banking-services';

  const currentScenario: any = inject('currentScenario');
  const bottomMenuKey: any = inject('bottomMenuKey');
  const bankAccounts: any = inject('bankAccounts');
  const billingRecords: any = inject('billingRecords');
  const pendingBillingRecords: any = inject('pendingBillingRecords');
  const paymentForm: any = inject('paymentForm');
  const paymentFormTempAmount: any = inject('paymentFormTempAmount');
  const paymentFormTempDate: any = inject('paymentFormTempDate');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const warningGuideDrawerVisibleFlag: any = inject(
    'warningGuideDrawerVisibleFlag'
  );
  const warningGuideUserChoice: any = inject('warningGuideUserChoice');
  const warningDrawerVisibleFlag: any = inject('warningDrawerVisibleFlag');
  const reviewDetailsDrawerVisibleFlag: any = inject(
    'reviewDetailsDrawerVisibleFlag'
  );
  const authoriseBtnLoading: any = inject('authoriseBtnLoading');
  const authoriseThePayment = async () => {
    authoriseBtnLoading.value = true;
    try {
      const reqData = paymentForm.value;
      const resData = await authorisePayment(reqData);
      if (resData.data.status === 200) {
        // update account details
        const currentBalance = new Decimal(
          bankAccounts.value[Number(paymentForm.value.from)].balance
        );
        const currentBalanceInclPending = new Decimal(
          bankAccounts.value[Number(paymentForm.value.from)].balanceInclPending
        );
        const paymentAmount = new Decimal(paymentForm.value.amount);
        const newBalance = currentBalance.minus(paymentAmount);
        const newBalanceInclPending =
          currentBalanceInclPending.minus(paymentAmount);
        if (
          dayjs().format('YYYYMMDD') ===
          dayjs(paymentForm.value.date).format('YYYYMMDD')
        ) {
          bankAccounts.value[Number(paymentForm.value.from)].balance =
            Number(newBalance);
          bankAccounts.value[
            Number(paymentForm.value.from)
          ].balanceInclPending = Number(newBalanceInclPending);
        } else {
          bankAccounts.value[
            Number(paymentForm.value.from)
          ].balanceInclPending = Number(newBalanceInclPending);
        }
        // update payee details
        bankAccounts.value[Number(paymentForm.value.from)].payees[
          Number(paymentForm.value.to)
        ].reference = paymentForm.value.reference.toUpperCase();
        bankAccounts.value[Number(paymentForm.value.from)].payees[
          Number(paymentForm.value.to)
        ].lastPaidDate = paymentForm.value.date;
        bankAccounts.value[Number(paymentForm.value.from)].payees[
          Number(paymentForm.value.to)
        ].lastPaidAmount = paymentForm.value.amount;
        // add payment to billing records
        const newBillingRecord = {
          amount: paymentForm.value.amount,
          balance: Number(newBalanceInclPending),
          date: paymentForm.value.date,
          payeeOrPayer:
            bankAccounts.value[Number(paymentForm.value.from)].payees[
              Number(paymentForm.value.to)
            ].name.toUpperCase(),
          pending: true,
          remark: '',
          type: 'Out',
        };
        if (
          dayjs().format('YYYYMMDD') ===
          dayjs(paymentForm.value.date).format('YYYYMMDD')
        ) {
          newBillingRecord.pending = false;
          newBillingRecord.remark =
            'BILL PAYMENT VIA FASTER PAYMENT TO '.concat(
              bankAccounts.value[Number(paymentForm.value.from)].payees[
                Number(paymentForm.value.to)
              ].name.toUpperCase(),
              ' REFERENCE ',
              paymentForm.value.reference.toUpperCase()
            );
          if (
            billingRecords.value[Number(paymentForm.value.from)].all.length > 0
          ) {
            if (
              billingRecords.value[Number(paymentForm.value.from)].all[0]
                .title === 'Pending'
            ) {
              for (
                let i = 1;
                i <
                billingRecords.value[Number(paymentForm.value.from)].all.length;
                i += 1
              ) {
                if (
                  billingRecords.value[Number(paymentForm.value.from)].all[i]
                    .title &&
                  billingRecords.value[Number(paymentForm.value.from)].all[i]
                    .title !== paymentForm.value.date
                ) {
                  billingRecords.value[
                    Number(paymentForm.value.from)
                  ].all.splice(
                    i,
                    0,
                    { title: paymentForm.value.date },
                    newBillingRecord
                  );
                  break;
                }
                if (
                  billingRecords.value[Number(paymentForm.value.from)].all[i]
                    .title &&
                  billingRecords.value[Number(paymentForm.value.from)].all[i]
                    .title === paymentForm.value.date
                ) {
                  billingRecords.value[
                    Number(paymentForm.value.from)
                  ].all.splice(i + 1, 0, newBillingRecord);
                  break;
                }
              }
              for (
                let i = 1;
                i <
                billingRecords.value[Number(paymentForm.value.from)].out.length;
                i += 1
              ) {
                if (
                  billingRecords.value[Number(paymentForm.value.from)].out[i]
                    .title &&
                  billingRecords.value[Number(paymentForm.value.from)].out[i]
                    .title !== paymentForm.value.date
                ) {
                  billingRecords.value[
                    Number(paymentForm.value.from)
                  ].out.splice(
                    i,
                    0,
                    { title: paymentForm.value.date },
                    newBillingRecord
                  );
                  break;
                }
                if (
                  billingRecords.value[Number(paymentForm.value.from)].out[i]
                    .title &&
                  billingRecords.value[Number(paymentForm.value.from)].out[i]
                    .title === paymentForm.value.date
                ) {
                  billingRecords.value[
                    Number(paymentForm.value.from)
                  ].out.splice(i + 1, 0, newBillingRecord);
                  break;
                }
              }
            } else if (
              billingRecords.value[Number(paymentForm.value.from)].all[0]
                .title !== 'Pending' &&
              billingRecords.value[Number(paymentForm.value.from)].all[0]
                .title !== paymentForm.value.date
            ) {
              billingRecords.value[Number(paymentForm.value.from)].all.splice(
                0,
                0,
                { title: paymentForm.value.date },
                newBillingRecord
              );
              billingRecords.value[Number(paymentForm.value.from)].out.splice(
                0,
                0,
                { title: paymentForm.value.date },
                newBillingRecord
              );
            } else {
              billingRecords.value[Number(paymentForm.value.from)].all.splice(
                1,
                0,
                newBillingRecord
              );
              billingRecords.value[Number(paymentForm.value.from)].out.splice(
                1,
                0,
                newBillingRecord
              );
            }
          } else {
            pendingBillingRecords.value[
              Number(paymentForm.value.from)
            ].all.unshift(newBillingRecord);
            pendingBillingRecords.value[
              Number(paymentForm.value.from)
            ].out.unshift(newBillingRecord);
          }
        } else {
          newBillingRecord.remark = 'TRANSFER TO '.concat(
            bankAccounts.value[Number(paymentForm.value.from)].payees[
              Number(paymentForm.value.to)
            ].name.toUpperCase(),
            ' REFERENCE ',
            paymentForm.value.reference.toUpperCase()
          );
          if (
            billingRecords.value[Number(paymentForm.value.from)].all.length > 0
          ) {
            if (
              billingRecords.value[Number(paymentForm.value.from)].all[0]
                .title === 'Pending'
            ) {
              billingRecords.value[Number(paymentForm.value.from)].all.splice(
                1,
                0,
                newBillingRecord
              );
              billingRecords.value[Number(paymentForm.value.from)].out.splice(
                1,
                0,
                newBillingRecord
              );
            } else {
              billingRecords.value[Number(paymentForm.value.from)].all.splice(
                0,
                0,
                { title: 'Pending' },
                newBillingRecord
              );
              billingRecords.value[Number(paymentForm.value.from)].out.splice(
                0,
                0,
                { title: 'Pending' },
                newBillingRecord
              );
            }
          } else {
            pendingBillingRecords.value[
              Number(paymentForm.value.from)
            ].all.unshift(newBillingRecord);
            pendingBillingRecords.value[
              Number(paymentForm.value.from)
            ].out.unshift(newBillingRecord);
          }
        }
        // close the warning drawer
        warningGuideDrawerVisibleFlag.value = false;
        warningGuideUserChoice.value = 0;
        warningDrawerVisibleFlag.value = false;
        // close the payment form drawer
        paymentForm.value.from = '';
        paymentForm.value.to = '';
        paymentForm.value.amount = 0;
        paymentFormTempAmount.value = 0;
        paymentForm.value.reference = '';
        paymentForm.value.date = '';
        paymentFormTempDate.value = '';
        paymentForm.value.paymentPurpose = '';
        drawerTwoVisibleFlag.value = false;
        bottomMenuKey.value[0] = '0';
        // update the current scenario
        currentScenario.value = (currentScenario.value + 1) % 3;
      } else {
        Message.error('Sorry, you cannot authorise the payment at this time');
      }
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      authoriseBtnLoading.value = false;
    }
  };
  const changePaymentDetails = () => {
    warningGuideDrawerVisibleFlag.value = false;
    warningGuideUserChoice.value = 0;
    warningDrawerVisibleFlag.value = false;
    reviewDetailsDrawerVisibleFlag.value = false;
  };
</script>

<style lang="less" scoped>
  .authorise-payment-container {
    height: 100%;
    padding: 12px;
  }

  .authorise-payment-container :deep(.arco-descriptions-row) {
    vertical-align: top;
  }
</style>
