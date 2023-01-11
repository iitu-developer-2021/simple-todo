import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { registerComponents } from './helpers/registerComponents'
import { loadPlugins } from './helpers/loadDependency'
import './style.css'
import App from './App.vue'

export const app = createApp(App)

registerComponents(app)
loadPlugins(['svgSpriteGenerator', 'toast'])

const pinia = createPinia()
app.use(router).use(pinia).mount('#app')
