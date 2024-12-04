<template>
    <div class="w-full">
        <h1 class="text-2xl p-4">我的</h1>
        <div class="space-y-6">
            <div class="flex items-center gap-2 ml-4 h-[120px]">
                <img class="rounded-full" width="64" height="64" src="https://dummyimage.com/64x64/000/fff" alt="">
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
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </RouterLink>
                <RouterLink class="hover:bg-neutral-200 h-14 bg-white flex items-center p-4" to="">
                    反馈建议
                    <span class="ml-auto relative top-px">
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote';
import { useRouter } from 'vue-router'
import { useLogin } from './hooks';
import { ref } from 'vue';

var router = useRouter()
var userStore = useVoteStore()

var isLogin = useLogin()

var userName = ref('')
if (isLogin) {
    userName = userStore.user.name
}



</script>
