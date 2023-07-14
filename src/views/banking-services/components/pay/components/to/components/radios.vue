<template>
  <div class="radios">
    <a-radio-group
      v-if="bankAccounts[Number(paymentForm.from)].payees.length > 0"
      v-model:model-value="paymentForm.to"
      direction="vertical"
      @change="goBackToPaymentForm()"
    >
      <template
        v-for="(itemPayee, indexPayee) in bankAccounts[Number(paymentForm.from)]
          .payees"
        :key="indexPayee"
      >
        <a-radio :value="indexPayee.toString()">
          <template #radio="{ checked }">
            <a-space
              class="custom-radio-card"
              :class="{ 'custom-radio-card-checked': checked }"
              :size="0"
              style="justify-content: space-between"
            >
              <a-space :size="12" style="align-items: start">
                <div className="custom-radio-card-mask">
                  <div className="custom-radio-card-mask-dot"></div>
                </div>
                <a-space direction="vertical" :size="12" fill>
                  <div className="custom-radio-card-title">
                    {{ itemPayee.name.toUpperCase() }}
                  </div>
                  <a-typography-text type="secondary" style="line-height: 14px">
                    {{ itemPayee.sortCode }} {{ itemPayee.accountNumber }}
                  </a-typography-text>
                  <a-typography-text type="secondary" style="line-height: 14px">
                    Reference: {{ itemPayee.reference.toUpperCase() }}
                  </a-typography-text>
                </a-space>
              </a-space>
              <a-avatar
                v-if="itemPayee.type === 'Personal'"
                shape="circle"
                style="
                  border: 1px solid #f73131;
                  color: #f73131;
                  background-color: white;
                "
              >
                {{ itemPayee.type }}
              </a-avatar>
              <a-avatar
                v-else
                shape="circle"
                style="
                  border: 1px solid #cc9213;
                  color: #cc9213;
                  background-color: white;
                "
              >
                {{ itemPayee.type }}
              </a-avatar>
            </a-space>
          </template>
        </a-radio>
      </template>
    </a-radio-group>
    <div
      v-if="bankAccounts[Number(paymentForm.from)].payees.length === 0"
      class="empty-payee-container"
    >
      <a-empty>
        <template #image>
          <icon-info-circle />
        </template>
        You currently have no payees.
      </a-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';

  const bankAccounts: any = inject('bankAccounts');
  const paymentForm: any = inject('paymentForm');
  const paymentFormTempAmount: any = inject('paymentFormTempAmount');
  const paymentFormTempDate: any = inject('paymentFormTempDate');
  const payDrawerVisibleFlag: any = inject('payDrawerVisibleFlag');
  const payDrawerContent: any = inject('payDrawerContent');
  const goBackToPaymentForm = () => {
    paymentForm.value.amount = 0;
    paymentFormTempAmount.value = 0;
    paymentForm.value.reference =
      bankAccounts.value[Number(paymentForm.value.from)].payees[
        Number(paymentForm.value.to)
      ].reference;
    paymentForm.value.date = '';
    paymentFormTempDate.value = '';
    paymentForm.value.paymentPurpose = '';
    payDrawerVisibleFlag.value = false;
    payDrawerContent.value = '';
  };
</script>

<style lang="less" scoped>
  .radios {
    height: 100%;
    padding: 12px;
  }

  .radios :deep(.arco-radio) {
    padding-left: 0px;
    margin-bottom: 12px;
  }

  .custom-radio-card {
    padding: 12px;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
    width: 476px;
    box-sizing: border-box;
  }

  .custom-radio-card-mask {
    height: 14px;
    width: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid var(--color-border-2);
    box-sizing: border-box;
  }

  .custom-radio-card-mask-dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
  }

  .custom-radio-card-title {
    color: var(--color-text-1);
    font-size: 14px;
    font-weight: bold;
    line-height: 14px;
  }

  .custom-radio-card:hover,
  .custom-radio-card-checked,
  .custom-radio-card:hover .custom-radio-card-mask,
  .custom-radio-card-checked .custom-radio-card-mask {
    border-color: rgb(var(--primary-6));
  }

  .custom-radio-card-checked {
    background-color: var(--color-primary-light-1);
  }

  .custom-radio-card:hover .custom-radio-card-title,
  .custom-radio-card-checked .custom-radio-card-title {
    color: rgb(var(--primary-6));
  }

  .custom-radio-card-checked .custom-radio-card-mask-dot {
    background-color: rgb(var(--primary-6));
  }

  .empty-payee-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
