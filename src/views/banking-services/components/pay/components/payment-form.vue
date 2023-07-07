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
              £{{
                numberFormatter(
                  bankAccounts[Number(paymentForm.from)].balance.toString()
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
                ].bankName
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
                ].sortCode
              }}
              {{
                bankAccounts[Number(paymentForm.from)].payees[
                  Number(paymentForm.to)
                ].accountNumber
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
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import numberFormatter from '@/utils/number-formatter';

  const bankAccounts: any = inject('bankAccounts');
  const paymentForm: any = inject('paymentForm');
  const payDrawerVisibleFlag: any = inject('payDrawerVisibleFlag');
  const payDrawerContent: any = inject('payDrawerContent');
  const openFromDrawer = () => {
    payDrawerContent.value = 'from';
    payDrawerVisibleFlag.value = true;
  };
  const openToDrawer = () => {
    payDrawerContent.value = 'to';
    payDrawerVisibleFlag.value = true;
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
</style>
