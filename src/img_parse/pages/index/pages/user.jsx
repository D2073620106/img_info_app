/*
 * @Date: 2025-03-08 11:31:23
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 15:13:49
 * @FilePath: \app\src\img_parse\pages\index\pages\user.jsx
 */
import {
  Header,
  ScrollView,
  Cell,
  GroupList,
  updateApp,
  confirm,
  Upload,
  Text,
  Column,
  Image,
  Card,
  Row,
  UiIcon,
} from "@/duxui";
import { px, route,duxappTheme } from "@/duxapp";
import {  request,user as UserManage } from "@/img_parse/utils";
import { View } from "@tarojs/components";
import { useEffect , useState} from "react";
// import defaultAvatar from "@/img_parse/static/default_avatar.png";
import "./user.scss";

export const User = () => {


  const userInfo = UserManage.useData()


  return (
    <>
      <Header title='个人中心' titleCenter />
      <ScrollView style='height: 100%; width: 100%; background: linear-gradient(180deg,#cbc9fe,#fff)'>
        <View className='avatar flex items-center w-full  justify-center'>
         {/* {userInfo.avatar ? <Image
           className='avatar__image'
           mode='aspectFill'
           src={userInfo.avatar}
         /> : <View className='avatar__image'>{userInfo.nickname}</View>} */}
         <Image
           className='avatar__image'
           mode='aspectFill'
           src={userInfo.avatar}
         />
          <Text size={4} bold  className='mt-2'>{userInfo.nickname}</Text>
        </View>
        <Column className='gap-3 mh-3'>
          <Card
            shadow={false}
            onClick={() => route.push("img_parse/pages/history/index")}
          >
            <Row className='gap-2' justify='between' items='center'>
              <Row items='center '>
                <UiIcon name='timer' size={38}  color={duxappTheme.primaryColor}></UiIcon>
                <Text size={3} bold className='flex items-center mh-1'>
                  解析记录
                </Text>
              </Row>
              <UiIcon name='arrow-right' size={38}></UiIcon>
            </Row>
          </Card>
          <Card
            shadow={false}
            onClick={() => route.push("img_parse/pages/setting/index")}
          >
            <Row className='gap-2' justify='between' items='center'>
              <Row items='center '>
                <UiIcon name='menu' size={38}  color={duxappTheme.primaryColor}></UiIcon>
                <Text size={3} bold className='flex items-center mh-1'>
                  设置
                </Text>
              </Row>
              <UiIcon name='arrow-right' size={38}></UiIcon>
            </Row>
          </Card>
        </Column>
      </ScrollView>
    </>
  );
};
