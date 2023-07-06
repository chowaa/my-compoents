import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';
 


const base = process.cwd();

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router'],
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      resolvers: [
        ElementPlusResolver({importStyle: false}),
        // IconsResolver({})
      ],
      vueTemplate: true, // 是否在 vue 模板中自动导入
      dts: resolve(base,  'auto-imports.d.ts') // (false) 配置文件生成位置，默认是根目录 /auto-imports.d.ts
    }),
    Components({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      dirs: ['src/components', 'src/**/components',],
      resolvers: [ElementPlusResolver({importStyle: false})],
      dts: resolve(base,  'components.d.ts')
    }),
    vue(),
  ],
  server: {
    port: 8088,
  },
  build: {
    //打包环境移除console.log，debugger
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    //打包文件按照类型分文件夹显示
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
