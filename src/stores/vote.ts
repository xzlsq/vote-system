import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

type UserInfo = {
  userId: number,
  name: string,
  avatar: string
}

export const useVoteStore = defineStore('vote', () => {
  const user = ref<null | UserInfo>(null)

  async function getUserInfo() {
    try {
      var userInfo = await axios.get('/account/current-user')
      user.value = userInfo.data.result
      // console.log(user.value)
    } catch (e: any) {
      if (e.isAxiosError) {
        console.log('user no login.')
      } else {
        throw e
      }
    }
  }


  return { user, getUserInfo }
})
