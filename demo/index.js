import { createApp } from "vue";
import SlideUpDown from "./package";
import App from "./App.vue";

const app = createApp(App);

app.component("slide-up-down", SlideUpDown);
app.mount("#app");
