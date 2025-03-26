/*
 * @Date: 2025-03-08 11:31:23
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 14:47:15
 * @FilePath: \app\src\img_parse\pages\index\pages\home.jsx
 */
import { TopView } from "@/duxapp";
import {
  Column,
  Header,
  Image,
  ScrollView,
  route
} from "@/duxui";
import { ImageExifViewer, WarnInfo } from "@/img_parse";
import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import "./detail.scss";


export default function Detail() {

  const [imgInfo, setImgInfo] = useState({})

  const { path, params } = route.useRoute()
  console.log(params, 'params');
  useEffect(() => {
    setImgInfo(params)
  }, [])

  return (
    <TopView>
      <Header title='解析详情' titleCenter />
      <ScrollView className='relative'>
        <View
          className='absolute z-1'
          style='height: 100%; width: 100%; background: linear-gradient(180deg,#cbc9fe,#fff)'
        ></View>
        <View className='z-2 p-3'>
          <Column className='gap-3'>
            {/* <Upload className='upload' max={1} onChange={e => onChange(e)} addText='上传图片,即可解析，获取图片信息，包含图片拍摄时间，图片大小，拍摄地址，请上传未压缩图片' /> */}
            <Image
              className='upload'
              mode='aspectFill'
              preview
              src={imgInfo.imageUrl}

            ></Image>
            {/* {
  { ...imgInfo.result?.exif, fileSize: imgInfo.result?.fileSize }
} */}
            {imgInfo?.result && <ImageExifViewer exifData={{ ...imgInfo.result?.exif, fileSize: imgInfo.result?.fileSize, createdAt: imgInfo?.createdAt }} />}

            <WarnInfo />
          </Column>
        </View>
      </ScrollView>
    </TopView>
  );
};
