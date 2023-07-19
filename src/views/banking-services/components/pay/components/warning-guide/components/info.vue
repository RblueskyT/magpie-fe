<template>
  <div class="continue-payment-guide-container">
    <div style="padding: 12px 12px 32px 12px">
      <a-typography-title
        :heading="5"
        style="margin-top: 16px; margin-bottom: 32px; font-weight: bold"
      >
        <span v-if="paymentForm.paymentPurpose === 'Paying a friend'">
          Are you paying someone you've met online?
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
          Have you been contacted and asked to make an urgent payment?
        </span>
      </a-typography-title>
      <a-button
        shape="round"
        size="large"
        long
        style="margin-bottom: 16px"
        @click="goToWarning(0)"
      >
        <span v-if="paymentForm.paymentPurpose === 'Paying a friend'">
          Yes, I am
        </span>
        <span v-else>Yes, I have</span>
      </a-button>
      <a-button shape="round" size="large" long @click="goToWarning(1)">
        <span v-if="paymentForm.paymentPurpose === 'Paying a friend'">
          No, I'm not
        </span>
        <span v-else>No, I haven't</span>
      </a-button>
    </div>
    <div style="padding: 0px 12px">
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
        If you've received the payment request by email or text message, even
        from someone you know, it could be a scam.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Paying for a service'"
        style="margin-bottom: 16px"
      >
        If you've received an invoice or bank account details by email or text
        message, this could be a scam.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Buying goods'"
        style="margin-bottom: 16px"
      >
        If you've been asked to pay without seeing the item, this is a known
        scam technique.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Transfer to an investment'"
        style="margin-bottom: 16px"
      >
        If you've been cold-called about an investment opportunity, this could
        be a scam. Please stop.
      </a-typography-paragraph>
      <a-typography-paragraph
        v-if="paymentForm.paymentPurpose === 'Anything else'"
        style="margin-bottom: 16px"
      >
        If you've been contacted and asked to make an urgent payment, this could
        be a scam.
      </a-typography-paragraph>
      <a-typography-paragraph style="margin-bottom: 0px; font-weight: bold">
        If you're not comfortable or want to complete further checks, stop and
        cancel the payment now.
      </a-typography-paragraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';

  const paymentForm: any = inject('paymentForm');
  const warningGuideUserChoice: any = inject('warningGuideUserChoice');
  const warningDrawerVisibleFlag: any = inject('warningDrawerVisibleFlag');
  const goToWarning = (choice: number) => {
    warningGuideUserChoice.value = choice;
    warningDrawerVisibleFlag.value = true;
  };
</script>

<style lang="less" scoped>
  .continue-payment-guide-container {
    height: 100%;
  }

  .warning-sign-container {
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
