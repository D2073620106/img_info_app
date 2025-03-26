
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
  Button,
  Loading
} from "@/duxui";
import { formConfig } from '@/duxui/components/Form/config'
import { View } from "@tarojs/components";
import { request, getSize } from "@/img_parse/utils";
import { useState, useCallback } from "react";
import "./home.scss";
import { px, toast } from "@/duxapp/utils/util";
import { ImageExifViewer, WarnInfo } from "@/img_parse";


export const Home = () => {

  const [imgInfo, setImgInfo] = useState({})
  const [img, setImg] = useState('')
  const [progress, setProgress] = useState(-1)
  const [parseLoading, setParseLoading] = useState(false)


  const onChange = (e) => {
    if (!e) return;
    setParseLoading(true)
    request({
      url: 'image_parse/parse',
      method: 'POST',
      data: {
        url: e
      }
    }).then(res => {
      setParseLoading(false)
      setImgInfo(res.data)
    }).catch(error => {
      console.log(error)
      toast('解析失败')
    }).finally(() => {
      setParseLoading(false)
    })
  };

  const add = useCallback(async () => {
    setImgInfo({})
    const upload = formConfig.getUpload()
    try {
      if (process.env.TARO_ENV === 'rn') {
        await requestPermissionMessage(requestPermissionMessage.types.image)
      }
      let _type = 'image'
      const urls = await upload(_type, { count: 1, sourceType: ['album'] })
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
                <UiIcon name='camera' size={158} color={'#999'}></UiIcon>
                <View className="" style={{ width: px(420) }}>
                  <Text size={2} color={'#999'} style={{ textAlign: 'center' }}>
                    上传图片，即可解析获的图片拍摄时间、大小、拍摄地址等信息
                  </Text>
                </View>
              </View>
            </View>}
            {
              progress >= 0 && <Card shadow={false} >
                <Row items="center">
                  <Loading style={{ marginRight: px(12) }}></Loading>
                  <Text size={2}>
                    加载中
                  </Text>
                </Row>
              </Card>
            }
            {
              parseLoading && <Card shadow={false} >
                <Row items="center">
                  <Loading style={{ marginRight: px(12) }}></Loading>
                  <Text size={2}>
                    解析中
                  </Text>
                </Row>
              </Card>
            }
            {
              img && <Button onClick={!~progress && add} radiusType='round' size='l' color={['#695afd', '#b9b6fd']} >换图</Button>
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
            {!!Object.keys(imgInfo).length && progress === -1 && !parseLoading &&
              <ImageExifViewer exifData={{ ...imgInfo.result.exif, fileSize: imgInfo.result.fileSize, createdAt: imgInfo?.createdAt }} />
            }
            {/*
            <Card shadow={false} >
              <Column className='gap-2'>
                <Text size={4} color={duxappTheme.primaryColor}>
                  基本文件信息
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
              </Column>
            </Card>

            */}


            <WarnInfo />
          </Column>
        </View>
      </ScrollView>
    </>
  );
};
