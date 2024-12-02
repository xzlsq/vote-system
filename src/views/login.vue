<script setup lang="ts">
import { ref } from 'vue';

var userName = ref('')
var password = ref('')

</script>

<template>
    <div>
        <input type="text" v-model="userName">
        <input type="password" v-model="password">
        <button>登入</button>
    </div>
</template>
