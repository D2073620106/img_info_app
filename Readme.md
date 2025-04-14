# 图工吧
图工吧小程序是一个图片信息解析小程序，能够根据上传的图片解析得出图片的拍摄时间，拍摄设备信息，拍摄参数，相机/设备信息等
项目基于[duxapp](http://duxapp.cn)开发，后端地址：[https://github.com/D2073620106/img_info_api](https://github.com/D2073620106/img_info_api)


## DUXAPP
duxapp是基于Taro开发的模块化的前端框架，同时支持小程序、H5、ReactNative。

## 创建

```bash
npx duxapp-cli create 项目名称
```

项目初始化后将会自动安装依赖，安装完成就可以打开项目进行开发了

## 使用

```bash
# duxapp自定义命令参数：在上面的命令的基础上新增参数
# 调试小程序端 打包基础模块
yarn dev weapp --app=duxapp
# 如果你没有duxui模块需要先安装
yarn duxapp app add duxui
# 调试小程序端 打包duxui模块
yarn dev weapp --app=duxui
```

## 开发文档

如何使用这个框架，请阅读开发文档

[duxapp.cn](http://duxapp.cn)
