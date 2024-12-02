<template>
    <div class="grow flex flex-col gap-1 w-[80%] mx-auto mt-[100px]">
        <RouterLink to="/create?type=single"
            class="flex flex-col block w-full h-48 bg-gray-300 items-center justify-center">
            <span class="text-[80px]">📚</span>
            <span class="px-10 py-2 bg-sky-500 text-white rounded">创建单选</span>
        </RouterLink>
        <RouterLink to="/create?type=multiple"
            class="flex flex-col block w-full h-48 bg-gray-300 items-center justify-center">
            <span class="text-[80px]">📚</span>
            <span class="px-10 py-2 bg-sky-500 text-white rounded">创建多选</span>
        </RouterLink>
    </div>
</template>
