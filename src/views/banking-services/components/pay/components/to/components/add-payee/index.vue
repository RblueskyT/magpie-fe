<template>
  <div id="addPayeeModalDrawerContainer" class="add-payee-layout">
    <a-layout>
      <a-layout-header>
        <NavBar />
      </a-layout-header>
      <a-layout-content>
        <AddForm v-if="payToDrawerVisibleFlag === true" />
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <!-- CONFIRM GO BACK -->
    <a-modal
      v-model:visible="goBackModalAddPayeeVisibleFlag"
      :width="400"
      title="Warning"
      title-align="start"
      :mask-closable="false"
      simple
      ok-text="YES"
      cancel-text="NO"
      :ok-button-props="{ type: 'text' }"
      :cancel-button-props="{ type: 'text' }"
      :render-to-body="false"
      popup-container="#addPayeeModalDrawerContainer"
      :esc-to-close="false"
      @ok="confirmGoBack()"
      @cancel="cancelGoBack()"
    >
      <div>Are you sure you want to cancel adding the payee?</div>
    </a-modal>
    <!-- EXTRA INFO MODAL -->
    <a-modal
      v-model:visible="extraInfoModalVisibleFlag"
      :width="400"
      :title="extraInfoTitle"
      title-align="center"
      :mask-closable="false"
      simple
      :footer="false"
      :render-to-body="false"
      popup-container="#addPayeeModalDrawerContainer"
      :esc-to-close="false"
    >
      <div>
        <a-typography v-if="extraInfoTitle === 'Name on the Account'">
          <a-typography-paragraph style="margin-bottom: 12px">
            Enter the name of the person or business you're paying
            <span style="font-weight: bold">exactly</span> as it appears on
            their account.
          </a-typography-paragraph>
          <a-typography-paragraph
            style="margin-bottom: 12px; font-weight: bold"
          >
            Check with the person you're trying to pay if you're not sure.
          </a-typography-paragraph>
        </a-typography>
        <a-typography v-if="extraInfoTitle === 'Account Type'">
          <a-typography-paragraph style="margin-bottom: 12px">
            Choose whether you're paying money to somebody's personal account or
            a business account.
          </a-typography-paragraph>
          <a-typography-paragraph
            style="margin-bottom: 12px; font-weight: bold"
          >
            Check with the person you're trying to pay if you're not sure.
          </a-typography-paragraph>
        </a-typography>
        <a-typography v-if="extraInfoTitle === 'Reference'">
          <a-typography-paragraph style="margin-bottom: 12px">
            If you're paying a credit card, loan or mortgage, you might need to
            add a reference that identifies you.
          </a-typography-paragraph>
          <a-typography-paragraph
            style="margin-bottom: 12px; font-weight: bold"
          >
            It's important that you enter this correctly.
          </a-typography-paragraph>
        </a-typography>
        <a-button type="text" shape="round" long @click="closeExtraInfoModal()">
          {{ 'Got It' }}
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject, provide } from 'vue';
  import NavBar from './components/navbar.vue';
  import AddForm from './components/add-form.vue';

  const payToDrawerVisibleFlag: any = inject('payToDrawerVisibleFlag');
  const addPayeeFormData = ref({
    name: '',
    type: '',
    sortCode: '',
    accountNumber: '',
    reference: '',
  });
  const goBackModalAddPayeeVisibleFlag = ref(false);
  const extraInfoModalVisibleFlag = ref(false);
  const extraInfoTitle = ref('');
  const cancelGoBack = () => {
    goBackModalAddPayeeVisibleFlag.value = false;
  };
  const confirmGoBack = () => {
    addPayeeFormData.value.name = '';
    addPayeeFormData.value.type = '';
    addPayeeFormData.value.sortCode = '';
    addPayeeFormData.value.accountNumber = '';
    addPayeeFormData.value.reference = '';
    payToDrawerVisibleFlag.value = false;
  };
  const closeExtraInfoModal = () => {
    extraInfoModalVisibleFlag.value = false;
    extraInfoTitle.value = '';
  };

  provide('addPayeeFormData', addPayeeFormData);
  provide('goBackModalAddPayeeVisibleFlag', goBackModalAddPayeeVisibleFlag);
  provide('extraInfoModalVisibleFlag', extraInfoModalVisibleFlag);
  provide('extraInfoTitle', extraInfoTitle);
</script>

<style lang="less" scoped>
  .add-payee-layout {
    position: relative;
    overflow: hidden;
  }

  .add-payee-layout > .arco-layout {
    height: 100vh;
  }

  .add-payee-layout > .arco-layout > .arco-layout-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .add-payee-layout > .arco-layout > .arco-layout-content {
    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;
  }
</style>
