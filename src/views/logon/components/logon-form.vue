<template>
  <div class="logon-form-wrapper">
    <div class="logon-form-error-msg" style="margin-bottom: 8px">
      <a-alert
        v-show="errorMessage.length > 0"
        type="error"
        style="height: 32px; padding: 0 15px"
      >
        {{ errorMessage }}
      </a-alert>
    </div>
    <a-form
      ref="logonForm"
      :model="accountInfo"
      layout="vertical"
      size="large"
      @submit="handleSubmit"
    >
      <a-form-item
        field="personalID"
        label="Personal ID"
        :rules="[
          {
            type: 'string',
            required: true,
            message: 'Please enter a valid personal ID',
            match: /^\d{10}$/,
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-asterisk
      >
        <a-input
          v-model="accountInfo.personalID"
          :max-length="{ length: 10, errorOnly: false }"
          :disabled="loading"
          @input="disableSubmit"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="securityNumber"
        label="Security Number"
        :rules="[
          {
            type: 'string',
            required: true,
            message: 'Please enter a valid security number',
            match: /^\d{5}$/,
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-asterisk
      >
        <template #extra>
          <div>
            You may know this as your 5 digit Registration Number or Customer
            PIN
          </div>
        </template>
        <a-input-password
          v-model="accountInfo.securityNumber"
          placeholder="•••••"
          :max-length="{ length: 5, errorOnly: false }"
          :invisible-button="false"
          :disabled="loading"
          @input="disableSubmit"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="20" direction="vertical">
        <a-checkbox
          checked="rememberPersonalID"
          :model-value="logonConfig.rememberPersonalID"
          :disabled="logonConfig.thisIsPublicDevice || loading ? true : false"
          @change="setRememberPersonalID as any"
        >
          {{ 'Remember personal ID' }}
        </a-checkbox>
        <a-checkbox
          checked="thisIsPublicDevice"
          :model-value="logonConfig.thisIsPublicDevice"
          :disabled="loading"
          @change="setThisIsPublicDevice as any"
        >
          {{ "I'm using a public or shared device" }}
        </a-checkbox>
        <a-button
          style="margin-top: 20px; margin-bottom: 10px"
          type="primary"
          shape="round"
          size="large"
          html-type="submit"
          long
          :loading="loading"
          :disabled="disableSubmitFlag"
        >
          {{ 'Log on' }}
        </a-button>
      </a-space>
      <a-typography-text
        type="danger"
        style="margin: 0 auto"
        underline
        :disabled="loading"
      >
        Forgotten details?
      </a-typography-text>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LogonData } from '@/api/user';

  const router = useRouter();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const logonConfig = useStorage('logon-config', {
    rememberPersonalID: false,
    thisIsPublicDevice: false,
    personalID: '',
  });
  const accountInfo = reactive({
    personalID: logonConfig.value.personalID,
    securityNumber: '',
  });
  const disableSubmitFlag = ref(true);

  const disableSubmit = () => {
    const pidRegex = new RegExp(/^\d{10}$/);
    const snRegex = new RegExp(/^\d{5}$/);
    let validPidFlag = false;
    let validSnFlag = false;
    if (pidRegex.test(accountInfo.personalID)) {
      validPidFlag = true;
    }
    if (snRegex.test(accountInfo.securityNumber)) {
      validSnFlag = true;
    }
    if (validPidFlag === true && validSnFlag === true) {
      disableSubmitFlag.value = false;
    } else {
      disableSubmitFlag.value = true;
    }
  };

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await userStore.logon(values as LogonData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'banking-services',
          query: {
            ...othersQuery,
          },
        });
        Message.success('You have successfully logged on');
        const { rememberPersonalID } = logonConfig.value;
        const { personalID } = values;

        logonConfig.value.personalID = rememberPersonalID ? personalID : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPersonalID = (value: boolean) => {
    logonConfig.value.rememberPersonalID = value;
  };
  const setThisIsPublicDevice = (value: boolean) => {
    logonConfig.value.thisIsPublicDevice = value;
    logonConfig.value.rememberPersonalID = false;
  };
</script>

<style lang="less" scoped>
  .logon-form {
    &-wrapper {
      width: 353px;
    }

    &-error-msg {
      height: 32px;
    }
  }
</style>
