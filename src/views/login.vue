<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useVoteStore } from '@/stores/vote';


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
        alert('login failed')
    }
}

</script>

<template>
    <h1 class="text-2xl flex items-center p-4">
        <RouterLink to="/" class="ml-1 flex items-center">
            <el-icon class="relative top-px">
                <ArrowLeftBold />
            </el-icon>
        </RouterLink>
        <span class="ml-4 relative top-px">登入</span>
    </h1>
    <div class="flex flex-col p-4 space-y-4">
        <input class="border h-8 outline-none rounded border-gray-400 px-2" type="text" v-model="userName"
            placeholder="用户名">
        <input class="border h-8 outline-none rounded border-gray-400 px-2" type="password" v-model="password"
            placeholder="密码">
        <button @click="login()"
            class="block mx-auto w-[90%] h-10 rounded-md border border-blue-500 text-blue-500">登入</button>
    </div>
</template>
