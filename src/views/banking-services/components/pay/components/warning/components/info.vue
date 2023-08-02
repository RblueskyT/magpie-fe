<template>
  <div class="continue-payment-container">
    <!-- WARNING SIGN -->
    <div
      v-if="group[currentScenario].charAt(2) === '1'"
      class="warning-sign-container"
    >
      <img
        style="width: 64px; height: 64px"
        src="@/assets/images/warning-sign.png"
        alt="Warning Sign"
      />
    </div>
    <!-- WARNING TITLE -->
    <a-typography-title
      :heading="5"
      style="
        margin-top: 16px;
        margin-bottom: 16px;
        text-align: center;
        font-weight: bold;
      "
    >
      <span v-if="group[currentScenario].charAt(1) === '0'">
        Could this be a scam?
      </span>
      <span
        v-if="
          group[currentScenario].charAt(1) === '1' &&
          paymentForm.paymentPurpose === 'Paying a friend'
        "
      >
        Could this be a friendship scam?
      </span>
      <span
        v-if="
          group[currentScenario].charAt(1) === '1' &&
          paymentForm.paymentPurpose === 'Paying family'
        "
      >
        Could this be a payment redirection scam?
      </span>
      <span
        v-if="
          group[currentScenario].charAt(1) === '1' &&
          paymentForm.paymentPurpose === 'Paying for a service'
        "
      >
        Could this be a payment redirection scam?
      </span>
      <span
        v-if="
          group[currentScenario].charAt(1) === '1' &&
          paymentForm.paymentPurpose === 'Buying goods'
        "
      >
        Could this be a purchase scam?
      </span>
      <span
        v-if="
          group[currentScenario].charAt(1) === '1' &&
          paymentForm.paymentPurpose === 'Transfer to an investment'
        "
      >
        Could this be an investment scam?
      </span>
      <span
        v-if="
          group[currentScenario].charAt(1) === '1' &&
          paymentForm.paymentPurpose === 'Anything else'
        "
      >
        Could this be a scam?
      </span>
    </a-typography-title>
    <!-- WARNING MESSAGE ONE -->
    <div
      v-if="group[currentScenario].charAt(0) === '1'"
      style="margin-bottom: 16px; padding: 0px 12px"
    >
      <ul style="margin: 0px 0px; padding-left: 20px">
        <li
          v-for="(itemQuestion, indexQuestion) in questionOrder"
          :key="indexQuestion"
        >
          <a-typography-paragraph
            v-if="itemQuestion === 0"
            style="margin-bottom: 0px"
          >
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying a friend' &&
                warningGuideUserChoice[0] === 0
              "
            >
              Being asked to pay someone you've met online is likely to be
              fraudulent as people can easily hide their true identities on the
              internet.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying a friend' &&
                warningGuideUserChoice[0] === 1
              "
            >
              While the payee is not someone you've met online, you should still
              check the payment details with them by phone or in person in case
              fraudsters impersonate them.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying family' &&
                warningGuideUserChoice[0] === 0
              "
            >
              Fraudsters often pretend to be employees of a government agency or
              someone you and your family know and falsely claim that your
              family is in trouble and needs money. If this is the case, please
              stop the payment and contact us immediately.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying family' &&
                warningGuideUserChoice[0] === 1
              "
            >
              While you're sure that the payee is your family, you should still
              check the payment details with them by phone or in person in case
              fraudsters impersonate them.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying for a service' &&
                warningGuideUserChoice[0] === 0
              "
            >
              Being asked to pay before receiving a service is likely to be
              fraudulent as fraudsters may try to sell you a service and ask you
              to pay up front and they will break contact with you after you
              complete the payment.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying for a service' &&
                warningGuideUserChoice[0] === 1
              "
            >
              While you're sure that you've received the service, you should
              still check the payment details with the vendor through a trusted
              phone number or in person to ensure that they initiated this
              payment request.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Buying goods' &&
                warningGuideUserChoice[0] === 0
              "
            >
              It's likely to be a scam if someone is selling you goods over the
              phone and instruct you to make a payment, since it's difficult for
              you to verify their true identity with only their phone number.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Buying goods' &&
                warningGuideUserChoice[0] === 1
              "
            >
              While you're not currently on a phone call, if you're paying
              someone who has called you to sell goods, please be aware that
              this could be a scam as it's difficult for you to verify their
              true identity with only their phone number.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Transfer to an investment' &&
                warningGuideUserChoice[0] === 0
              "
            >
              It's likely to be a scam if someone is providing you with an
              investment opportunity over the phone and instruct you to make a
              payment, since it's difficult for you to verify their true
              identity with only their phone number.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Transfer to an investment' &&
                warningGuideUserChoice[0] === 1
              "
            >
              While you're not currently on a phone call, if you're paying
              someone who has called you with investment opportunities, please
              be aware that this could be a scam as it's difficult for you to
              verify their true identity with only their phone number.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Anything else' &&
                warningGuideUserChoice[0] === 0
              "
            >
              Fraudsters often pretend to be employees of a government agency or
              other organisation and use this false identity to intimidate you
              into paying them. If this is the case, please stop the payment and
              contact us immediately.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Anything else' &&
                warningGuideUserChoice[0] === 1
              "
            >
              While you're not paying someone who claims to represent a
              government agency or other organisation, you should still verify
              their true identity in case they are a fraudster.
            </span>
          </a-typography-paragraph>
          <a-typography-paragraph
            v-if="itemQuestion === 1"
            style="margin-bottom: 0px"
          >
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying a friend' &&
                warningGuideUserChoice[1] === 0
              "
            >
              Fraudsters often send people emails or text messages pretending to
              be their friend and ask them to pay to the account they've
              provided. Please verify the authenticity of the email or text
              message with your friend by phone or in person.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying a friend' &&
                warningGuideUserChoice[1] === 1
              "
            >
              While you didn't receive your friend's payment request via email
              or text message, you should still check the payment details with
              your friend by phone or in person to ensure that the payment
              details are correct.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying family' &&
                warningGuideUserChoice[1] === 0
              "
            >
              Fraudsters often send people emails or text messages pretending to
              be their family and ask them to pay to the account they've
              provided. Please verify the authenticity of the email or text
              message with your family by phone or in person.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying family' &&
                warningGuideUserChoice[1] === 1
              "
            >
              While you didn't receive your family's payment request via email
              or text message, you should still check the payment details with
              your family by phone or in person to ensure that the payment
              details are correct.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying for a service' &&
                warningGuideUserChoice[1] === 0
              "
            >
              Fraudsters often send people emails or text messages pretending to
              be an existing vendor and ask them to pay to the account they've
              provided. Please verify the authenticity of the email or text
              message with the vendor by phone or in person.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Paying for a service' &&
                warningGuideUserChoice[1] === 1
              "
            >
              While you didn't receive the invoice or bank account details via
              email or text message, you should still check the payment details
              with the vendor by phone or in person to ensure that the payment
              details are correct.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Buying goods' &&
                warningGuideUserChoice[1] === 0
              "
            >
              Being asked to pay without seeing the item is likely to be
              fraudulent as fraudsters may try to sell you goods and ask you to
              pay up front and they will break contact with you after you
              complete the payment.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Buying goods' &&
                warningGuideUserChoice[1] === 1
              "
            >
              While you're sure that you've seen the item, you should still
              check the payment details with the vendor by phone or in person to
              ensure that the payment details are correct.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Transfer to an investment' &&
                warningGuideUserChoice[1] === 0
              "
            >
              It's likely to be a scam if someone has cold-called you with
              investment opportunities as fraudsters often pretend to be
              employees of an existing bank or investment company and lure
              victims over the phone.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Transfer to an investment' &&
                warningGuideUserChoice[1] === 1
              "
            >
              While you haven't been cold-called about an investment
              opportunity, you should still verify the details of your chosen
              bank or investment company, since fraudsters can easily make up a
              fake bank or investment company through various means, such as
              setting up a fake official website.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Anything else' &&
                warningGuideUserChoice[1] === 0
              "
            >
              Fraudsters often send you an email or text message pretending to
              be the payee and ask you to pay to the account they've provided.
              Please verify the authenticity of the email or text message with
              the payee by phone or in person.
            </span>
            <span
              v-if="
                paymentForm.paymentPurpose === 'Anything else' &&
                warningGuideUserChoice[1] === 1
              "
            >
              While you didn't receive the payee's payment request via email or
              text message, you should still check the payment details with the
              payee by phone or in person to ensure that the payment details are
              correct.
            </span>
          </a-typography-paragraph>
          <a-typography-paragraph
            v-if="itemQuestion === 2"
            style="margin-bottom: 0px"
          >
            <span v-if="warningGuideUserChoice[2] === 0">
              Fraudsters often use high-pressure tactics to force victims to
              send money quickly that they have no time to check payment details
              (e.g., the money is needed urgently). Please don't feel pressured
              into sending money to someone before you are confident that it's
              not a scam.
            </span>
            <span v-if="warningGuideUserChoice[2] === 1">
              While you did not state that the payment was urgent, you should
              still take time to check whether this payment is genuine.
            </span>
          </a-typography-paragraph>
        </li>
      </ul>
    </div>
    <!-- WARNING MESSAGE TWO -->
    <div style="margin-bottom: 16px; padding: 0px 12px">
      <a-typography-title
        :heading="6"
        style="margin-top: 0px; margin-bottom: 16px; font-weight: bold"
      >
        <span
          :style="
            group[currentScenario].charAt(2) === '1'
              ? 'color: #f53f3f'
              : 'color: #1d2129'
          "
        >
          Remember:
        </span>
      </a-typography-title>
      <ul style="margin: 0px 0px; padding-left: 20px">
        <li
          :style="
            group[currentScenario].charAt(2) === '1'
              ? 'color: #f53f3f'
              : 'color: #1d2129'
          "
        >
          <a-typography-paragraph style="color: #1d2129; margin-bottom: 0px">
            <span v-if="group[currentScenario].charAt(1) === '0'">
              If a deal seems too good to be true, it's likely a scam.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Paying a friend'
              "
            >
              Criminals regularly use social networks and dating websites to
              scam people, often building up a friendship over months.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Paying family'
              "
            >
              Criminals often attempt to intercept emails or text messages and
              send you false bank account details. These emails or text messages
              often look genuine.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Paying for a service'
              "
            >
              Criminals often attempt to intercept emails or text messages and
              send you false bank account details. These emails or text messages
              often look genuine.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Buying goods'
              "
            >
              Criminals post fake adverts and ask for upfront payment. If you
              haven't seen the item in person, this could be a scam.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Transfer to an investment'
              "
            >
              If you've been cold-called or contacted out of the blue about an
              investment opportunity, this is highly likely to be a scam.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Anything else'
              "
            >
              If a deal seems too good to be true, it's likely a scam.
            </span>
          </a-typography-paragraph>
        </li>
        <li
          :style="
            group[currentScenario].charAt(2) === '1'
              ? 'color: #f53f3f'
              : 'color: #1d2129'
          "
        >
          <a-typography-paragraph style="color: #1d2129; margin-bottom: 0px">
            <span v-if="group[currentScenario].charAt(1) === '0'">
              The name and phone number of legitimate companies can be 'spoofed'
              or faked. Please take a minute to check the payment details and
              the reason for payment is genuine - this could save your money
              from being stolen.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Paying a friend'
              "
            >
              Please think twice before sending money to someone you've met
              online.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Paying family'
              "
            >
              Please take a minute to double-check the payment details by phone
              or in person - this could save your money from being stolen.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Paying for a service'
              "
            >
              Please take a minute to double-check the payment details by phone
              or in person - this could save your money from being stolen.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Buying goods'
              "
            >
              Please always complete checks to make sure the item and the seller
              are genuine.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Transfer to an investment'
              "
            >
              Please check the company details thoroughly, including on the
              Financial Conduct Authorities website (fca.org.uk), before
              transferring any money.
            </span>
            <span
              v-if="
                group[currentScenario].charAt(1) === '1' &&
                paymentForm.paymentPurpose === 'Anything else'
              "
            >
              The name and phone number of legitimate companies can be 'spoofed'
              or faked. Please take a minute to check the payment details and
              the reason for payment is genuine - this could save your money
              from being stolen.
            </span>
          </a-typography-paragraph>
        </li>
      </ul>
    </div>
    <!-- CHECKBOX -->
    <div style="background-color: #f2f3f5; margin-bottom: 16px; padding: 12px">
      <a-typography-paragraph style="margin-bottom: 16px">
        Please don't ignore this as we're unlikely to be able to recover your
        money if this is a scam.
      </a-typography-paragraph>
      <a-typography-paragraph style="margin-bottom: 16px; font-weight: bold">
        If you're at all nervous, stop this payment and contact us immediately.
      </a-typography-paragraph>
      <div class="warning-checkbox-container">
        <a-checkbox v-model="warningCheckboxFlag" @change="disableContinue">
          I'm comfortable to make this payment
        </a-checkbox>
      </div>
    </div>
    <!-- BUTTONS -->
    <div style="padding: 0px 12px">
      <a-button
        type="primary"
        shape="round"
        size="large"
        long
        style="margin-bottom: 16px"
        @click="cancelPayment()"
      >
        Cancel Payment
      </a-button>
      <a-button
        shape="round"
        size="large"
        long
        :disabled="disableContinuePaymentFlag"
        @click="continuePayment()"
      >
        Continue Payment
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';

  const group: any = inject('group');
  const currentScenario: any = inject('currentScenario');
  const bottomMenuKey: any = inject('bottomMenuKey');
  const paymentForm: any = inject('paymentForm');
  const paymentFormTempAmount: any = inject('paymentFormTempAmount');
  const paymentFormTempDate: any = inject('paymentFormTempDate');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const questionOrder: any = inject('questionOrder');
  const warningGuideDrawerVisibleFlag: any = inject(
    'warningGuideDrawerVisibleFlag'
  );
  const warningGuideUserChoice: any = inject('warningGuideUserChoice');
  const warningDrawerVisibleFlag: any = inject('warningDrawerVisibleFlag');
  const reviewDetailsDrawerVisibleFlag: any = inject(
    'reviewDetailsDrawerVisibleFlag'
  );
  const warningCheckboxFlag: any = inject('warningCheckboxFlag');
  const disableContinuePaymentFlag: any = inject('disableContinuePaymentFlag');
  const disableContinue = () => {
    if (warningCheckboxFlag.value === true) {
      disableContinuePaymentFlag.value = false;
    } else {
      disableContinuePaymentFlag.value = true;
    }
  };
  const cancelPayment = () => {
    // close the warning drawer
    warningGuideUserChoice.value.splice(0, 3, 0, 0, 0);
    warningGuideDrawerVisibleFlag.value.splice(0, 3, false, false, false);
    warningCheckboxFlag.value = false;
    disableContinuePaymentFlag.value = true;
    warningDrawerVisibleFlag.value = false;
    // close the payment form drawer
    paymentForm.value.from = '';
    paymentForm.value.to = '';
    paymentForm.value.amount = 0;
    paymentFormTempAmount.value = 0;
    paymentForm.value.reference = '';
    paymentForm.value.date = '';
    paymentFormTempDate.value = '';
    paymentForm.value.paymentPurpose = '';
    drawerTwoVisibleFlag.value = false;
    bottomMenuKey.value[0] = '0';
    // update the current scenario
    currentScenario.value = (currentScenario.value + 1) % 4;
  };
  const continuePayment = () => {
    warningCheckboxFlag.value = false;
    disableContinuePaymentFlag.value = true;
    reviewDetailsDrawerVisibleFlag.value = true;
  };
</script>

<style lang="less" scoped>
  .continue-payment-container {
    height: 100%;
  }

  .warning-sign-container {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .warning-checkbox-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
