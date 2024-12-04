<template>
    <h1 class="font-bold text-2xl flex items-center p-4 text-zinc-600">
        <RouterLink to="/" class="ml-1 flex items-center">
            <el-icon class="relative top-px">
                <ArrowLeftBold />
            </el-icon>
        </RouterLink>
        <span class="ml-4 relative top-px">腾讯投票</span>
    </h1>
    <div class="p-2 bg-gray-100 h-[100vh]">
        <div class="my-8 mx-4 relative">
            <h2 class="text-3xl mb-2">{{ voteInfo.vote.title }}</h2>
            <h3>{{ voteInfo.vote.desc }}<span class="text-sky-500">[{{ type }}]</span></h3>
            <button class="absolute top-0 right-0 bg-blue-500 flex items-center rounded-full p-3">
                <el-icon :size="24" color="white">
                    <Share />
                </el-icon>
            </button>
        </div>

        <ul class="space-y-2">
            <li class="px-4 relative h-12 flex items-center gap-4 bg-white shadow" v-for="(option, idx) of options"
                :key="idx">
                <span>{{ option.content }}</span>
                <span>✔️</span>
                <!-- <span class="grow"></span> -->
                <span class="ml-auto">4票</span>
                <span>27.3%</span>
                <div class="absolute bottom-0 h-[2px] bg-sky-500" :style="{ width: 20 + '%' }">
                </div>
            </li>
        </ul>
        <div class="flex justify-between items-center px-4 text-gray-400 h-12">
            <span>投票截止：{{ voteInfo.vote.deadline }}</span>
            <span>吐个槽</span>
        </div>

        <div @click="" class="flex justify-center">
            <button class="w-[90%] h-10 bg-sky-400 rounded-md text-white">提交</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router';

var route = useRoute()
var id = route.params.id

var res = await axios.get(`/vote/${id}`)
var voteInfo = reactive(res.data.result)
var options = voteInfo.options
var type = computed(() => voteInfo.vote.multiple == 0 ? '单选' : '多选')

</script>
