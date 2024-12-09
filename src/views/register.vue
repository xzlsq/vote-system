<template>
    <div>
        <van-nav-bar class="!bg-gray-300" :title="'注册'" />
        <div class="flex flex-col items-center p-4 space-y-4">
            <input class="w-full h-12 px-1 border rounded" type="text" v-model="name" placeholder="请输入用户名(必填)">
            <input class="w-full h-12 px-1 border rounded" type="password" v-model="password" placeholder="请输入密码(必填)">
            <input class="w-full h-12 px-1 border rounded" type="password" @input="doubleCheck" v-model="password2"
                placeholder="请输入确认密码(必填)">
            <input class="w-full h-12 px-1 border rounded" type="email" v-model="email" placeholder="请输入邮箱(必填)">
            <!-- <input type="file" ref="ref1"> -->
            <Uploader v-model="avatar" :after-read="uploadAvatar" class="mr-auto">
                <Button icon="plus" type="primary">上传头像</Button>
            </Uploader>
            <button @click="register" class="block mx-auto w-[90%] h-10 rounded-md border border-blue-500 text-blue-500"
                :disabled="avatarUrl == ''">注册</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { Uploader, Button, showToast } from 'vant';
import { useRouter } from 'vue-router';

var avatar = ref<object[]>([])
var name = ref('')
var password = ref('')
var password2 = ref('')
var email = ref('')
var avatarUrl = ref('')
var timerId = ref(-1)
var router = useRouter()

async function uploadAvatar(file: any) {
    // console.log(file.file)
    var fd = new FormData()
    fd.append('avatar', file.file)
    var urls = await fetch('/upload', {
        method: 'post',
        body: fd
    }).then(it => it.json())

    avatarUrl.value = urls[0]
}


function doubleCheck() {
    clearTimeout(timerId.value)

    timerId.value = setTimeout(() => {
        if (password.value !== password2.value) {
            showToast('确认密码不正确')
        }
    }, 500)

}

function register() {
    if (!name.value) {
        showToast('用户名不能为空')
        return
    } else if (!password.value) {
        showToast('密码不能为空')
        return
    } else if (!email.value) {
        showToast('邮箱不能为空')
        return
    }

    axios.post('/account/register', {
        name: name.value,
        password: password.value,
        email: email.value,
        avatar: avatarUrl.value
    }).then((res) => {
        if (res.data.code == 0) {
            router.replace('/login')
        }
    }).catch(() => {
        showToast('注册失败，请重试')
    })
}

</script>
