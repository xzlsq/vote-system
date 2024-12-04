import { ref } from "vue"
import { useVoteStore } from '@/stores/vote';
import { useRouter, useRoute } from 'vue-router'

export function useSelectOne() {
    var currentIdx = ref(-1)

    function setSelected(id: number) {
        if (currentIdx.value == id) {
            currentIdx.value = -1
        } else {
            currentIdx.value = id
        }
    }

    return [currentIdx, setSelected] as const
}

export function useLogin() {
    var router = useRouter()
    var route = useRoute()
    var voteStore = useVoteStore()

    // console.log('useLogin voteStore', voteStore.user)
    if (voteStore.user == null) {
        // 使用push需要连续点两次返回才能回到进入createVote之前的页面
        // 如果点慢了则会再次进入login页面，因此用replace，覆盖createVote的浏览记录
        // console.log(route)
        router.replace('/login?next=' + route.fullPath)
        return false
    }

    return true
}

// export type VoteInfo = {
//     userId: string,
//     voteId: number,
//     title: string,
//     desc: string,
//     deadline: string,
//     anonymous: number | boolean,
//     multiple: number | boolean
// }
