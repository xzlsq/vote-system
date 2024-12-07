<template>
    <div v-if="isLogin" class="h-full">
        <h1 class="font-bold text-2xl flex items-center p-4">
            <RouterLink to="/me" class="ml-1 flex items-center">
                <el-icon class="relative top-px">
                    <ArrowLeftBold />
                </el-icon>
            </RouterLink>
            <span class="ml-4 relative top-px">我的投票列表</span>
        </h1>
        <div class="pt-2 divide-y  mb-14">
            <div class="divide-y" v-for="vote of myVotes" :key="vote.voteId">
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
                    <button @click="copytoClipboard()"
                        class="hover:bg-neutral-200 basic-0 grow h-14 flex flex-col items-center justify-center">
                        <span>
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </span>
                        分享
                    </button>
                    <button @click="deleteVote(vote.voteId)"
                        class="hover:bg-neutral-200 basic-0 grow h-14 flex flex-col items-center justify-center">
                        <span>
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </span>
                        删除
                    </button>
                </div>
            </div>
        </div>
        <div v-if="copyStatus"
            class="rounded bg-cyan-50 flex items-center justify-center p-2 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {{ copyRes }}
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useCopyToClipboard, useLogin, useSelectOne } from './hooks';

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
var [currentIdx, set] = useSelectOne()
var copyStatus = ref(false)
var copyRes = ref('')
var urlForCopy = ref(location.href)

async function copytoClipboard() {
    var res = await useCopyToClipboard(urlForCopy.value)
    copyStatus.value = true
    copyRes.value = res
    setTimeout(() => {
        copyStatus.value = false
    }, 800)
}

function deleteVote(voteId: number) {
    axios.delete(`/vote/${voteId}`)
        .then(() => {
            // debugger
            var idx = myVotes.value.findIndex((vote: any) => vote.voteId == voteId)
            myVotes.value.splice(idx, 1)
        }, (rej) => {
            console.log(rej)
        })
}

</script>
