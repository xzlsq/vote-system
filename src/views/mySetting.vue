<template>
    <div class="w-full h-full" v-if="isLogin">
        <van-nav-bar class="!bg-gray-300" :title="'个人设置'" left-arrow @click-left="router.push('/me')" />
        <div class="h-full flex flex-col items-center gap-2">
            <div class="flex items-center justify-center h-[120px]">
                <img class="rounded-full w-20 h-20" :src="userStore.user?.avatar" alt="">
            </div>
            <Uploader :after-read="uploadAvatar">
                <Button icon="plus" type="primary">修改头像</Button>
            </Uploader>
            <div class="divide-y w-full">
                <div class="flex items-center justify-between p-4 h-14 bg-white">
                    <span>昵称</span>
                    <span class="flex items-center gap-2">
                        {{ userName }}
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </div>
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
import { Uploader, Button } from 'vant';

var isLogin = useLogin()

var router = useRouter()
var userStore = useVoteStore()
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

async function uploadAvatar(file: any) {
    // console.log(file.file)
    var fd = new FormData()
    fd.append('avatar', file.file)
    var urls = await fetch('/upload', {
        method: 'post',
        body: fd
    }).then(it => it.json())

    userStore.user!.avatar = urls[0]
}

</script>
