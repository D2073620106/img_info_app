/*
 * @Date: 2025-03-08 11:31:23
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 15:50:02
 * @FilePath: \app\src\img_parse\pages\history\index.jsx
 */
import { Header, ScrollView, TopView, duxappTheme, px } from "@/duxapp";
import { Column, Card, UiIcon, Text, Image, Row } from "@/duxui";
import { List,getSize } from "@/img_parse/utils";
import { View } from "@tarojs/components";



const ImageParseItem = ({item}) => {
  return <Card shadow={false} row className='mt-3 mh-3'>
  <Image
    style={{ width: px(142), height: px(142) }}
    mode='aspectFill'
    src={item.thumbUrl}
  />
  <View>
    <Column class='gap-2' style={{ marginLeft: px(24)}}>
      <Text size={3} bold>
        <Text bold>拍摄时间：</Text>
        <Text>{item.shotAt || '解析失败'}</Text>
      </Text>
      <Text size={3} bold>
        <Text bold>拍摄地址：</Text>
        <Text>{item.address || '解析失败'}</Text>
      </Text>
      <Text size={3} bold>
        <Text bold>图片大小：</Text>
        <Text>{getSize(item.result?.fileSize) || '解析失败'}</Text>
      </Text>
    </Column>
  </View>
</Card>
}


export default function IndexPage() {

  return (
    <TopView>
      <Header title='解析记录' titleCenter />
      <List style='background: linear-gradient(180deg,#cbc9fe,#fff)' url='image_parse/history' renderItem={ImageParseItem} listField='data'></List>
    </TopView>
  );
}
