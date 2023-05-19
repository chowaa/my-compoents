import { createApp } from 'vue'
import './style.css'
import router from './router/index';
import 'element-plus/dist/index.css';
import App from './App.vue'
import ElementPlus from 'element-plus';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component[key as keyof typeof component]);
// }
app.use(ElementPlus);
app.use(router).mount('#app')
