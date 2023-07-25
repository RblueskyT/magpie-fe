<template>
  <div class="continue-payment-guide-container">
    <!-- PROGRESS BAR -->
    <div class="continue-payment-guide-progress-container" style="padding: 0px">
      <a-progress
        :percent="(currentQuestion + 1) / 3"
        :show-text="false"
        status="normal"
      />
    </div>
    <!-- Q1 PART 1 -->
    <div
      v-if="props.question === 0"
      style="padding: 0px 12px 32px 12px; margin-top: 24px"
    >
      <a-typography-title
        :heading="5"
        style="margin-top: 0px; margin-bottom: 32px; font-weight: bold"
      >
        <span v-if="paymentForm.paymentPurpose === 'Paying a friend'">
          Are you paying someone you've met online?
        </span>
        <span v-else-if="paymentForm.paymentPurpose === 'Paying family'">
          Are you paying someone who claims to represent your family?
        </span>
        <span v-else-if="paymentForm.paymentPurpose === 'Paying for a service'">
          Have you been asked to pay before receiving the service?
        </span>
        <span v-else-if="paymentForm.paymentPurpose === 'Anything else'">
          Are you paying someone who claims to represent a government agency or
          other organisation?
        </span>
        <span v-else>Are you currently on a phone call?</span>
      </a-typography-title>
      <a-button
        shape="round"
        size="large"
        long
        style="margin-bottom: 16px"
        @click="goToWarning(0)"
      >
        <span v-if="paymentForm.paymentPurpose === 'Paying for a service'">
          Yes, I have
        </span>
        <span v-else>Yes, I am</span>
      </a-button>
      <a-button shape="round" size="large" long @click="goToWarning(1)">
        <span v-if="paymentForm.paymentPurpose === 'Paying for a service'">
          No, I haven't
        </span>
        <span v-else>No, I'm not</span>
      </a-button>
    </div>
    <!-- Q2 PART 1 -->
    <div
      v-if="props.question === 1"
      style="padding: 0px 12px 32px 12px; margin-top: 24px"
    >
      <a-typography-title
        :heading="5"
        style="margin-top: 0px; margin-bottom: 32px; font-weight: bold"
      >
        <span v-if="paymentForm.paymentPurpose === 'Paying a friend'">
          Have you received the payment request from your friend by email or
          text message?
        </span>
        <span v-if="paymentForm.paymentPurpose === 'Paying family'">
          Have you received the payment request from your family by email or
          text message?
        </span>
        <span v-if="paymentForm.paymentPurpose === 'Paying for a service'">
          Have you received the invoice or bank account details by email or text
          message?
        </span>
        <span v-if="paymentForm.paymentPurpose === 'Buying goods'">
          Have you been asked to pay without seeing the item?
        </span>
        <span v-if="paymentForm.paymentPurpose === 'Transfer to an investment'">
          Have you been cold-called about an investment opportunity?
        </span>
        <span v-if="paymentForm.paymentPurpose === 'Anything else'">
          Have you received the payment request by email or text message?
        </span>
      </a-typography-title>
      <a-button
        shape="round"
        size="large"
        long
        style="margin-bottom: 16px"
        @click="goToWarning(0)"
      >
        Yes, I have
      </a-button>
      <a-button shape="round" size="large" long @click="goToWarning(1)">
        No, I haven't
      </a-button>
    </div>
    <!-- Q3 PART 1 -->
    <div
      v-if="props.question === 2"
      style="padding: 0px 12px 32px 12px; margin-top: 24px"
    >
      <a-typography-title
        :heading="5"
        style="margin-top: 0px; margin-bottom: 32px; font-weight: bold"
      >
        Have you been asked to make an urgent payment?
      </a-typography-title>
      <a-button
        shape="round"
        size="large"
        long
        style="margin-bottom: 16px"
        @click="goToWarning(0)"
      >
        Yes, I have
      </a-button>
      <a-button shape="round" size="large" long @click="goToWarning(1)">
        No, I haven't
      </a-button>
    </div>
    <!-- Q1 PART 2 -->
    <div v-if="props.question === 0" style="padding: 0px 12px">
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Paying a friend'"
        style="margin-bottom: 16px"
      >
        If you're paying someone you've met online, this could be a scam.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Paying family'"
        style="margin-bottom: 16px"
      >
        If you're paying someone who claims to represent your family, this could
        be a scam. Please contact your family by phone or in person to verify.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Paying for a service'"
        style="margin-bottom: 16px"
      >
        If you've been asked to pay before receiving the service, this is a
        known scam technique.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Buying goods'"
        style="margin-bottom: 16px"
      >
        If someone is calling you to move money from your account unexpectedly,
        this could be a scam. Please stop.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Transfer to an investment'"
        style="margin-bottom: 16px"
      >
        If someone is calling you to move money from your account unexpectedly,
        this could be a scam. Please stop.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Anything else'"
        style="margin-bottom: 16px"
      >
        If you've been asked to pay someone claiming to represent a government
        agency or other organisation, this is a known scam technique. Please
        stop.
      </a-typography-paragraph>
    </div>
    <!-- Q2 PART 2 -->
    <div v-if="props.question === 1" style="padding: 0px 12px">
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Paying for a service'"
        style="margin-bottom: 16px"
      >
        If you've received an invoice or bank account details by email or text
        message, this could be a scam.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-else-if="paymentForm.paymentPurpose === 'Buying goods'"
        style="margin-bottom: 16px"
      >
        If you've been asked to pay without seeing the item, this is a known
        scam technique.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-else-if="paymentForm.paymentPurpose === 'Transfer to an investment'"
        style="margin-bottom: 16px"
      >
        If you've been cold-called about an investment opportunity, this could
        be a scam. Please stop.
      </a-typography-paragraph>
      <a-typography-paragraph v-else style="margin-bottom: 16px">
        If you've received the payment request by email or text message, even
        from someone you know, it could be a scam.
      </a-typography-paragraph>
    </div>
    <!-- Q3 PART 2 -->
    <div v-if="props.question === 2" style="padding: 0px 12px">
      <a-typography-paragraph style="margin-bottom: 16px">
        If you've been asked to make an urgent payment, this could be a scam.
      </a-typography-paragraph>
    </div>
    <!-- COMMON -->
    <div style="padding: 0px 12px">
      <a-typography-paragraph style="margin-bottom: 0px; font-weight: bold">
        If you're not comfortable or want to complete further checks, stop and
        cancel the payment now.
      </a-typography-paragraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';

  const props = defineProps<{
    question: number;
  }>();
  const paymentForm: any = inject('paymentForm');
  const currentQuestion: any = inject('currentQuestion');
  const questionOrder: any = inject('questionOrder');
  const warningGuideDrawerVisibleFlag: any = inject(
    'warningGuideDrawerVisibleFlag'
  );
  const warningGuideUserChoice: any = inject('warningGuideUserChoice');
  const warningDrawerVisibleFlag: any = inject('warningDrawerVisibleFlag');
  const goToWarning = (choice: number) => {
    warningGuideUserChoice.value[questionOrder.value[currentQuestion.value]] =
      choice;
    if (currentQuestion.value < 2) {
      currentQuestion.value += 1;
      warningGuideDrawerVisibleFlag.value[
        questionOrder.value[currentQuestion.value]
      ] = true;
    } else {
      warningDrawerVisibleFlag.value = true;
    }
  };
</script>

<style lang="less" scoped>
  .continue-payment-guide-container {
    height: 100%;
  }

  .continue-payment-guide-progress-container :deep(.arco-progress-type-line) {
    display: inherit;
  }
</style>
