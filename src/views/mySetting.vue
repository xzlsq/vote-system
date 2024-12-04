<template>
    <div class="w-full">
        <h1 class="font-bold text-2xl flex items-center p-4">
            <RouterLink to="/me" class="ml-1 flex items-center">
                <el-icon class="relative top-px">
                    <ArrowLeftBold />
                </el-icon>
            </RouterLink>
            <span class="ml-4 relative top-px">个人设置</span>
        </h1>
        <div class="space-y-6">
            <div class="flex items-center justify-center h-[120px]">
                <img class="rounded-full w-20 h-20" src="https://dummyimage.com/64x64/000/fff" alt="">
            </div>
            <div class="flex items-center justify-between p-4 h-14 bg-white">
                <span>昵称</span>
                <span class="flex items-center gap-2">
                    {{ userName }}
                    <el-icon>
                        <ArrowRightBold />
                    </el-icon>
                </span>
            </div>

            <button @click="logout()"
                class="block mx-auto w-[90%] h-10 rounded-md border border-blue-500 text-blue-500">退出登入</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useVoteStore } from '@/stores/vote';
import axios from 'axios';
import { useRouter } from 'vue-router'
import { useLogin } from './hooks';

var isLogin = useLogin()

var router = useRouter()
var userStore = useVoteStore()
var userName = ref('')
if (isLogin) {
    userName.value = userStore.user.name
}

async function logout() {
    var res = await axios.get('/account/logout')
    // console.log(res)
    if (res.data.code == 0) {
        userStore.user = null
        router.replace('/')
    }
}

</script>
