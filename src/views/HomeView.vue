<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';


</script>

<template>
  <main class="flex flex-col h-[100vh] w-full mx-auto">
    <RouterView class="grow" />
    <div class="flex h-12 w-full">
      <RouterLink to="/select-create" class="basis-0 grow flex flex-col items-center bg-gray-200">
        <span>➕</span>
        <span>新建</span>
      </RouterLink>
      <RouterLink to="/me" class="basis-0 grow flex flex-col items-center bg-gray-200">
        <span>🧑</span>
        <span>我的</span>
      </RouterLink>
    </div>
  </main>
</template>
