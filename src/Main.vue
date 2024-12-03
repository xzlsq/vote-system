<script setup>
import App from './App.vue';
</script>

<template>
    <Suspense>
        <template #fallback>
            Loading...
        </template>
        <App></App>
    </Suspense>
</template>
