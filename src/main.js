import './app.css'
import App from './App.svelte'
import { initTheme } from './lib/stores.js'

// Initialize theme on load
initTheme()

const app = new App({
  target: document.getElementById('app'),
})

export default app
