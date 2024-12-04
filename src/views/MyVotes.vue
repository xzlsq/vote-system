<template>
    <div>
        <h1 class="font-bold text-2xl flex items-center p-4">
            <RouterLink to="/me" class="ml-1 flex items-center">
                <el-icon class="relative top-px">
                    <ArrowLeftBold />
                </el-icon>
            </RouterLink>
            <span class="ml-4 relative top-px">我的投票列表</span>
        </h1>
        <div class="pt-2 divide-y  mb-14">
            <div @click="set(vote.voteId)" class="divide-y" v-for="vote of myVotes" :key="vote.voteId">
                <div class="hover:bg-neutral-200 h-14 bg-white flex items-center justify-between p-4">
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
                    <RouterLink to=""
                        class="hover:bg-neutral-200 basic-0 grow h-14 flex flex-col items-center justify-center">
                        <span>
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </span>
                        编辑
                    </RouterLink>
                    <RouterLink :to="'/vote/' + vote.voteId"
                        class="hover:bg-neutral-200 basic-0 grow h-14 flex flex-col items-center justify-center">
                        <span>
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </span>
                        查看
                    </RouterLink>
                    <RouterLink to=""
                        class="hover:bg-neutral-200 basic-0 grow h-14 flex flex-col items-center justify-center">
                        <span>
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </span>
                        分享
                    </RouterLink>
                    <RouterLink to=""
                        class="hover:bg-neutral-200 basic-0 grow h-14 flex flex-col items-center justify-center">
                        <span>
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </span>
                        删除
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useLogin, useSelectOne } from './hooks';
import { useVoteStore } from '@/stores/vote';

var isLogin = useLogin()

var voteStore = useVoteStore()
var res = null
var myVotes = ref([])
if (isLogin) {
    res = await axios.get('/vote')
    myVotes.value = res.data.result
}
var [currentIdx, set] = useSelectOne()

</script>
