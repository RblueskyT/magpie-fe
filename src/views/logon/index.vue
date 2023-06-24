<template>
  <div class="app-container">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <div class="logon-container">
          <a-card class="logon-card" :bordered="false">
            <div class="logon-content">
              <a-layout>
                <a-layout-header></a-layout-header>
                <a-layout-content>
                  <a-space direction="vertical" size="medium" fill>
                    <a-space direction="vertical" :size="0" fill>
                      <a-row>
                        <a-col :span="24">
                          <a-avatar class="app-logo" :size="56">
                            <img
                              style="
                                width: 44px;
                                height: 44px;
                                margin-top: 4px;
                                margin-left: 4px;
                              "
                              src="@/assets/images/magpie-logo-red.png"
                              alt="Magpie Logo"
                            />
                          </a-avatar>
                        </a-col>
                      </a-row>
                      <a-row>
                        <a-col :span="24">
                          <a-typography-title
                            :heading="4"
                            style="
                              color: #f73131;
                              margin: 0;
                              text-align: center;
                              font-family: 'Trebuchet MS', 'Lucida Sans Unicode',
                                'Lucida Grande', 'Lucida Sans', Arial,
                                sans-serif;
                              line-height: 1;
                            "
                          >
                            Magpie
                          </a-typography-title>
                        </a-col>
                      </a-row>
                      <a-row>
                        <a-col :span="24">
                          <a-typography-title
                            :heading="4"
                            style="color: #f73131"
                          >
                            Log on to your Online Banking
                          </a-typography-title>
                        </a-col>
                      </a-row>
                    </a-space>
                    <a-row>
                      <a-col :span="24">
                        <LogonForm />
                      </a-col>
                    </a-row>
                  </a-space>
                </a-layout-content>
                <a-layout-footer>
                  <img
                    class="fscs-logo"
                    src="@/assets/images/fscs-protected.png"
                    alt="FSCS Protected"
                  />
                </a-layout-footer>
              </a-layout>
            </div>
          </a-card>
        </div>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import LogonForm from './components/logon-form.vue';
</script>

<style lang="less" scoped>
  .app-container {
    height: 100vh;
  }

  .app-container :deep(.arco-layout-content) {
    background-color: rgb(var(--gray-3));
  }

  .logon-container {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .logon-card {
    width: 500px;
  }

  .logon-card :deep(.arco-card-body) {
    padding: 0px;
  }

  .logon-content :deep(.arco-layout) {
    height: 100vh;
  }

  .logon-content :deep(.arco-layout-header),
  .logon-content :deep(.arco-layout-footer) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 140px;
  }

  .logon-content :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
  }

  .app-logo {
    display: block;
    margin: 0 auto;
    background-color: white;
    border: 1px solid white;
  }

  .fscs-logo {
    display: block;
    margin: 0 auto;
    width: 78px;
    height: 80px;
  }
</style>
