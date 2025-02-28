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

View;

export const Home = () => {
  return (
    <>
      {/* <Header title='Duxui' titleCenter  /> */}
      <ScrollView class='relative'>
        <View
          class='absolute z-1'
          style='height: 100%; width: 100%; background: linear-gradient(180deg,#cbc9fe,#fff)'
        ></View>
        <View class='z-2 p-3'>
          <Upload className='upload' max={1} />
          <Card shadow={false} class='mt-3'>
            <Column className='gap-2'>
              <Text size={4} color={duxappTheme.primaryColor}>
                <UiIcon name='check' color={duxappTheme.primaryColor}></UiIcon>
                图片信息解析成功
              </Text>
              <Text size={1}>
                <Text bold>拍摄时间：</Text>
                <Text>2025-01-01</Text>
              </Text>
              <Text size={1}>
                <Text bold>拍摄地址：</Text>
                <Text>2025-01-01</Text>
              </Text>
              <Text size={1}>
                <Text bold>图片大小：</Text>
                <Text>2025-01-01</Text>
              </Text>
            </Column>
          </Card>
          <Card
            shadow={false}
            class='mt-3'
            onClick={() => route.push("/img_parse/pages/history")}
          >
            <Row className='gap-2' justify='between' items='center'>
              <Row items='center'>
                <UiIcon name='timer' size={38} color={duxappTheme.primaryColor}></UiIcon>
                <Text size={2} className='flex items-center  mh-1'>
                  解析记录
                </Text>
              </Row>
              <UiIcon name='arrow-right' size={38}></UiIcon>
            </Row>
          </Card>
        </View>
      </ScrollView>
    </>
  );
};
