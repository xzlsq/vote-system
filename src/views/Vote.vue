<template>
    <div>投票{{ id }}及显示界面</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';

var route = useRoute()
var id = route.params.id

</script>
