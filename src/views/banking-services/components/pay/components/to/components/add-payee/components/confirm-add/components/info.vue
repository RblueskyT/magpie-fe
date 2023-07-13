<template>
  <div class="confirm-add-container">
    <div class="warning-sign-container">
      <img
        style="width: 80px; height: 80px"
        src="@/assets/images/warning-sign.png"
        alt="Warning Sign"
      />
    </div>
    <a-typography-title
      :heading="5"
      style="margin-top: 0px; margin-bottom: 32px; text-align: center"
    >
      Details Don't Match Account
    </a-typography-title>
    <a-descriptions size="large" :column="1">
      <a-descriptions-item label="Name">
        {{ addPayeeFormData.name.toUpperCase() }}
        <icon-close
          v-if="addPayeeDrawerVisibleContent.includes('name')"
          style="color: #f53f3f"
        />
        <icon-check v-else style="color: #00b42a" />
      </a-descriptions-item>
      <a-descriptions-item label="Account Type">
        {{ addPayeeFormData.type }}
        <icon-close
          v-if="addPayeeDrawerVisibleContent.includes('type')"
          style="color: #f53f3f"
        />
        <icon-check v-else style="color: #00b42a" />
      </a-descriptions-item>
      <a-descriptions-item label="Sort Code">
        {{ addPayeeFormData.sortCode }} <icon-check style="color: #00b42a" />
      </a-descriptions-item>
      <a-descriptions-item label="Account No.">
        {{ addPayeeFormData.accountNumber }}
        <icon-check style="color: #00b42a" />
      </a-descriptions-item>
    </a-descriptions>
    <a-typography-paragraph style="margin: 16px 0px">
      The details you entered don't match the account you're sending money to.
      Please double-check who you're sending money to and cancel this payment if
      you think someone might be trying to scam you.
    </a-typography-paragraph>
    <a-button
      type="primary"
      shape="round"
      size="large"
      long
      style="margin-bottom: 16px"
      @click="backToDetails()"
    >
      Back to Details
    </a-button>
    <a-button
      type="secondary"
      shape="round"
      size="large"
      long
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
        paymentForm.value.to = (
          bankAccounts.value[Number(reqData.accountId)].payees.length - 1
        ).toString();
        paymentForm.value.reference = reqData.reference;
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
