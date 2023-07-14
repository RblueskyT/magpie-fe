<template>
  <div class="payment-form-container">
    <a-space direction="vertical" :size="12" fill>
      <!-- FROM CARD -->
      <a-card class="choose-card" :bordered="false">
        <div class="choose-card-content">
          <a-typography>
            <a-typography-paragraph
              class="input-choose-title"
              :style="
                paymentForm.from.length > 0
                  ? { color: '#00b42a' }
                  : { color: '#86909c' }
              "
            >
              From
            </a-typography-paragraph>
            <a-typography-paragraph
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
              <span v-if="paymentForm.from.length === 0">
                Choose an account to pay from
              </span>
              <span v-if="paymentForm.from.length > 0">
                {{ bankAccounts[Number(paymentForm.from)].bankAccountType }}
              </span>
            </a-typography-paragraph>
            <a-typography-paragraph
              v-if="paymentForm.from.length > 0"
              type="secondary"
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
              {{ bankAccounts[Number(paymentForm.from)].sortCode }}
              {{ bankAccounts[Number(paymentForm.from)].accountNumber }}
            </a-typography-paragraph>
            <a-typography-paragraph
              v-if="paymentForm.from.length > 0"
              type="secondary"
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
              £{{
                numberFormatter(
                  bankAccounts[
                    Number(paymentForm.from)
                  ].balanceInclPending.toString()
                )
              }}
            </a-typography-paragraph>
          </a-typography>
          <a-link @click="openFromDrawer()">
            <span v-if="paymentForm.from.length === 0">Choose</span>
            <span v-if="paymentForm.from.length > 0">Change</span>
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
                paymentForm.to.length > 0
                  ? { color: '#00b42a' }
                  : { color: '#86909c' }
              "
            >
              To
            </a-typography-paragraph>
            <a-typography-paragraph
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
              :disabled="paymentForm.from.length > 0 ? false : true"
            >
              <span v-if="paymentForm.to.length === 0">
                Choose or add a recipient to pay
              </span>
              <span v-if="paymentForm.to.length > 0">
                {{
                  bankAccounts[Number(paymentForm.from)].payees[
                    Number(paymentForm.to)
                  ].name.toUpperCase()
                }}
              </span>
            </a-typography-paragraph>
            <a-typography-paragraph
              v-if="paymentForm.to.length > 0"
              type="secondary"
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
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
            <a-typography-paragraph
              v-if="paymentForm.to.length > 0"
              type="secondary"
              style="line-height: 26px; font-size: 14px; margin-bottom: 0px"
            >
              {{
                bankAccounts[Number(paymentForm.from)].payees[
                  Number(paymentForm.to)
                ].bankName
              }}
            </a-typography-paragraph>
          </a-typography>
          <a-link
            :disabled="paymentForm.from.length > 0 ? false : true"
            @click="openToDrawer()"
          >
            <span v-if="paymentForm.to.length === 0">Choose</span>
            <span v-if="paymentForm.to.length > 0">Change</span>
          </a-link>
        </div>
      </a-card>
      <!-- OTHER DETAILS CARD -->
      <a-card class="other-details-card" :bordered="false">
        <a-form
          ref="payForm"
          :model="paymentForm"
          size="large"
          auto-label-width
          :disabled="paymentForm.to.length > 0 ? false : true"
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
                max: bankAccounts[Number(paymentForm.from)].balanceInclPending,
                positive: true,
              },
            ]"
            :validate-trigger="['change', 'blur']"
            hide-asterisk
            style="margin-bottom: 12px"
          >
            <a-input-number
              v-model="paymentFormTempAmount"
              :default-value="0"
              :precision="2"
              :min="0"
              :max="bankAccounts[Number(paymentForm.from)].balanceInclPending"
              hide-button
              :formatter="amountInputFormatter"
              :parser="amountInputParser"
              @change="updatePaymentAmount"
            >
              <template #prefix>&#xa3;</template>
            </a-input-number>
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
            style="margin-bottom: 12px"
          >
            <a-input
              v-model="paymentForm.reference"
              :max-length="{ length: 18, errorOnly: false }"
              allow-clear
              @input="disableContinue"
              @clear="disableContinue"
            />
          </a-form-item>
          <a-form-item
            field="date"
            label="Date"
            :rules="[
              {
                type: 'string',
                required: true,
                message: 'Please select a payment date',
              },
            ]"
            :validate-trigger="['change', 'blur']"
            hide-asterisk
            style="margin-bottom: 12px"
          >
            <a-config-provider :locale="enUS">
              <a-date-picker
                v-model="paymentFormTempDate"
                :format="(value) => `${dayjs(value).format('DD MMM YYYY')}`"
                :disabled-date="(current: any) => dayjs(current).isBefore(dayjs())"
                placeholder=" "
                disabled-input
                :allow-clear="false"
                style="width: 134px"
                @change="updatePaymentDate"
              />
            </a-config-provider>
          </a-form-item>
          <a-form-item
            field="paymentPurpose"
            label="Payment Purpose"
            :rules="[
              {
                type: 'string',
                required: true,
                message: 'Please select a payment purpose',
              },
            ]"
            :validate-trigger="['change', 'blur']"
            hide-asterisk
          >
            <a-select
              v-model="paymentForm.paymentPurpose"
              placeholder=" "
              @change="disableContinue"
            >
              <a-option>Paying a friend</a-option>
              <a-option>Paying family</a-option>
              <a-option>Paying for a service</a-option>
              <a-option>Buying goods</a-option>
              <a-option>Transfer to an investment</a-option>
              <a-option>Anything else</a-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-card>
      <a-button
        type="primary"
        shape="round"
        size="large"
        long
        :loading="continueLoading"
        :disabled="disableContinueFlag"
        @click="continuePayment()"
      >
        Continue
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import dayjs from 'dayjs';
  import numberFormatter from '@/utils/number-formatter';

  const bankAccounts: any = inject('bankAccounts');
  const paymentForm: any = inject('paymentForm');
  const paymentFormTempAmount: any = inject('paymentFormTempAmount');
  const paymentFormTempDate: any = inject('paymentFormTempDate');
  const payDrawerVisibleFlag: any = inject('payDrawerVisibleFlag');
  const payDrawerContent: any = inject('payDrawerContent');
  const continueLoading: any = inject('continueLoading');
  const disableContinueFlag = ref(true);
  const amountInputFormatter = (value: string) => {
    const values = value.split('.');
    values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return values.join('.');
  };

  const amountInputParser = (value: string) => {
    return value.replace(/,/g, '');
  };
  const openFromDrawer = () => {
    payDrawerContent.value = 'from';
    payDrawerVisibleFlag.value = true;
  };
  const openToDrawer = () => {
    payDrawerContent.value = 'to';
    payDrawerVisibleFlag.value = true;
  };
  const disableContinue = () => {
    // todo
  };
  const updatePaymentAmount = (value: number | undefined) => {
    if (value === undefined) {
      paymentForm.value.amount = 0;
    } else {
      paymentForm.value.amount = value;
    }
    // todo: disableSubmit
  };
  const updatePaymentDate = (value: string) => {
    paymentForm.value.date = dayjs(value).format('DD MMM YYYY');
    // todo: disableSubmit
  };
  const continuePayment = () => {
    // todo
  };
</script>

<style lang="less" scoped>
  .payment-form-container {
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
