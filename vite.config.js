import { defineConfig } from 'vite'
const path = require("path");
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
    createSvgIconsPlugin({
        // https://juejin.cn/post/7091253193988014110  方案源于此
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        /**
         * 自定义插入位置
         * @default: body-last
         */
        // inject?: 'body-last' | 'body-first'
        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        // customDomId: '__svg__icons__dom__',
    }),
    ],
    base: './',
    server: {
        port: 8082,
        // proxy: {
        //     '/api': {
        //         target: 'http://baidu.com/',
        //         rewrite: (path) => path.replace(/^\/api/, '')
        //     }
        // }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
})