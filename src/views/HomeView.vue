<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';
import { useVoteStore } from '@/stores/vote';

var router = useRouter()
var voteStore = useVoteStore()

onMounted(async () => {
  // debugger
  // try {
  //   var user = await axios.get('/account/current-user')
  //   voteStore.setUser(user)
  //   console.log('a', a)
  // } catch (e) {

  // }
})

</script>

<template>
  <main class="flex flex-col h-[100vh] w-full mx-auto">
    <RouterView class="grow" />
    <div class="flex h-12 w-full">
      <RouterLink to="/select-create"
        class="[&.router-link-active]:text-green-500 basis-0 grow flex flex-col items-center bg-gray-200">
        <span>➕</span>
        <span>新建</span>
      </RouterLink>
      <RouterLink to="/me"
        class="[&.router-link-active]:text-green-500 basis-0 grow flex flex-col items-center bg-gray-200">
        <span>🧑</span>
        <span>我的</span>
      </RouterLink>
    </div>
  </main>
</template>
