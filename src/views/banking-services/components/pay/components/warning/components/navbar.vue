<template>
  <div class="navbar">
    <ul class="left-side">
      <li>
        <a-button
          :style="changeBtnStyle(backBtnHoverFlag)"
          type="outline"
          shape="circle"
          size="large"
          @mouseenter="backBtnHoverFlag = true"
          @mouseleave="backBtnHoverFlag = false"
          @click="goBackToPayOrWarningGuide()"
        >
          <template #icon>
            <icon-arrow-left />
          </template>
        </a-button>
      </li>
    </ul>
    <div class="center-side">
      <a-space direction="vertical" :size="0" fill>
        <a-typography-text style="line-height: 26px; font-size: 16px">
          You're about to pay
        </a-typography-text>
        <a-typography-text
          style="line-height: 26px; font-size: 14px"
          type="secondary"
        >
          {{
            bankAccounts[Number(paymentForm.from)].payees[
              Number(paymentForm.to)
            ].name
          }}
          £{{ numberFormatter(paymentForm.amount.toString()) }}
        </a-typography-text>
      </a-space>
    </div>
    <ul class="right-side">
      <!-- RESERVED -->
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import { changeBtnStyle } from '@/utils/change-btn-style';
  import numberFormatter from '@/utils/number-formatter';

  const bankAccounts: any = inject('bankAccounts');
  const paymentForm: any = inject('paymentForm');
  const warningDrawerVisibleFlag: any = inject('warningDrawerVisibleFlag');
  const warningCheckboxFlag: any = inject('warningCheckboxFlag');
  const disableContinuePaymentFlag: any = inject('disableContinuePaymentFlag');
  const backBtnHoverFlag = ref(false);
  const goBackToPayOrWarningGuide = () => {
    warningCheckboxFlag.value = false;
    disableContinuePaymentFlag.value = true;
    warningDrawerVisibleFlag.value = false;
  };
</script>

<style lang="less" scoped>
  .navbar {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .left-side {
    width: 100px;
    height: 36px;
    list-style: none;
    text-align: left;
    padding-inline-start: 0px;
    li {
      margin-left: 12px;
    }
  }

  .center-side {
    width: 300px;
    height: 52px;
    text-align: center;
  }

  .right-side {
    width: 100px;
    height: 36px;
    list-style: none;
    text-align: right;
    padding-inline-start: 0px;
    li {
      margin-right: 12px;
    }
  }
</style>
