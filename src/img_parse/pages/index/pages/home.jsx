/*
 * @Date: 2025-03-08 11:31:23
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 14:47:15
 * @FilePath: \app\src\img_parse\pages\index\pages\home.jsx
 */
import {
  Header,
  ScrollView,
  Cell,
  nav,
  GroupList,
  confirm,
  UiIcon,
  Upload,
  Card,
  Text,
  Column,
  Row,
  duxappTheme,
  route,
  Image,
  Button
} from "@/duxui";
import { formConfig } from '@/duxui/components/Form/config'
import { View } from "@tarojs/components";
import { request, getSize } from "@/img_parse/utils";
import { useState, useCallback } from "react";
import "./home.scss";
import { px } from "@/duxapp/utils/util";


export const Home = () => {

  const [imgInfo, setImgInfo] = useState({})
  const [img, setImg] = useState('')
  const [progress, setProgress] = useState(-1)


  const onChange = (e) => {
    if (!e) return;
    request({
      url: 'image_parse/parse',
      method: 'POST',
      data: {
        url: e
      }
    }).then(res => {
      setImgInfo(res.data)
    })
  };

  const add = useCallback(async () => {
    const upload = formConfig.getUpload()
    try {
      if (process.env.TARO_ENV === 'rn') {
        await requestPermissionMessage(requestPermissionMessage.types.image)
      }
      let _type = 'image'
      const urls = await upload(_type, { count: 1, sourceType: ['album', 'camera'] })
        .start(() => {
          setProgress(0)
        })
        .progress(setProgress)
      setProgress(-1)
      setImg(urls[0])
      onChange(urls[0])
    } catch (error) {
      setProgress(-1)
    }
  }, [onChange])

  return (
    <>
      <Header title='首页' titleCenter />
      <ScrollView className='relative'>
        <View
          className='absolute z-1'
          style='height: 100%; width: 100%; background: linear-gradient(180deg,#cbc9fe,#fff)'
        ></View>
        <View className='z-2 p-3'>
          <Column className='gap-3'>
            {/* <Upload className='upload' max={1} onChange={e => onChange(e)} addText='上传图片,即可解析，获取图片信息，包含图片拍摄时间，图片大小，拍摄地址，请上传未压缩图片' /> */}
            {img ? <Image
              className='upload'
              mode='aspectFill'
              preview
              src={img}

            ></Image> : <View className='upload flex items-center justify-center' onClick={!~progress && add}>
              <View className="flex items-center justify-center">
                <UiIcon name='camera' size={158}  color={'#999'}></UiIcon>
                <View className="" style={{ width: px(560) }}>
                  <Text size={2} color={'#999'}>
                  上传图片,即可解析，获取图片信息，包含图片拍摄时间，图片大小，拍摄地址，请上传未压缩图片
                  </Text>
                </View>
              </View>
            </View>}
            {!!Object.keys(imgInfo).length && <Card shadow={false} >
              <Column className='gap-2'>
                <Text size={4} color={duxappTheme.primaryColor}>

                  图片信息解析如下
                </Text>
                <Text size={2}>
                  <Text bold>拍摄时间：</Text>
                  <Text>{imgInfo.shotAt || '解析失败'}</Text>
                </Text>
                <Text size={2}>
                  <Text bold>拍摄地址：</Text>
                  <Text>{imgInfo.address || '解析失败'}</Text>
                </Text>
                <Text size={2}>
                  <Text bold>图片大小：</Text>
                  <Text>{getSize(imgInfo.result?.fileSize) || '解析失败'}</Text>
                </Text>
                <Text size={3} color={duxappTheme.secondaryColor}>
                  <UiIcon
                    name='info'
                    color={duxappTheme.secondaryColor}
                  ></UiIcon>
                  被压缩的图片会解析不出内容，请确保图片未被压缩
                </Text>
              </Column>
            </Card>}
            {
              img &&  <Button  onClick={!~progress && add} radiusType='round' size='l' color={['#695afd', '#b9b6fd']} >换图</Button>
            }

            <Card
              shadow={false}
              onClick={() => route.push("img_parse/pages/history/index")}
            >
              <Row className='gap-2' justify='between' items='center'>
                <Row items='center'>
                  <UiIcon
                    name='timer'
                    size={38}
                    color={duxappTheme.primaryColor}
                  ></UiIcon>
                  <Text size={3} bold className='flex items-center  mh-1'>
                    解析记录
                  </Text>
                </Row>
                <UiIcon name='arrow-right' size={38}></UiIcon>
              </Row>
            </Card>
          </Column>
        </View>
      </ScrollView>
    </>
  );
};
