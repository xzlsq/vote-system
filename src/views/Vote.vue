<template>
    <div>
        <h1 class="font-bold text-2xl flex items-center p-4">
            <button @click="router.go(-1)" class="ml-1 flex items-center">
                <el-icon class="relative top-px">
                    <ArrowLeftBold />
                </el-icon>
            </button>
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
                <li @click="handleOptionClick(option.optionId)"
                    class="cursor-pointer px-4 relative h-12 flex items-center gap-4 bg-white shadow"
                    v-for="(option, idx) of options" :key="idx">
                    <span>{{ option.content }}</span>
                    <span>{{ isCurrentUserSelected[option.optionId] ? '✔️' : '' }}</span>
                    <!-- <span class="grow"></span> -->
                    <span class="ml-auto">{{
                        OptionVotes[option.optionId].length
                    }}票</span>
                    <span>{{ votesRatio[option.optionId] }}</span>
                    <div class="absolute bottom-0 h-[2px] bg-sky-500" :style="{ width: votesRatio[option.optionId] }">
                    </div>
                </li>
            </ul>
            <div class="flex justify-between items-center text-gray-400 h-12">
                <span>投票截止：{{ voteInfo.vote.deadline }}</span>
                <!-- <span>吐个槽</span> -->
            </div>

            <div v-if="showCommitButton" @click="" class="flex justify-center">
                <button class="w-[90%] h-10 bg-sky-400 rounded-md text-white">提交</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote';
import axios from 'axios';
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';

var route = useRoute()
var router = useRouter()
var voteStore = useVoteStore()
var id = route.params.id

var res = await axios.get(`/vote/${id}`)
var voteInfo = reactive(res.data.result)
var options = voteInfo.options
var type = computed(() => voteInfo.vote.multiple == 0 ? '单选' : '多选')

// 每个选项的票数 {53: [xxx, yyy, zzz], 54:[aaa, bbb, ccc], ...}
var OptionVotes = computed(() => {
    var allOptionCnt: any = {}

    for (let option of options) {
        // 过滤出 票Id等于 选项Id 的票数
        allOptionCnt[option.optionId] = voteInfo.userVotes.filter((vote: any) => vote.optionId == option.optionId)
    }
    return allOptionCnt
})
// 每个选项的比例 {53: 66%, 54: 23.3%, ...}
var votesRatio = computed(() => {
    var totalUsers = new Set(voteInfo.userVotes.map((it: any) => it.userId)).size

    var ratio: any = {}

    for (var optionId in OptionVotes.value) {
        ratio[optionId] = (OptionVotes.value[optionId].length / totalUsers * 100).toFixed(1) + '%'
    }

    return ratio
})
// 每个选是否被当前登入的用户选中 {53: true, 54: false, ...}
var isCurrentUserSelected = computed(() => {
    var currentSelected: any = {}

    // for (var [optionId, userVotes] of Object.entries(OptionVotes.value)) {

    // }

    for (var optionId in OptionVotes.value) {
        if (voteStore.user) {
            currentSelected[optionId] =
                OptionVotes.value[optionId].some((it: any) => it.userId == voteStore.user?.userId)
        } else {
            currentSelected[optionId] = false
        }
    }

    return currentSelected
})
// 判断是否展示提交按钮
var showCommitButton = computed(() => {
    // 非匿名投票不显示
    if (!voteInfo.vote.anonymous) {
        return false
    }

    // 该投票过期了不显示
    var now = new Date().toISOString()
    if (now > voteInfo.vote.deadline) {
        return false
    }

    // 匿名用户投过了不显示
    if (voteInfo.vote.anonymous && Object.values(isCurrentUserSelected.value).some((it: any) => it.userId == voteStore.user?.userId)) {
        return false
    }

    return true
})

async function handleOptionClick(optionId: number) {
    // 非匿名，则直接发起请求
    if (!voteInfo.vote.anonymous) {
        try {
            await axios.post(`/vote/${voteInfo.vote.voteId}`, {
                optionIds: [optionId]
            })
        } catch (e: any) {
            if (e.isAxiosError) {
                console.log('该投票已过期')
            } else {
                throw e
            }
        }

    } else {    // 匿名的话，则点击只选择该项，点提交才发送请求，且不可重复发送请求

    }
}


</script>
