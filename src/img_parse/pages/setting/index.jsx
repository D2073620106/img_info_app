import { Header, ScrollView, TopView, duxappTheme, px } from "@/duxapp";
import { Column, Card, UiIcon, Text, Image, Row, Input } from "@/duxui";

export default function IndexPage() {
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
              <Image
                className='r-max'
                style={{ width: px(130), height: px(130) }}
                mode='aspectFill'
                src='https://img0.baidu.com/it/u=1684532727,1424929765&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=50301360a9bd698d5f29da34ffb5cbb0'
              ></Image>
            </Row>
          </Card>
          <Card shadow={false}>
            <Row items='center'>
              <Text size={2} bold>
                昵称
              </Text>
              <Input
                class='flex-grow text-right'
                style={{ marginLeft: px(24) }}
              ></Input>
            </Row>
          </Card>
        </Column>
      </ScrollView>
    </TopView>
  );
}
