<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useVoteStore } from '@/stores/vote';
import { showToast } from 'vant';


var userName = ref('')
var password = ref('')
var userStore = useVoteStore()

var route = useRoute()
var router = useRouter()
var next = (route.query.next ?? '/') as string

async function login() {
    try {
        var user = await axios.post('/account/login', {
            name: userName.value,
            password: password.value
        })

        userStore.user = user.data.result
        // console.log(userStore.user)
        router.replace(next)
    } catch (e) {
        showToast('用户名或密码错误')
    }
}

</script>

<template>
    <van-nav-bar class="!bg-gray-300" :title="'登入'" />
    <div class="flex flex-col p-4 space-y-4">
        <input class="border h-8 outline-none rounded border-gray-400 px-2" type="text" v-model="userName"
            placeholder="用户名">
        <input class="border h-8 outline-none rounded border-gray-400 px-2" type="password" v-model="password"
            placeholder="密码">
        <button @click="login()"
            class="block mx-auto w-[90%] h-10 rounded-md border border-blue-500 text-blue-500">登入</button>
        <router-link
            class="mx-auto w-[90%] flex items-center justify-center h-10 rounded-md border border-blue-500 text-blue-500"
            to="/register">注册</router-link>
    </div>
</template>
