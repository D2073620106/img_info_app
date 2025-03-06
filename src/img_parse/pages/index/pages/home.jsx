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
} from "@/duxui";
import { View } from "@tarojs/components";
import "./home.scss";


export const Home = () => {
  return (
    <>
      <Header title='首页' titleCenter />
      <ScrollView className='relative'>
        <View
          className='absolute z-1'
          style='height: 100%; width: 100%; background: linear-gradient(180deg,#cbc9fe,#fff)'
        ></View>
        <View className='z-2 p-3'>
          <Upload className='upload' max={1} />
          <Column className='mt-3'>
            <Card shadow={false}>
              <Column className='gap-2'>
                <Text size={4} color={duxappTheme.primaryColor}>
                  <UiIcon
                    name='check'
                    color={duxappTheme.primaryColor}
                  ></UiIcon>
                  图片信息解析成功
                </Text>
                <Text size={2}>
                  <Text bold>拍摄时间：</Text>
                  <Text>2025-01-01</Text>
                </Text>
                <Text size={2}>
                  <Text bold>拍摄地址：</Text>
                  <Text>2025-01-01</Text>
                </Text>
                <Text size={2}>
                  <Text bold>图片大小：</Text>
                  <Text>2025-01-01</Text>
                </Text>
              </Column>
            </Card>
            <Card
              className='mt-3'
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
