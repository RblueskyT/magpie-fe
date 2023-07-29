<template>
  <div class="radios">
    <a-radio-group
      v-model:model-value="transferForm.to"
      direction="vertical"
      @change="goBackToTransferForm()"
    >
      <template
        v-for="(itemAccount, indexAccount) in bankAccounts"
        :key="indexAccount"
      >
        <a-radio
          :value="indexAccount.toString()"
          :disabled="
            transferForm.from.length > 0 &&
            indexAccount === Number(transferForm.from)
              ? true
              : false
          "
        >
          <template #radio="{ checked }">
            <a-space
              :class="{
                'custom-radio-card': !(
                  transferForm.from.length > 0 &&
                  indexAccount === Number(transferForm.from)
                ),
                'custom-radio-card-disabled':
                  transferForm.from.length > 0 &&
                  indexAccount === Number(transferForm.from),
                'custom-radio-card-checked': checked,
              }"
              :size="12"
              style="align-items: start"
            >
              <div className="custom-radio-card-mask">
                <div className="custom-radio-card-mask-dot"></div>
              </div>
              <a-space direction="vertical" :size="12" fill>
                <div
                  :className="
                    transferForm.from.length > 0 &&
                    indexAccount === Number(transferForm.from)
                      ? 'custom-radio-card-title-disabled'
                      : 'custom-radio-card-title'
                  "
                >
                  {{ itemAccount.bankAccountType }}
                </div>
                <a-typography-text
                  type="secondary"
                  style="line-height: 14px"
                  :disabled="
                    transferForm.from.length > 0 &&
                    indexAccount === Number(transferForm.from)
                  "
                >
                  {{ itemAccount.sortCode }} {{ itemAccount.accountNumber }}
                </a-typography-text>
                <a-typography-text
                  :style="
                    transferForm.from.length > 0 &&
                    indexAccount === Number(transferForm.from)
                      ? 'line-height: 14px; color: #c9cdd4'
                      : 'line-height: 14px; color: #272e3b'
                  "
                >
                  £{{ numberFormatter(itemAccount.balance.toString()) }}
                </a-typography-text>
                <a-typography-text
                  type="secondary"
                  style="line-height: 14px"
                  :disabled="
                    transferForm.from.length > 0 &&
                    indexAccount === Number(transferForm.from)
                  "
                >
                  Balance incl. pending: £{{
                    numberFormatter(itemAccount.balanceInclPending.toString())
                  }}
                </a-typography-text>
              </a-space>
            </a-space>
          </template>
        </a-radio>
      </template>
    </a-radio-group>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import numberFormatter from '@/utils/number-formatter';

  const bankAccounts: any = inject('bankAccounts');
  const transferForm: any = inject('transferForm');
  const transferFormTempAmount: any = inject('transferFormTempAmount');
  const transferFormTempDate: any = inject('transferFormTempDate');
  const transferDrawerVisibleFlag: any = inject('transferDrawerVisibleFlag');
  const transferDrawerContent: any = inject('transferDrawerContent');
  const disableContinueFlag: any = inject('disableContinueFlag');
  const goBackToTransferForm = () => {
    transferForm.value.amount = 0;
    transferFormTempAmount.value = 0;
    transferForm.value.date = '';
    transferFormTempDate.value = '';
    disableContinueFlag.value = true;
    transferDrawerVisibleFlag.value = false;
    transferDrawerContent.value = '';
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

  .custom-radio-card-disabled {
    padding: 12px;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
    width: 476px;
    box-sizing: border-box;
    background-color: #f2f3f5;
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

  .custom-radio-card-title-disabled {
    color: #c9cdd4;
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
</style>
