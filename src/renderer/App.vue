<template>
  <v-app id="inspire">
    <v-toolbar
      dark
      fixed
      flat
      clipped-left
      app
      dense
      style="-webkit-app-region: drag"
    >
      <v-toolbar-side-icon
        @click.stop="drawerLeft = !drawerLeft"
      ></v-toolbar-side-icon>
      <v-btn icon router to="/">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn icon router to="/gitee">
        <v-icon>star</v-icon>
      </v-btn>
      <v-btn icon router to="/about">
        <v-icon>info</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="windowMin">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn icon @click.native="windowMax">
        <v-icon>{{ isMaximized ? 'fullscreen_exit' : 'fullscreen' }}</v-icon>
      </v-btn>
      <v-btn icon @click.native="windowClose">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawerLeft" fixed clipped stateless app>
      <v-treeview
        v-model="tree"
        :open="open"
        :items="items"
        hoverable
        activatable
        item-key="name"
        open-on-click
      >
      </v-treeview>
    </v-navigation-drawer>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>

<style lang="stylus">
@import "/static/css/main.css"

::-webkit-scrollbar
  display: none
.v-btn
  -webkit-app-region: no-drag
</style>

<script>
import fontList from 'font-list'
export default {
  data: () => ({
    isMaximized: false,
    drawerLeft: false,
    open: ['云函数'],
    tree: [],
    items: [
      {
        name: '云函数',
        children: [
          {
            name: '触发云函数'
          }
        ]
      },
      {
        name: '数据库',
        children: [
          {
            name: '导入'
          },
          {
            name: '导出'
          },
          {
            name: '迁移状态查询'
          },
          {
            name: '更新索引'
          },
          {
            name: '新增集合'
          },
          {
            name: '删除集合'
          },
          {
            name: '获取集合信息'
          },
          {
            name: '插入记录'
          },
          {
            name: '删除记录'
          },
          {
            name: '更新记录'
          },
          {
            name: '查询记录'
          },
          {
            name: '聚合'
          },
          {
            name: '统计记录数量'
          }
        ]
      },
      {
        name: '云存储',
        children: [
          {
            name: '获取文件上传链接'
          },
          {
            name: '获取文件下载链接'
          },
          {
            name: '删除文件'
          }
        ]
      },
      {
        name: '其他',
        children: [
          {
            name: '获取腾讯云API调用凭证'
          }
        ]
      }
    ],
    fonts: []
  }),
  computed: {
    window() {
      return this.$electron.remote.BrowserWindow.getFocusedWindow()
    }
  },
  methods: {
    windowMin() {
      this.window.minimize()
    },
    windowMax() {
      if (this.window.isMaximized()) {
        this.window.restore()
        this.isMaximized = false
      } else {
        this.window.maximize()
        this.isMaximized = true
      }
    },
    windowClose() {
      this.window.close()
    }
  },
  mounted() {
    fontList
      .getFonts()
      .then(fonts => {
        this.fonts = fonts
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
