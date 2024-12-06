import { onBeforeUnmount, onMounted, onUnmounted, ref, type Ref } from "vue"
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

var windowSize: any = ref({
    width: window.innerWidth,
    height: window.innerHeight,
})
var listened = false
function resetSize() {
    windowSize.value.width = window.innerWidth
    windowSize.value.height = window.innerHeight
}


export function useWindowSize() {

    // 防止事件重复绑定
    if (!listened) {
        onMounted(() => {
            window.addEventListener('resize', resetSize)
            listened = true
        })

        onUnmounted(() => {
            window.removeEventListener('resize', resetSize)
            listened = false
        })
    }

    return windowSize
}

function resetEleSize(e: any) {
    // console.log(e.target)
    windowSize.value.width = e.target.clientWidth
    windowSize.value.height = e.target.clientHeight
}

// vueUse中有一个useElementSize函数也可以实现该功能
export function useEleSize(eleDom: any, isAnony: boolean) {
    var voteStore = useVoteStore()
    // 使用ResizeObserver监控元素尺寸
    const resizeObserver = new ResizeObserver(entries => {
        // console.log(entries)
        resetEleSize(entries[0])
    });

    // 防止事件重复绑定
    if (!listened && isAnony && voteStore.user != null/* 一定要用户登入后才监听该元素的尺寸，因为登入后该元素才会挂载 */) {
        onMounted(() => {
            // console.log(eleDom.value[0])
            var ele = eleDom.value[0] ?? eleDom.value
            // console.log('ele=', ele)
            resizeObserver.observe(ele)
            listened = true
        })

        onBeforeUnmount(() => {
            // console.log(eleDom.value[0])
            var ele = eleDom.value[0] ?? eleDom.value
            resizeObserver.unobserve(ele)
            listened = false
        })
    }

    return windowSize
}

export async function useCopyToClipboard(text: string, status: Ref) {
    var res = ''
    await navigator.clipboard.writeText(text)
        .then(() => {
            status.value = true
            res = '复制成功'
        })
        .catch(err => {
            status.value = true
            res = '复制失败'
        });

    return res
}
