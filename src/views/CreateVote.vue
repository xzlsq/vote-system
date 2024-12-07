<template>
    <div>
        <h1 class="font-bold text-2xl flex items-center p-4">
            <RouterLink to="/" class="ml-1 flex items-center">
                <el-icon class="relative top-px">
                    <ArrowLeftBold />
                </el-icon>
            </RouterLink>
            <span class="ml-4 relative top-px">创建{{ type }}投票</span>
        </h1>
        <div class="p-2 overflow-auto">
            <div class="bg-white space-y-3 overflow-auto">
                <div class="flex flex-col pr-1 ml-1">
                    <input type="text" v-model="title" class="w-full border-b rounded outline-none my-1 p-1 text-2xl"
                        name="title" placeholder="投票标题">
                    <input type="text" v-model="desc" class="w-full border-b rounded outline-none my-1 p-1" name=""
                        placeholder="补充描述(选填)">
                </div>
                <div v-for="(option, idx) of options" class="flex items-center ml-1" :key="idx">
                    <span @click="deleteOption(idx)"
                        class="cursor-pointer w-5 h-5 flex items-center text-white justify-center bg-red-500 rounded-full shrink-0">
                        <el-icon :size="14" color="#ffffff">
                            <Minus />
                        </el-icon>
                    </span>
                    <input type="text" v-model="options[idx]" class="w-full border rounded outline-none m-1 p-1"
                        placeholder="选项">
                </div>
                <button @click="addOption" class="flex gap-2 items-center ml-1">
                    <span
                        class="cursor-pointer w-5 h-5 flex items-center text-white justify-center bg-sky-500 rounded-full shrink-0">
                        <el-icon :size="14" color="#ffffff">
                            <Plus />
                        </el-icon>
                    </span>
                    <span class="my-1 text-sky-500">添加选项</span>
                </button>
            </div>

            <div class="divide-y my-4 px-1 bg-white overflow-auto">
                <div class="flex items-center justify-between h-12">
                    <h1>截至日期</h1>
                    <!-- <input type="date"> -->
                    <button @click="showBottom = !showBottom">选择日期</button>
                    <Popup v-model:show="showBottom" position="bottom" :style="{ height: '30%' }">
                        <DatePicker></DatePicker>
                    </Popup>
                </div>
                <div class="flex items-center justify-between h-12">
                    <h1>匿名投票</h1>
                    <el-switch v-model="anonymous" size="large" />
                </div>
                <div class="flex items-center justify-between h-12 hidden">
                    <h1>限制传播</h1>
                    <el-switch v-model="spread" size="large" />
                </div>
            </div>

            <div @click="create" class="w-full flex justify-center">
                <button class="w-[90%] h-10 bg-sky-400 rounded-md text-white">完成</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useVoteStore } from '@/stores/vote';
import axios from 'axios';
import { useLogin } from './hooks';
import { DatePicker } from 'vant';
import { Popup } from 'vant';

var voteStore = useVoteStore()
var router = useRouter()
var route = useRoute()
var type = computed(() => route.query.type == 'single' ? '单选' : '多选')
var showBottom = ref(true)

useLogin()

var multiple = type.value == '多选'
var title = ref('')
var desc = ref('')
var options = ref(['', ''])
var deadline = ref(new Date(Date.now() + 86400000 * 7))
var anonymous = ref(false)
var spread = ref(false)

function addOption() {
    options.value.push('')
}

function deleteOption(idx: number) {
    options.value.splice(idx, 1)
}

async function create() {
    // debugger
    var voteInfo = {
        title: title.value,
        desc: desc.value,
        deadline: deadline.value,
        anonymous: anonymous.value,
        multiple,
        options: options.value,
    }

    try {
        var res = await axios.post('/vote', voteInfo)
        console.log(res)
        if (res.data.code == 0) {
            var id = res.data.result.voteId
            router.replace('/vote/' + id)
        } else {
            // 因为无权限创建投票导致的失败则清空登入记录，并回到登入界面
            voteStore.user = null
            router.replace('/login?next=' + route.fullPath)
        }
    } catch (e) {
        alert('登入失败，请重试')
    }
}

</script>
