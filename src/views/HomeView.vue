<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant';


</script>

<template>
  <main class="flex flex-col h-[100vh] w-full mx-auto">
    <RouterView class="grow" />
    <div class="flex h-12 w-full !bg-gray-200">
      <Tabbar route>
        <TabbarItem to="/select-create" icon="plus"
          class="[&.router-link-active]:text-green-500 basis-0 grow flex flex-col items-center bg-gray-200">
          新建
        </TabbarItem>
        <TabbarItem to="/me" icon="user-o"
          class="[&.router-link-active]:text-green-500 basis-0 grow flex flex-col items-center bg-gray-200">
          我的
        </TabbarItem>
      </Tabbar>
    </div>
  </main>
</template>
