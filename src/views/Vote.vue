<template>
    <div v-if="isLogin">
        <van-nav-bar class="!bg-gray-300" :title="'腾讯投票'" left-arrow @click-left="router.push('/my-votes')" />
        <div class="p-2 bg-gray-100">
            <div class="my-8 mx-4 relative">
                <h2 class="text-3xl mb-2">{{ voteInfo.vote.title }}</h2>
                <h3>{{ voteInfo.vote.desc }}<span class="text-sky-500">[{{ type }}]</span></h3>
                <button @click="showShare = !showShare"
                    class="absolute top-0 right-0 bg-blue-500 flex items-center rounded-full p-3">
                    <el-icon :size="24" color="white">
                        <Share />
                    </el-icon>
                </button>
            </div>
            <ActionSheet v-model:show="showShare" :actions="actions" @select="onShareVote" description="分享到...">
            </ActionSheet>
            <ul class="space-y-2">
                <li class="" v-for="(option, idx) of options" :key="idx">
                    <div @click="handleOptionClick(option.optionId)" class="h-12 px-4 shadow bg-white">
                        <div class="cursor-pointer relative flex items-center gap-4 h-12">
                            <span>{{ option.content }}</span>
                            <span v-if="isVoting && lastClickOptionId == option.optionId" class="flex items-center">
                                <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                            </span>
                            <span v-else>{{ hadSelected[option.optionId] ?
                                '✔️' : '' }}</span>
                            <span class="ml-auto">{{ OptionVotes[option.optionId].length }} 票</span>
                            <span class="w-[60px] text-right">{{ votesRatio[option.optionId] }}</span>
                            <div class="absolute bottom-0 h-[2px] bg-sky-500 transition-all duration-500"
                                :style="{ width: votesRatio[option.optionId] }">
                            </div>
                        </div>
                    </div>
                    <div v-if="!voteInfo.vote.anonymous" ref="avatar" class="flex gap-1 mt-1 mx-4" :class="{
                        'flex-wrap': showMoreIcon(option.optionId) && showRestAvatar[idx],
                        'justify-between': showMoreIcon(option.optionId) && !showRestAvatar[idx]
                    }">
                        <img v-for="user of visibleAvatars(idx)"
                            class="align-top inline-block rounded-full w-8 h-8 border-gray-300 border shrink-0"
                            :src="user.avatar" alt="">
                        <el-icon v-if="showMoreIcon(option.optionId)"
                            @click="showRestAvatar[idx] = !showRestAvatar[idx]"
                            class="align-top !w-8 !h-8 inline-block rounded-full border-gray-300 border shrink-0">
                            <More />
                        </el-icon>
                    </div>
                </li>
            </ul>
            <div class="flex justify-between items-center text-gray-400 h-12">
                <span>投票截止：{{ new Date(voteInfo.vote.deadline).toLocaleString() }}</span>
            </div>

            <button v-if="showCommitButton" @click="handledAnonymousSubmit()"
                :disabled="anonymousSelectedOptions.length == 0"
                class="disabled:bg-gray-500 block w-[90%] h-10 bg-sky-400 rounded-md text-white m-auto">提交</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote';
import axios from 'axios';
import { computed, onMounted, ref, useTemplateRef, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useEleSize, useLogin } from './hooks';
import { ActionSheet, type ActionSheetAction, showToast } from 'vant';
import copy from 'copy-to-clipboard';

var isLogin = useLogin()

var route = useRoute()
var router = useRouter()
var voteStore = useVoteStore()
var id = route.params.id

var res = await axios.get(`/vote/${id}`)
var voteInfo = ref(res.data.result)
var options = voteInfo.value.options
var type = computed(() => voteInfo.value.vote.multiple == 0 ? '单选' : '多选')
// [55, 56, 57]
var anonymousSelectedOptions = ref<number[]>([])

/**
 * 实名投票时，是否处于等待投票结果的状态(发送投票请求)
 * false: 收到请求结果
 * true: 请求中
 */
var isVoting = ref(false)
// 点击选项时，该选项的ID，用于显示Loading
var lastClickOptionId = ref(-1)

