<template>
    <div>
        <van-nav-bar class="!bg-gray-300" :title="'投票系统'" />
        <div class="grow flex flex-col gap-5 w-full mx-auto p-2">
            <RouterLink to="/create?type=single"
                class="flex flex-col block w-full h-48 bg-white items-center justify-center">
                <span class="text-[80px]">📚</span>
                <span class="px-10 py-2 bg-sky-500 text-white rounded">创建单选</span>
            </RouterLink>
            <RouterLink to="/create?type=multiple"
                class="flex flex-col block w-full h-48 bg-white items-center justify-center">
                <span class="text-[80px]">📚</span>
                <span class="px-10 py-2 bg-sky-500 text-white rounded">创建多选</span>
            </RouterLink>
        </div>
    </div>
</template>
