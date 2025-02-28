import { Header, ScrollView, TopView, duxappTheme, px } from "@/duxapp";
import { Column, Card, UiIcon, Text, Image, Row } from "@/duxui";

export default TopView.HOC(function IndexPage() {
  return (
    <TopView>
      <Header title='解析记录' titleCenter />
      <ScrollView style='height: 100%; width: 100%; background: linear-gradient(180deg,#cbc9fe,#fff)'>
        <Column className='gap-3 p-3'>
          <Card shadow={false} class='mb-3 '>
            <Row>
              <Image
                style={{ width: px(142), height: px(142) }}
                mode='aspectFill'
                src='https://img0.baidu.com/it/u=1684532727,1424929765&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=50301360a9bd698d5f29da34ffb5cbb0'
              />
              <Column className='gap-2 '   style={{ marginLeft: px(16)}} >
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
            </Row>
          </Card>
        </Column>
      </ScrollView>
    </TopView>
  );
});