// 每个选项的票数 {53: [xxx, yyy, zzz], 54:[aaa, bbb, ccc], ...}
var OptionVotes = computed(() => {
    var allOptionCnt: any = {}

    for (let option of options) {
        // 过滤出 票Id等于 选项Id 的票数
        allOptionCnt[option.optionId] = voteInfo.value.userVotes.filter((vote: any) => vote.optionId == option.optionId)
    }

    // console.log(allOptionCnt)
    return allOptionCnt
})
// 每个选项的比例 {53: 66%, 54: 23.3%, ...}
var votesRatio = computed(() => {
    var totalUsers = new Set(voteInfo.value.userVotes.map((it: any) => it.userId)).size

    var ratio: any = {}

    for (var optionId in OptionVotes.value) {
        if (totalUsers >= 1) {
            ratio[optionId] = (OptionVotes.value[optionId].length / totalUsers * 100).toFixed(1) + '%'
            if (ratio[optionId].at(-2) == '0') {
                ratio[optionId] = ratio[optionId].slice(0, -3) + '%'
            }
        } else {
            ratio[optionId] = '0%'
        }
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
    if (!voteInfo.value.vote.anonymous) {
        return false
    }

    // 该投票过期了不显示
    var now = new Date().toISOString()
    if (now > voteInfo.value.vote.deadline) {
        return false
    }

    // 匿名用户投过了不显示
    if (voteInfo.value.vote.anonymous && Object.values(isCurrentUserSelected.value).some((it: any) => it)) {
        return false
    }

    return true
})
// 判断该选项是否被当前用户选中，选中了则在对应UI上✔
var hadSelected = computed(() => {
    if (voteInfo.value.vote.anonymous && showCommitButton.value) {
        // console.log('anonymous')
        // 匿名投票且还未提交投票结果时走这里
        var res: any = {}
        for (var id of anonymousSelectedOptions.value) {
            res[id] = true
        }
        return res
    } else {
        return isCurrentUserSelected.value
    }
})

var imgW: number = 32
var avatarDom = useTemplateRef('avatar')
// 获取显示头像的元素的尺寸(通过该元素的尺寸决定显示多少头像)
var size = useEleSize(avatarDom, !voteInfo.value.vote.anonymous)
var avatarsNum = computed(() => {
    var n: number = Math.floor((size.value.width + 4) / imgW)
    return n - 1
})
var showRestAvatar = ref<boolean[]>(new Array(options.length).fill(false))
// 是否要显示 more 图标
function showMoreIcon(optionId: number) {
    if (OptionVotes.value[optionId].length > avatarsNum.value) {
        return true
    } else {
        return false
    }
}
// 第idx个选项下显示的头像
function visibleAvatars(optionIdx: number) {
    var { optionId } = options[optionIdx]
    if (showRestAvatar.value[optionIdx]) {
        return OptionVotes.value[optionId]
    } else {
        return OptionVotes.value[optionId].slice(0, avatarsNum.value)
    }
}

// 分享组件的显示状态
var showShare = ref(false)
const actions = [
    { name: '复制链接' },
    { name: '分享到朋友圈' },   // 在微信中开发使用微信的API才能使用
    { name: '发送给朋友' }, // 在微信中开发使用微信的API才能使用
];
/**
 * 分享投票事件处理函数
 * navigator.share() 在HTTPS环境下可以选择使用
 * @param item 
 * @param index 
 */
async function onShareVote(item: ActionSheetAction, index: number) {
    if (item.name == '复制链接') {
        copy(location.href)
        showToast('复制成功');
    } else if (item.name == '分享到朋友圈') {
        // 开发微信小程序时使用微信提供的API
    } else if (item.name == '发送给朋友') {
        // 开发微信小程序时使用微信提供的API
    }
    showShare.value = false
}



async function handleOptionClick(optionId: number) {
    try {
        // 非匿名，则直接发起请求
        if (!voteInfo.value.vote.anonymous) {
            lastClickOptionId.value = optionId
            isVoting.value = true
            let res = await axios.post(`/vote/${voteInfo.value.vote.voteId}`, {
                optionIds: [optionId]
            })
            voteInfo.value = res.data.result
            isVoting.value = false
        } else if (showCommitButton.value) {
            // 匿名的话，则点击只选择该项，点提交才发送请求，且不可重复发送请求
            let idx = -1
            if (!voteInfo.value.vote.multiple) {
                anonymousSelectedOptions.value[0] = optionId
            } else if ((idx = anonymousSelectedOptions.value.indexOf(optionId)) != -1) {
                anonymousSelectedOptions.value.splice(idx, 1)
            } else {
                anonymousSelectedOptions.value.push(optionId)
            }
            // console.log(anonymousSelectedOptions.value)
        } else {
            alert('已经投过就不能再投咯^_^')
        }
    } catch (e: any) {
        if (e.isAxiosError) {
            console.log('该投票已过期或已经投过')
            isVoting.value = false
        } else {
            throw e
        }
    }
}

async function handledAnonymousSubmit() {
    try {
        let res = await axios.post(`/vote/${voteInfo.value.vote.voteId}`, {
            optionIds: anonymousSelectedOptions.value
        })
        voteInfo.value = res.data.result
    } catch (e: any) {
        if (e.isAxiosError) {
            console.log('该投票已过期或已经投过')
        } else {
            throw e
        }
    }
}

// 组件挂载后建立webSoket连接
onMounted(() => {
    var ws = new WebSocket(`ws://${location.host}/realtime-voteinfo/${id}`)

    ws.onmessage = (e) => {
        var userVotes = JSON.parse(e.data)

        // 收到新的投票结果后替换旧的投票结果
        voteInfo.value.userVotes = userVotes
    }
    // 组件卸载后断开webSoket连接
    onUnmounted(() => {
        ws.close()
    })
})

</script>
