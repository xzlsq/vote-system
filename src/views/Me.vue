<template>
    <div class="w-full" v-if="isLogin">
        <van-nav-bar class="!bg-gray-300" :title="'我的'" />
        <div class="space-y">
            <div class="flex items-center gap-2 ml-4 h-[120px]">
                <img class="rounded-full w-[64px] h-[64px]" :src="userStore.user?.avatar" alt="">
                <span>{{ userName }}</span>
            </div>
            <div class="flex flex-col divide-y">
                <RouterLink class="hover:bg-neutral-200 h-14 bg-white flex items-center p-4" to="/my-votes">
                    我的投票
                    <span class="ml-auto relative top-px">
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </RouterLink>
                <RouterLink class="hover:bg-neutral-200 h-14 bg-white flex items-center p-4" to="/mySetting">
                    个人设置
                    <span class="ml-auto relative top-px">
                        <van-icon name="setting" />
                    </span>
                </RouterLink>
                <button @click="logout()" class="hover:bg-neutral-200 h-14 bg-white flex items-center p-4">退出登入
                    <span class="ml-auto relative top-px">
                        <van-icon name="cross" />
                    </span>
                </button>
                <!-- <RouterLink class="hover:bg-neutral-200 h-14 bg-white flex items-center p-4" to="">
                    反馈建议
                    <span class="ml-auto relative top-px">
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </RouterLink> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote';
import { useLogin } from './hooks';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

var userStore = useVoteStore()
var router = useRouter()
var isLogin = useLogin()

var userName = ref('')
if (isLogin && userStore.user) {
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
