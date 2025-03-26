
import { Header, TopView, dayjs, px, route } from "@/duxapp";
import { Card, Column, Image, Text } from "@/duxui";
import { List, getSize } from "@/img_parse/utils";
import { View } from "@tarojs/components";



const ImageParseItem = ({item}) => {

  const onClick = () => {
    route.push("img_parse/pages/history/detail",item)
  }
  return <Card shadow={false} row className='mt-3 mh-3' onClick={() => onClick()}>
  <Image
    style={{ width: px(142), height: px(142) }}
    mode='aspectFill'
    src={item.imageUrl}
  />
  <View>
    <Column class='gap-2' style={{ marginLeft: px(24)}}>
      <Text size={2} bold>
        <Text bold>上传时间：</Text>
        <Text>{dayjs(new Date(item.createdAt)).format('YYYY-MM-DD HH:mm:ss') || '解析失败'}</Text>
      </Text>
      <Text size={2} bold>
        <Text bold>文件类型：</Text>
        <Text>{item.result?.exif?.FileType?.description || '解析失败'}</Text>
      </Text>
      <Text size={2} bold>
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
