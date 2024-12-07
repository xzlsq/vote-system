import './style.css'
// import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vant/lib/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Main from './Main.vue'
import router from './router'
import { NavBar } from 'vant';
import { Icon } from 'vant';

const app = createApp(Main)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(NavBar)
app.use(Icon)

app.mount('#app')
