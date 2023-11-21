import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'

const app = createApp(App);

app.use(store);

app.handleError = (err) => {
  console.error(err);
};

app.mount('#app');
