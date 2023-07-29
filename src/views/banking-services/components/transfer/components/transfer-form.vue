<template>
  <div class="transfer-form-container">
    <a-space direction="vertical" :size="12" fill>
      <!-- FROM CARD -->
      <a-card class="choose-card" :bordered="false">
        <div class="choose-card-content">
          <a-typography>
            <a-typography-paragraph
              class="input-choose-title"
              :style="
                transferForm.from.length > 0
                  ? { color: '#00b42a' }
                  : { color: '#86909c' }
              "
            >
              From
            </a-typography-paragraph>
            <a-typography-paragraph
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
              <span v-if="transferForm.from.length === 0">
                Choose an account to transfer from
              </span>
              <span v-if="transferForm.from.length > 0">
                {{ bankAccounts[Number(transferForm.from)].bankAccountType }}
              </span>
            </a-typography-paragraph>
            <a-typography-paragraph
              v-if="transferForm.from.length > 0"
              type="secondary"
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
              {{ bankAccounts[Number(transferForm.from)].sortCode }}
              {{ bankAccounts[Number(transferForm.from)].accountNumber }}
            </a-typography-paragraph>
            <a-typography-paragraph
              v-if="transferForm.from.length > 0"
              type="secondary"
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
              £{{
                numberFormatter(
                  bankAccounts[
                    Number(transferForm.from)
                  ].balanceInclPending.toString()
                )
              }}
            </a-typography-paragraph>
          </a-typography>
          <a-link @click="openFromDrawer()">
            <span v-if="transferForm.from.length === 0">Choose</span>
            <span v-if="transferForm.from.length > 0">Change</span>
          </a-link>
        </div>
      </a-card>
      <!-- TO CARD -->
      <a-card class="choose-card" :bordered="false">
        <div class="choose-card-content">
          <a-typography>
            <a-typography-paragraph
              class="input-choose-title"
              :style="
                transferForm.to.length > 0
                  ? { color: '#00b42a' }
                  : { color: '#86909c' }
              "
            >
              To
            </a-typography-paragraph>
            <a-typography-paragraph
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
              :disabled="transferForm.from.length > 0 ? false : true"
            >
              <span v-if="transferForm.to.length === 0">
                Choose an account to transfer to
              </span>
              <span v-if="transferForm.to.length > 0">
                {{ bankAccounts[Number(transferForm.to)].bankAccountType }}
              </span>
            </a-typography-paragraph>
            <a-typography-paragraph
              v-if="transferForm.to.length > 0"
              type="secondary"
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
              {{ bankAccounts[Number(transferForm.to)].sortCode }}
              {{ bankAccounts[Number(transferForm.to)].accountNumber }}
            </a-typography-paragraph>
            <a-typography-paragraph
              v-if="transferForm.to.length > 0"
              type="secondary"
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
              £{{
                numberFormatter(
                  bankAccounts[
                    Number(transferForm.to)
                  ].balanceInclPending.toString()
                )
              }}
            </a-typography-paragraph>
          </a-typography>
          <a-link
            :disabled="transferForm.from.length > 0 ? false : true"
            @click="openToDrawer()"
          >
            <span v-if="transferForm.to.length === 0">Choose</span>
            <span v-if="transferForm.to.length > 0">Change</span>
          </a-link>
        </div>
      </a-card>
      <!-- OTHER DETAILS CARD -->
      <a-card
        id="transferPurposeContainer"
        class="other-details-card"
        :bordered="false"
      >
        <a-form
          ref="transferOtherDetailsForm"
          :model="transferForm"
          size="large"
          auto-label-width
          :disabled="transferForm.to.length > 0 ? false : true"
        >
          <a-form-item
            field="amount"
            label="Amount"
            :rules="[
              {
                type: 'number',
                required: true,
                message:
                  'Please enter a valid amount that is greater than zero and less than your balance incl. pending',
                max: bankAccounts[Number(transferForm.from)].balanceInclPending,
                positive: true,
              },
            ]"
            :validate-trigger="['change', 'blur']"
            hide-asterisk
            style="margin-bottom: 12px"
          >
            <a-input-number
              v-model="transferFormTempAmount"
              :default-value="0"
              :precision="2"
              :min="0"
              :max="bankAccounts[Number(transferForm.from)].balanceInclPending"
              hide-button
              :formatter="amountInputFormatter"
              :parser="amountInputParser"
              @change="updateTransferAmount"
            >
              <template #prefix>&#xa3;</template>
            </a-input-number>
          </a-form-item>
          <a-form-item
            field="date"
            label="Date"
            :rules="[
              {
                type: 'string',
                required: true,
                message: 'Please select a transfer date',
              },
            ]"
            :validate-trigger="['change', 'blur']"
            hide-asterisk
          >
            <a-config-provider :locale="enUS">
              <a-date-picker
                v-model="transferFormTempDate"
                :format="(value) => `${dayjs(value).format('DD MMM YYYY')}`"
                :disabled-date="(current: any) => dayjs(current).isBefore(dayjs().subtract(1, 'day'))"
                placeholder=" "
                disabled-input
                :allow-clear="false"
                style="width: 134px"
                @change="updateTransferDate"
              />
            </a-config-provider>
          </a-form-item>
        </a-form>
      </a-card>
      <a-button
        type="primary"
        shape="round"
        size="large"
        long
        :disabled="disableContinueFlag"
        @click="submitTransferForm()"
      >
        Continue
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import dayjs from 'dayjs';
  import numberFormatter from '@/utils/number-formatter';

  const bankAccounts: any = inject('bankAccounts');
  const transferForm: any = inject('transferForm');
  const transferFormTempAmount: any = inject('transferFormTempAmount');
  const transferFormTempDate: any = inject('transferFormTempDate');
  const transferDrawerVisibleFlag: any = inject('transferDrawerVisibleFlag');
  const transferDrawerContent: any = inject('transferDrawerContent');
  const disableContinueFlag: any = inject('disableContinueFlag');
  const reviewDetailsDrawerVisibleFlag: any = inject(
    'reviewDetailsDrawerVisibleFlag'
  );
  const amountInputFormatter = (value: string) => {
    const values = value.split('.');
    values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return values.join('.');
  };

  const amountInputParser = (value: string) => {
    return value.replace(/,/g, '');
  };
  const openFromDrawer = () => {
    transferDrawerContent.value = 'from';
    transferDrawerVisibleFlag.value = true;
  };
  const openToDrawer = () => {
    transferDrawerContent.value = 'to';
    transferDrawerVisibleFlag.value = true;
  };
  const disableContinue = () => {
    let validAmountFlag = false;
    let validDateFlag = false;
    if (
      transferForm.value.amount > 0 &&
      transferForm.value.amount <=
        bankAccounts.value[Number(transferForm.value.from)].balanceInclPending
    ) {
      validAmountFlag = true;
    }
    if (transferForm.value.date.length > 0) {
      validDateFlag = true;
    }
    if (validAmountFlag && validDateFlag) {
      disableContinueFlag.value = false;
    } else {
      disableContinueFlag.value = true;
    }
  };
  const updateTransferAmount = (value: number | undefined) => {
    if (value === undefined) {
      transferForm.value.amount = 0;
    } else {
      transferForm.value.amount = value;
    }
    disableContinue();
  };
  const updateTransferDate = (value: string) => {
    transferForm.value.date = dayjs(value).format('DD MMM YYYY');
    disableContinue();
  };
  const submitTransferForm = () => {
    reviewDetailsDrawerVisibleFlag.value = true;
  };
</script>

<style lang="less" scoped>
  .transfer-form-container {
    height: 100%;
    padding: 12px;
  }

  .choose-card {
    min-height: 76px;
  }

  .choose-card :deep(.arco-card-body) {
    height: 100%;
  }

  .choose-card-content {
    display: flex;
    height: 100%;
    padding: 12px;
    align-items: center;
    justify-content: space-between;
  }

  .input-choose-title {
    line-height: 26px;
    font-size: 16px;
    margin-bottom: 0px;
  }

  .other-details-card {
    padding: 12px;
  }

  .other-details-card :deep(.arco-card-body) {
    height: 100%;
  }

  .other-details-card :deep(.arco-card-body > .arco-form > .arco-form-item) {
    margin-bottom: 0px;
  }

  .other-details-card :deep(.arco-form-item-content-flex) {
    justify-content: space-between;
  }

  .other-details-card :deep(.arco-select-dropdown-list-wrapper) {
    max-height: none;
  }
</style>
