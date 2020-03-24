module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "cloud.dashboard.app",
        productName: "小程序.云控制台",
        copyright: "Copyright © 2020",
        directories: {
          output: "./dist" // 输出文件路径
        },
        win: {
          // win相关配置
          icon: "./appicon/256x256.png", // 图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", // 利用nsis制作安装程序
              arch: ["x64"]
            }
          ]
        }
      }
    }
  }
};
