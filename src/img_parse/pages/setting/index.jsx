/*
 * @Date: 2025-03-08 11:31:23
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 15:48:15
 * @FilePath: \app\src\img_parse\pages\setting\index.jsx
 */
import { Header, ScrollView, TopView, px } from "@/duxapp";
import { Column, Card,  Text, Image, Row, Input } from "@/duxui";
import { request,throttleRequest ,user as UserManage} from "@/img_parse/utils";
import {  requestPermissionMessage } from '@/duxapp/components'
import { formConfig } from '@/duxui/components/Form/config'
import { useEffect, useState ,useCallback} from "react";
import './index.scss'

export default function IndexPage() {

  const [userInfo, setUserInfo] = useState({})
  const [progress, setProgress] = useState(-1)

  const reload = () => {
    request('user/info').then(res => {
      setUserInfo(res.data)
      UserManage.set({...UserManage.data,...res.data})
    })
  }

  useEffect(() => {
    reload()
  }, []);


  const onChange = useCallback((key, data) => {
    throttleRequest({
      url: 'user/update',
      data: { [key]: data },
      method: 'post'
    }).then(() => {
      reload()
    })
  },[])

  const add = useCallback(async () => {
    const upload = formConfig.getUpload()
    try {
      if (process.env.TARO_ENV === 'rn') {
        await requestPermissionMessage(requestPermissionMessage.types.image)
      }
      let _type  = 'image'
      const urls = await upload(_type, { count: 1, sizeType: ['compressed'] })
        .start(() => {
          setProgress(0)
        })
        .progress(setProgress)
      setProgress(-1)
      onChange('avatar', urls[0])
    } catch (error) {
      setProgress(-1)
    }
  }, [onChange])


  return (
    <TopView>
      <Header title='设置' titleCenter />
      <ScrollView style='height: 100%; width: 100%; background: linear-gradient(180deg,#cbc9fe,#fff)'>
        <Column className='gap-3 p-3'>
          <Card shadow={false}>
            <Row items='center' justify='between'>
              <Text size={2} bold>
                头像
              </Text>
              {/* {userInfo.avatar ? <Image
                className='r-max'
                style={{ width: px(130), height: px(130) }}
                mode='aspectFill'
                src={userInfo.avatar}
                onClick={!~progress && add}
              ></Image> :<Upload type='image' className='upload' onChange={e => onChange('avatar', e)} max={1} defaultValue={userInfo.avatar} />} */}
              <Image
                className='r-max'
                style={{ width: px(130), height: px(130) }}
                mode='aspectFill'
                src={userInfo.avatar}
                onClick={!~progress && add}
              ></Image>
            </Row>
          </Card>
          <Card shadow={false}>
            <Row items='center'>
              <Text size={2} bold>
                账户名<Text size={2}>（默认生成）</Text>
              </Text>
              <view
                class='flex-grow text-right'
                style={{ marginLeft: px(24),fontSize: px(26) }}
              >
                {userInfo.username}
              </view>
            </Row>
          </Card>
          <Card shadow={false}>
            <Row items='center'>
              <Text size={2} bold>
                昵称
              </Text>
              <Input
                class='flex-grow text-right'
                value={userInfo.nickname}
                onChange={e => onChange('nickname', e)}
                style={{ marginLeft: px(24),fontSize: px(26) }}
              ></Input>
            </Row>
          </Card>
        </Column>
      </ScrollView>
    </TopView>
  );
}
