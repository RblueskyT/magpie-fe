<template>
  <div class="add-form">
    <a-card class="add-form-card" :bordered="false">
      <a-form
        ref="addForm"
        :model="addPayeeFormData"
        size="large"
        auto-label-width
        :disabled="submitLoading || formValidFlag"
      >
        <a-form-item
          field="name"
          label="Name on the Account"
          :rules="[
            {
              type: 'string',
              required: true,
              message: 'Please enter a valid name, e.g. Alice Mason',
              match: /^[a-zA-Z][a-zA-Z ]{1,16}[a-zA-Z]$/,
            },
          ]"
          :validate-trigger="['change', 'blur']"
          hide-asterisk
          style="margin-bottom: 12px"
        >
          <a-input
            v-model="addPayeeFormData.name"
            :max-length="{ length: 18, errorOnly: false }"
            allow-clear
            @input="disableSubmit"
            @clear="disableSubmit"
          >
            <template #suffix>
              <a-button
                type="outline"
                shape="circle"
                size="mini"
                style="border-color: #6b7785; color: #6b7785"
                @click="openExtraInfoModal('Name on the Account')"
              >
                <template #icon>
                  <icon-info />
                </template>
              </a-button>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          field="type"
          label="Account Type"
          required
          hide-asterisk
          style="margin-bottom: 12px"
        >
          <a-radio-group
            v-model="addPayeeFormData.type"
            @change="disableSubmit"
          >
            <a-radio value="Personal">Personal</a-radio>
            <a-radio value="Business">Business</a-radio>
          </a-radio-group>
          <div class="form-extra-info">
            <a-button
              type="outline"
              shape="circle"
              size="mini"
              style="border-color: #6b7785; color: #6b7785"
              @click="openExtraInfoModal('Account Type')"
            >
              <template #icon>
                <icon-info />
              </template>
            </a-button>
          </div>
        </a-form-item>
        <a-form-item
          field="sortCode"
          label="Sort Code"
          :rules="[
            {
              type: 'string',
              required: true,
              message:
                'Please enter a valid sort code, e.g. 010203 or 01-02-03',
              match: /^\d{2}-\d{2}-\d{2}$/,
            },
          ]"
          :validate-trigger="['change', 'blur']"
          hide-asterisk
          style="margin-bottom: 12px"
        >
          <a-input
            v-model="addPayeeFormData.sortCode"
            :max-length="{ length: 8, errorOnly: false }"
            allow-clear
            @input="disableSubmit"
            @clear="disableSubmit"
            @blur="sortCodeFormatter(addPayeeFormData.sortCode)"
          />
        </a-form-item>
        <a-form-item
          field="accountNumber"
          label="Account No."
          :rules="[
            {
              type: 'string',
              required: true,
              message: 'Please enter a valid account no., e.g. 12345678',
              match: /^\d{8}$/,
            },
          ]"
          :validate-trigger="['change', 'blur']"
          hide-asterisk
          style="margin-bottom: 12px"
        >
          <a-input
            v-model="addPayeeFormData.accountNumber"
            :max-length="{ length: 8, errorOnly: false }"
            allow-clear
            @input="disableSubmit"
            @clear="disableSubmit"
          />
        </a-form-item>
        <a-form-item
          field="reference"
          label="Reference"
          :rules="[
            {
              type: 'string',
              required: true,
              message:
                'Please enter a valid reference without special symbols, e.g. Flat 101',
              match: /^[0-9a-zA-Z-_ ]{1,18}$/,
            },
          ]"
          :validate-trigger="['change', 'blur']"
          hide-asterisk
        >
          <a-input
            v-model="addPayeeFormData.reference"
            :max-length="{ length: 18, errorOnly: false }"
            allow-clear
            @input="disableSubmit"
            @clear="disableSubmit"
          >
            <template #suffix>
              <a-button
                type="outline"
                shape="circle"
                size="mini"
                style="border-color: #6b7785; color: #6b7785"
                @click="openExtraInfoModal('Reference')"
              >
                <template #icon>
                  <icon-info />
                </template>
              </a-button>
            </template>
          </a-input>
        </a-form-item>
      </a-form>
    </a-card>
    <a-button
      type="primary"
      shape="round"
      :status="formValidFlag ? 'success' : 'normal'"
      size="large"
      long
      :loading="submitLoading"
      :disabled="disableSubmitFlag || formValidFlag"
      @click="submitAddForm()"
    >
      <template v-if="formValidFlag" #icon>
        <icon-check />
      </template>
      <template #default>
        <span v-if="!formValidFlag">Check Payee Details</span>
        <span v-else>Check Passed</span>
      </template>
    </a-button>
    <a-typography style="margin-top: 12px">
      <a-typography-paragraph style="margin-bottom: 12px">
        Magpie will <span style="font-weight: bold">NEVER</span> ask you to
        transfer money.
      </a-typography-paragraph>
      <a-typography-paragraph style="margin-bottom: 0px">
        If you have been asked to transfer money or are unsure about the payment
        you are making, please do not complete the request.
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { checkPayee } from '@/api/banking-services';
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
  const extraInfoModalVisibleFlag: any = inject('extraInfoModalVisibleFlag');
  const extraInfoTitle: any = inject('extraInfoTitle');
  const submitLoading: any = inject('submitLoading');
  const formValidFlag: any = inject('formValidFlag');
  const disableSubmitFlag = ref(true);
  const sortCodeFormatter = (sortCode: string) => {
    const sortCodeRegex = new RegExp(/^\d{6}$/);
    if (sortCode.length === 6 && sortCodeRegex.test(sortCode)) {
      addPayeeFormData.value.sortCode = sortCode
        .slice(0, 2)
        .concat('-', sortCode.slice(2, 4), '-', sortCode.slice(4));
    }
  };
  const openExtraInfoModal = (modalTitle: string) => {
    extraInfoTitle.value = modalTitle;
    extraInfoModalVisibleFlag.value = true;
  };
  const disableSubmit = () => {
    const nameRegex = new RegExp(/^[a-zA-Z][a-zA-Z ]{1,16}[a-zA-Z]$/);
    const scRegex = new RegExp(/^\d{2}-\d{2}-\d{2}$/);
    const anRegex = new RegExp(/^\d{8}$/);
    const refRegex = new RegExp(/^[0-9a-zA-Z-_ ]{1,18}$/);
    let validNameFlag = false;
    let validATFlag = false;
    let validSCFlag = false;
    let validANFlag = false;
    let validRefFlag = false;
    if (nameRegex.test(addPayeeFormData.value.name)) {
      validNameFlag = true;
    }
    if (addPayeeFormData.value.type.length > 0) {
      validATFlag = true;
    }
    if (scRegex.test(addPayeeFormData.value.sortCode)) {
      validSCFlag = true;
    }
    if (anRegex.test(addPayeeFormData.value.accountNumber)) {
      validANFlag = true;
    }
    if (refRegex.test(addPayeeFormData.value.reference)) {
      validRefFlag = true;
    }
    if (
      validNameFlag &&
      validATFlag &&
      validSCFlag &&
      validANFlag &&
      validRefFlag
    ) {
      disableSubmitFlag.value = false;
    } else {
      disableSubmitFlag.value = true;
    }
  };
  const submitAddForm = async () => {
    submitLoading.value = true;
    try {
      const reqData = addPayeeFormData.value;
      const resData = await checkPayee(reqData);
      if (resData.data.message === 'Correct details.') {
        // Show the success message
        formValidFlag.value = true;
        window.setTimeout(() => {
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
        }, 750);
      }
      if (resData.data.message === 'Incorrect SCAN.') {
        addPayeeDrawerVisibleFlag.value = true;
        addPayeeDrawerVisibleContent.value = 'SCAN';
      }
      if (resData.data.message === 'Incorrect name.') {
        addPayeeDrawerVisibleFlag.value = true;
        addPayeeDrawerVisibleContent.value = 'name';
      }
      if (resData.data.message === 'Incorrect type.') {
        addPayeeDrawerVisibleFlag.value = true;
        addPayeeDrawerVisibleContent.value = 'type';
      }
      if (resData.data.message === 'Incorrect name and type.') {
        addPayeeDrawerVisibleFlag.value = true;
        addPayeeDrawerVisibleContent.value = 'name and type';
      }
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      submitLoading.value = false;
    }
  };
</script>

<style lang="less" scoped>
  .add-form {
    height: 100%;
    padding: 12px;
  }

  .add-form-card {
    padding: 12px;
    margin-bottom: 12px;
  }

  .add-form-card :deep(.arco-card-body) {
    height: 100%;
  }

  .add-form-card :deep(.arco-card-body > .arco-form > .arco-form-item) {
    margin-bottom: 0px;
  }

  .add-form-card :deep(.arco-form-item-content-flex) {
    justify-content: space-between;
  }

  .form-extra-info {
    padding-right: 13px;
  }
</style>
