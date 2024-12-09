<script setup lang="ts">
import { useVoteStore } from '@/stores/vote';
var voteStore = useVoteStore()

// 请求结果获取到再加载页面
await voteStore.getUserInfo()

</script>

<template>
  <div class="h-[100vh] bg-gray-100">
    <RouterView />
  </div>
</template>
