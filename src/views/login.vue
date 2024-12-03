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
        console.log(user)
        router.replace(next)
    } catch (e) {
        alert('login failed')
    }
}

</script>

<template>
    <div class="flex flex-col">
        <input class="border" type="text" v-model="userName">
        <input class="border" type="password" v-model="password">
        <button @click="login">登入</button>
    </div>
</template>
