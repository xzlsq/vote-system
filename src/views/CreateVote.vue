<template>
    <div>创建{{ type }}投票</div>
    <el-input v-model="title" size="large" placeholder="投票标题" />
    <input type="text" class="border focus:ring-1 rounded outline-none m-2 text-lg" name="title" placeholder="投票标题">
    <input type="text" class="border focus:ring-1 rounded outline-none m-2" name="补充描述" placeholder="补充描述(选填)">
    <input type="text" class="border focus:ring-1 rounded outline-none m-2" name="title" placeholder="选项">
    <input type="text" class="border focus:ring-1 rounded outline-none m-2" name="补充描述" placeholder="选项">
    <button>添加选项</button>
    <div>
        截至日期
        <el-date-picker v-model="deadline" type="datetime" placeholder="Select date and time" />
    </div>
    <div>
        匿名投票
        <input type="checkbox" name="" id="">
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';

var deadline = ref(null)
var title = ref('')
var route = useRoute()
var type = computed(() => route.query.type == 'single' ? '单选' : '多选')

console.log(route.query.type)

</script>
