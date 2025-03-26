import { px } from "@/duxapp/utils/util";
import {
  Row,
  Text,
  UiIcon,
  duxappTheme
} from "@/duxui";
import { View } from "@tarojs/components";
const WarnInfo = () => {
  return <View className='flex flex-col '>
    <Row items='center'>
      <UiIcon
        name='info'
        style={{ marginRight: px(12) }}
        color={duxappTheme.secondaryColor}
      ></UiIcon>
      <Text size={2} color={duxappTheme.secondaryColor} >注意</Text>
    </Row>
    <Text size={2} color={duxappTheme.secondaryColor} >
      1、选择图片时请选择原图,并且确保图片未被压缩
    </Text>
    <Text size={2} color={duxappTheme.secondaryColor} >
      2、微信传输的图片非原图，无法解析拍摄时间
    </Text>
    <Text size={2} color={duxappTheme.secondaryColor} >
      3、微信原图只能解析出拍摄时间，解析不出拍摄地址，需要解析地址不要通过微信传输
    </Text>
  </View>
}

export {
  WarnInfo
};
