<template>
  <div class="confirm-add-container">
    <div class="warning-sign-container">
      <img
        style="width: 80px; height: 80px"
        src="@/assets/images/warning-sign-circle.png"
        alt="Warning Sign"
      />
    </div>
    <a-typography-title
      :heading="5"
      style="margin-top: 0px; margin-bottom: 32px; text-align: center"
    >
      These Details Don't Match
    </a-typography-title>
    <a-typography-paragraph style="margin-bottom: 16px">
      <span v-if="addPayeeDrawerVisibleContent === 'SCAN'">
        The name you gave us doesn't match the name on the account.
      </span>
      <span v-if="addPayeeDrawerVisibleContent === 'name'">
        The name you gave us doesn't match the name on the account.
      </span>
      <span v-if="addPayeeDrawerVisibleContent === 'type'">
        The account type you gave us doesn't match the account.
      </span>
      <span v-if="addPayeeDrawerVisibleContent === 'name and type'">
        The name and account type you gave us don't match the account.
      </span>
      You should call the payee on a number you trust to check the account
      details.
    </a-typography-paragraph>
    <a-typography-paragraph style="margin-bottom: 16px">
      We may not be able to get your money back if it goes to the wrong account.
    </a-typography-paragraph>
    <a-typography-paragraph style="margin-bottom: 16px">
      <span style="font-weight: bold">Remember:</span> we'll never tell you to
      move money to another account.
    </a-typography-paragraph>
    <a-button
      type="primary"
      shape="round"
      size="large"
      long
      style="margin-bottom: 16px"
      :disabled="continueBtnLoading"
      @click="backToDetails()"
    >
      Back to Details
    </a-button>
    <a-button
      type="secondary"
      shape="round"
      size="large"
      long
      :loading="continueBtnLoading"
      @click="confirmAddPayee()"
    >
      Continue Anyway
    </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { addPayee } from '@/api/banking-services';
  import getARandomBankName from '@/utils/random-bank-name';

  const bankAccounts: any = inject('bankAccounts');
  const paymentForm: any = inject('paymentForm');
  const paymentFormTempAmount: any = inject('paymentFormTempAmount');
  const paymentFormTempDate: any = inject('paymentFormTempDate');
  const payDrawerVisibleFlag: any = inject('payDrawerVisibleFlag');
  const payDrawerContent: any = inject('payDrawerContent');
  const addPayeeFormData: any = inject('addPayeeFormData');
  const addPayeeDrawerVisibleFlag: any = inject('addPayeeDrawerVisibleFlag');
  const addPayeeDrawerVisibleContent: any = inject(
    'addPayeeDrawerVisibleContent'
  );
  const payToDrawerVisibleFlag: any = inject('payToDrawerVisibleFlag');
  const continueBtnLoading: any = inject('continueBtnLoading');
  const backToDetails = () => {
    addPayeeDrawerVisibleFlag.value = false;
    addPayeeDrawerVisibleContent.value = '';
  };
  const confirmAddPayee = async () => {
    continueBtnLoading.value = true;
    try {
      const reqData = addPayeeFormData.value;
      const resData = await addPayee(reqData);
      if (resData.data.status === 200) {
        // Add payee to the mock data
        const newPayee = {
          name: reqData.name,
          type: reqData.type,
          sortCode: reqData.sortCode,
          accountNumber: reqData.accountNumber,
          bankName: getARandomBankName(),
          reference: reqData.reference,
          lastPaidDate: '',
          lastPaidAmount: 0,
        };
        bankAccounts.value[Number(reqData.accountId)].payees.push(newPayee);
        // Reset the payement form
        paymentForm.value.to = (
          bankAccounts.value[Number(reqData.accountId)].payees.length - 1
        ).toString();
        paymentForm.value.amount = 0;
        paymentFormTempAmount.value = 0;
        paymentForm.value.reference = reqData.reference;
        paymentForm.value.date = '';
        paymentFormTempDate.value = '';
        paymentForm.value.paymentPurpose = '';
        // Close the 'Confirm Add' drawer
        addPayeeDrawerVisibleFlag.value = false;
        addPayeeDrawerVisibleContent.value = '';
        // Close the 'Add New Payee' drawer
        payToDrawerVisibleFlag.value = false;
        addPayeeFormData.value.name = '';
        addPayeeFormData.value.type = '';
        addPayeeFormData.value.sortCode = '';
        addPayeeFormData.value.accountNumber = '';
        addPayeeFormData.value.reference = '';
        // Close the 'Pay To' drawer
        payDrawerVisibleFlag.value = false;
        payDrawerContent.value = '';
      } else {
        Message.error('Sorry, this payee cannot be added at this time');
      }
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      continueBtnLoading.value = false;
    }
  };
</script>

<style lang="less" scoped>
  .confirm-add-container {
    height: 100%;
    padding: 12px;
  }

  .warning-sign-container {
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
