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
import { View } from "@tarojs/components";
import "./user.scss";

export const User = () => {
  return (
    <>
      {/* <Header title='Duxui' titleCenter /> */}
      <ScrollView style='height: 100%; width: 100%; background: linear-gradient(180deg,#cbc9fe,#fff)'>
        <View class='avatar flex items-center w-full  justify-center'>
          <Image
            className='avatar__image'
            mode='aspectFill'
            src='https://img0.baidu.com/it/u=1684532727,1424929765&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=50301360a9bd698d5f29da34ffb5cbb0'
          />
          <Text size={4} bold class='mt-2'>大帅逼</Text>
        </View>
        <Column class='gap-3 mh-3'>
          <Card
            shadow={false}
            onClick={() => route.push("/img_parse/pages/history")}
          >
            <Row className='gap-2' justify='between' items='center'>
              <Row items='center '>
                <UiIcon name='timer' size={38}  color={duxappTheme.primaryColor}></UiIcon>
                <Text size={2} className='flex items-center mh-1'>
                  解析记录
                </Text>
              </Row>
              <UiIcon name='arrow-right' size={38}></UiIcon>
            </Row>
          </Card>
          <Card
            shadow={false}
            onClick={() => route.push("/img_parse/pages/setting")}
          >
            <Row className='gap-2' justify='between' items='center'>
              <Row items='center '>
                <UiIcon name='menu' size={38}  color={duxappTheme.primaryColor}></UiIcon>
                <Text size={2} className='flex items-center mh-1'>
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
