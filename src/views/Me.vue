<template>
    <div class="w-full">
        <h1 class="text-2xl p-4">我的</h1>
        <div class="space-y-6">
            <div class="flex items-center gap-2 ml-4 h-[120px]">
                <img class="rounded-full" src="https://dummyimage.com/64x64/000/fff" alt="">
                <span>nisekoi</span>
            </div>
            <div class="flex flex-col divide-y">
                <RouterLink class="hover:bg-neutral-200 h-14 bg-white flex items-center p-4" to="/my-votes">
                    我的投票
                    <span class="ml-auto relative top-px">
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </RouterLink>
                <RouterLink class="hover:bg-neutral-200 h-14 bg-white flex items-center p-4" to="">
                    个人设置
                    <span class="ml-auto relative top-px">
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </RouterLink>
                <RouterLink class="hover:bg-neutral-200 h-14 bg-white flex items-center p-4" to="">
                    反馈建议
                    <span class="ml-auto relative top-px">
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
