import { Header, ScrollView, TopView, duxappTheme, px } from "@/duxapp";
import { Column, Card, UiIcon, Text, Image, Row } from "@/duxui";

export default TopView.HOC(function IndexPage() {
  return (
    <TopView>
      <Header title='解析记录' titleCenter />
      <ScrollView style='height: 100%; width: 100%; background: linear-gradient(180deg,#cbc9fe,#fff)'>
        <Column className='gap-3 p-3'>
          <Card shadow={false} class='mb-3 '>
            <Text size={2}>设置</Text>
          </Card>
        </Column>
      </ScrollView>
    </TopView>
  );
});
