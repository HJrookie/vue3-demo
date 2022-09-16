import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/styles/index.scss"; // global css
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import SvgIcon from "@/components/SvgIcon/index.vue"; // svg component
import "virtual:svg-icons-register";

const app = createApp(App);
app.component("svg-icon", SvgIcon);

// const res = import.meta.globEager("./assets/icons/svg/*.svg");
// for (const [key, component] of Object.entries(res)) {
//   app.component(key, component.default);
// }

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store).use(router).use(ElementPlus).mount("#app");
