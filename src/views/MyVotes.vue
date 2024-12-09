<template>
    <div v-if="isLogin" class="h-full">
        <van-nav-bar class="!bg-gray-300" :title="'我的投票列表'" left-arrow @click-left="router.push('/me')" />
        <div class="pt-2 divide-y  mb-14">
            <div class="divide-y" v-for="(vote, idx) of myVotes" :key="vote.voteId">
                <div @click="set(vote.voteId)"
                    class="hover:bg-neutral-200 h-14 bg-white flex items-center justify-between p-4">
                    <span>{{ vote.title }}</span>
                    <span :class="{ hidden: currentIdx == vote.voteId }">
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                    <span :class="{ hidden: currentIdx != vote.voteId }">
                        <el-icon>
                            <ArrowDownBold />
                        </el-icon>
                    </span>
                </div>
                <div class="flex items-center divide-x" :class="{ hidden: currentIdx != vote.voteId }">
                    <RouterLink :to="'/vote/' + vote.voteId"
                        class="hover:bg-neutral-200 basic-0 grow h-14 flex flex-col items-center justify-center">
                        <span>
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </span>
                        查看
                    </RouterLink>
                    <button @click="() => {
                        showShare = true
                        shareVoteId = vote.voteId
                    }" class="hover:bg-neutral-200 basic-0 grow h-14 flex flex-col items-center justify-center">
                        <span>
                            <van-icon name="share-o" />
                        </span>
                        分享
                    </button>
                    <ActionSheet v-model:show="showShare" :actions="actions" @select="onShareVote" description="分享到...">
                    </ActionSheet>
                    <button @click="deleteVote(vote.voteId, idx, vote.title)"
                        class="hover:bg-neutral-200 basic-0 grow h-14 flex flex-col items-center justify-center">
                        <span>
                            <van-icon name="delete-o" />
                        </span>
                        删除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useLogin, useSelectOne } from './hooks';
import { useRouter } from 'vue-router';
import { ActionSheet, type ActionSheetAction, showToast, showConfirmDialog } from 'vant';
import copy from 'copy-to-clipboard';
// import $$T from '@/locales/zh-CN.js'

type VoteInfo = {
    userId: string,
    voteId: number,
    title: string,
    desc: string,
    deadline: string,
    anonymous: number | boolean,
    multiple: number | boolean
}

var isLogin = useLogin()

var res = null
var myVotes = ref<VoteInfo[]>([])
if (isLogin) {
    res = await axios.get('/vote')
    myVotes.value = res.data.result
}
var router = useRouter()
var [currentIdx, set] = useSelectOne()

// 分享组件的显示状态
var showShare = ref(false)
const actions = [
    { name: '复制链接' },
    { name: '分享到朋友圈' },   // 在微信中开发使用微信的API才能使用
    { name: '发送给朋友' }, // 在微信中开发使用微信的API才能使用
];
// 要分享的投票Id
var shareVoteId = ref(-1)
/**
 * 分享投票事件处理函数
 * navigator.share() 在https环境下可以使用该方法进行分享
 * @param item 
 * @param index 
 */
async function onShareVote(item: ActionSheetAction, index: number) {
    if (item.name == '复制链接') {
        copy(location.origin + `/#/vote/${shareVoteId.value}`)
        showToast('复制成功');
    } else if (item.name == '分享到朋友圈') {
        // 开发微信小程序时使用微信提供的API
    } else if (item.name == '发送给朋友') {
        // 开发微信小程序时使用微信提供的API
    }
    showShare.value = false
}

async function deleteVote(voteId: number, idx: number, title: string) {
    try {
        await showConfirmDialog({
            message: `确定要删除"${title}"吗？`,
        })

        await axios.delete(`/vote/${voteId}`)
        myVotes.value.splice(idx, 1)
        showToast('删除成功');
    } catch { }
}

</script>
