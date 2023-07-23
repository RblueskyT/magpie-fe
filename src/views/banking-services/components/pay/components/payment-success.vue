<template>
  <div class="payment-success-layout">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <a-result status="success" style="padding: 12px 12px 12px 12px">
          <template #title>
            <a-typography-title
              :heading="5"
              style="margin-top: 16px; margin-bottom: 32px"
            >
              Success
            </a-typography-title>
          </template>
          <template #subtitle>
            <a-typography-paragraph
              type="secondary"
              style="margin-bottom: 32px"
            >
              Payment completed.
            </a-typography-paragraph>
          </template>
          <template #extra>
            <a-space direction="vertical" :size="16" fill>
              <a-button
                type="primary"
                shape="round"
                size="large"
                long
                @click="gotIt()"
              >
                Got It
              </a-button>
              <a-button
                type="outline"
                shape="round"
                size="large"
                long
                @click="makeAnotherPayment()"
              >
                Make Another Payment
              </a-button>
            </a-space>
          </template>
        </a-result>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import getARandomQuestionOrder from '@/utils/random-question-order';

  const bottomMenuKey: any = inject('bottomMenuKey');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const currentQuestion: any = inject('currentQuestion');
  const questionOrder: any = inject('questionOrder');
  const warningGuideDrawerVisibleFlag: any = inject(
    'warningGuideDrawerVisibleFlag'
  );
  const warningGuideUserChoice: any = inject('warningGuideUserChoice');
  const warningDrawerVisibleFlag: any = inject('warningDrawerVisibleFlag');
  const reviewDetailsDrawerVisibleFlag: any = inject(
    'reviewDetailsDrawerVisibleFlag'
  );
  const paymentSuccessDrawerVisibleFlag: any = inject(
    'paymentSuccessDrawerVisibleFlag'
  );
  const gotIt = () => {
    warningGuideUserChoice.value = 0;
    warningGuideDrawerVisibleFlag.value = false;
    warningDrawerVisibleFlag.value = false;
    reviewDetailsDrawerVisibleFlag.value = false;
    paymentSuccessDrawerVisibleFlag.value = false;
    drawerTwoVisibleFlag.value = false;
    bottomMenuKey.value[0] = '0';
  };
  const makeAnotherPayment = () => {
    warningGuideUserChoice.value = 0;
    warningGuideDrawerVisibleFlag.value = false;
    warningDrawerVisibleFlag.value = false;
    currentQuestion.value = 0;
    getARandomQuestionOrder(questionOrder.value);
    reviewDetailsDrawerVisibleFlag.value = false;
    paymentSuccessDrawerVisibleFlag.value = false;
  };
</script>

<style lang="less" scoped>
  .payment-success-layout > .arco-layout {
    height: 100vh;
  }

  .payment-success-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
</style>
