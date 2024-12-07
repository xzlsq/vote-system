<template>
    <div class="flex gap-1 mt-1 mx-4" :class="{ 'justify-between': showMoreIcon }">
        <img v-for="user of avatarsNum" class="align-top inline-block rounded-full border-gray-300 border shrink-0"
            src="" alt="" :width="imgW" :height="imgH">
        <el-icon v-if="showMoreIcon"
            class="align-top !w-8 !h-8 inline-block rounded-full border-gray-300 border shrink-0">
            <More />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps<{
    imgW?: string
    imgH?: string
    options: {
        [n: string]: any
    }
}>()
// 当前宽度可显示的头像数量

var showMoreIcon = ref(false)
var div = ref<any>(null)
var windowW = ref(window.innerWidth)
var imgW: number = Number(props.imgW) ?? 32
var imgH: number = Number(props.imgH) ?? 32
var avatarsNum = computed(() => {

    var avatars = []
    var n: number = Math.floor((windowW.value - 16) / (imgW + 4))
    for (var key in props.options) {
        avatars.push(props.options[key])
        n--
        if (n == 2) {
            showMoreIcon.value = true
            break
        } else if (n > 1) {
            showMoreIcon.value = false
        }
    }

    return avatars
})
var avatarDropdown = ref<boolean[]>(new Array())


</script>
