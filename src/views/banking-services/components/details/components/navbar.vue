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
          @click="goBackToHome()"
        >
          <template #icon>
            <icon-arrow-left />
          </template>
        </a-button>
      </li>
    </ul>
    <div class="center-side">
      <a-space direction="vertical" :size="0" fill>
        <a-typography-text
          style="line-height: 26px; font-size: 16px; color: #f53f3f"
        >
          {{ focusedAccount.bankAccountType }}
        </a-typography-text>
        <a-typography-text
          style="line-height: 26px; font-size: 14px"
          type="secondary"
        >
          {{ focusedAccount.sortCode }} {{ focusedAccount.accountNumber }}
        </a-typography-text>
      </a-space>
    </div>
    <ul class="right-side">
      <li>
        <a-button
          :style="changeBtnStyle(moreBtnHoverFlag)"
          type="outline"
          shape="circle"
          size="large"
          @mouseenter="moreBtnHoverFlag = true"
          @mouseleave="moreBtnHoverFlag = false"
          @click="goToMoreOptions()"
        >
          <template #icon>
            <icon-more-vertical />
          </template>
        </a-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';

  const focusedAccountIdx: any = inject('focusedAccountIdx');
  const focusedAccount: any = inject('focusedAccount');
  const moreOptionsDrawerVisibleFlag: any = inject(
    'moreOptionsDrawerVisibleFlag'
  );
  const defaultNavbarBtnStyle = {
    borderColor: '#ffffff',
    color: '#4e5969',
    fontSize: '24px',
  };
  const hoverNavbarBtnStyle = {
    borderColor: '#ffffff',
    color: '#4e5969',
    fontSize: '26px',
  };
  const backBtnHoverFlag = ref(false);
  const moreBtnHoverFlag = ref(false);

  const changeBtnStyle = (hoverFlag: boolean) => {
    if (hoverFlag === false) {
      return defaultNavbarBtnStyle;
    }
    return hoverNavbarBtnStyle;
  };
  const goBackToHome = () => {
    focusedAccountIdx.value = '';
  };
  const goToMoreOptions = () => {
    moreOptionsDrawerVisibleFlag.value = true;
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
