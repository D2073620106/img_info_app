import { duxappTheme, dayjs } from "@/duxapp";
import {
  Card,
  Column,
  Text,
  Row
} from "@/duxui";
import { View } from "@tarojs/components";
import './img_info.scss'

const CollapsibleSection = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View className='collapsible-section'>
      <View
        className='summary'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text>{title}</Text>
        <Text className={`arrow ${isOpen ? 'open' : ''}`}>▼</Text>
      </View>

      {isOpen && (
        <View className='content'>
          <Text className='preformatted'>
            {content}
          </Text>
        </View>
      )}
    </View>
  )
}

const ImageExifViewer = ({ exifData }) => {
  // 格式化文件大小
  const getSize = (bytes) => {
    if (!bytes) return null;
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 格式化GPS坐标
  const formatGPS = (gpsArray) => {
    if (!gpsArray || !Array.isArray(gpsArray) || gpsArray.length !== 3) return null;
    const [deg, min, sec] = gpsArray;
    return parseFloat(deg[0] / deg[1] + (min[0] / min[1]) / 60 + (sec[0] / sec[1]) / 3600).toFixed(6);
  };

  // 格式化日期时间
  const formatDateTime = (dateTimeStr, offset) => {
    if (!dateTimeStr) return null;
    const [date, time] = dateTimeStr[0].split(' ');
    const [year, month, day] = date.split(':');
    return `${year}年${month}月${day}日 ${time} (${offset || '+08:00'})`;
  };

  // 格式化分辨率
  const formatResolution = (res) => {
    if (!res || !Array.isArray(res)) return null;
    return `${res[0] / res[1]}`;
  };

  // 准备要展示的数据块
  const dataSections = [
    {
      title: '基本信息',
      items: [
        { label: '上传时间', value: dayjs(new Date(exifData?.createdAt)).format('YYYY-MM-DD HH:mm:ss') },
        { label: '文件类型', value: exifData?.FileType?.description },
        { label: '文件大小', value: getSize(exifData?.fileSize) },
        {
          label: '图像尺寸', value: exifData?.ImageWidth?.value && exifData?.ImageLength?.value
            ? `${exifData.ImageWidth.value} × ${exifData.ImageLength.value} 像素`
            : null
        }
      ]
    },
    {
      title: '拍摄设备信息',
      items: [
        { label: '制造商', value: exifData?.Make?.description },
        { label: '型号', value: exifData?.Model?.description }
      ]
    },
    {
      title: '拍摄参数',
      items: [
        { label: '光圈', value: exifData?.FNumber?.description },
        { label: '快门速度', value: exifData?.ExposureTime?.description },
        { label: 'ISO感光度', value: exifData?.ISOSpeed?.value },
        { label: '焦距', value: exifData?.FocalLength?.description },
        { label: '等效35mm焦距', value: exifData?.FocalLengthIn35mmFilm?.value },
        { label: '曝光模式', value: exifData?.ExposureProgram?.description },
        { label: '测光模式', value: exifData?.MeteringMode?.description },
        { label: '白平衡', value: exifData?.WhiteBalance?.description },
        { label: '闪光灯', value: exifData?.Flash?.description },
        { label: '曝光补偿', value: exifData?.ExposureBiasValue?.value && `${exifData.ExposureBiasValue.value[0] / exifData.ExposureBiasValue.value[1]} EV` },
        { label: '场景类型', value: exifData?.SceneType?.description }
      ]
    },
    {
      title: '时间信息',
      items: [
        { label: '拍摄时间', value: formatDateTime(exifData?.DateTimeOriginal?.value, exifData?.OffsetTimeOriginal?.value?.[0]) },
        { label: '数字化时间', value: formatDateTime(exifData?.DateTimeDigitized?.value, exifData?.OffsetTimeOriginal?.value?.[0]) }
      ]
    },
    {
      title: '地理位置信息',
      items: [
        { label: '纬度', value: exifData?.GPSLatitude?.value ? `${formatGPS(exifData.GPSLatitude.value)}° ${exifData?.GPSLatitudeRef?.value?.[0] || ''}` : null },
        { label: '经度', value: exifData?.GPSLongitude?.value ? `${formatGPS(exifData.GPSLongitude.value)}° ${exifData?.GPSLongitudeRef?.value?.[0] || ''}` : null },
        { label: '海拔', value: exifData?.GPSAltitude?.value ? `${exifData.GPSAltitude.value[0] / exifData.GPSAltitude.value[1]} 米` : null },
        { label: 'GPS时间', value: exifData?.GPSTimeStamp?.value ? exifData.GPSTimeStamp.value.map(v => v[0]).join(':') : null },
        { label: 'GPS日期', value: exifData?.GPSDateStamp?.value?.[0] }
      ]
    },
    {
      title: '图像属性',
      items: [
        { label: '色彩空间', value: exifData?.ColorSpace?.description },
        { label: '方向', value: exifData?.Orientation?.description },
        {
          label: '分辨率', value: exifData?.XResolution?.value && exifData?.YResolution?.value
            ? `${formatResolution(exifData.XResolution.value)} × ${formatResolution(exifData.YResolution.value)} ${exifData?.ResolutionUnit?.description === 'inches' ? '英寸' : '像素'}`
            : null
        },
        { label: '位深度', value: exifData?.['Bits Per Sample']?.value },
        { label: '压缩方式', value: exifData?.Compression?.description },
        { label: 'YCbCr定位', value: exifData?.YCbCrPositioning?.description }
      ]
    },
    {
      title: '相机/设备信息',
      items: [
        { label: 'Exif版本', value: exifData?.ExifVersion?.description },
        { label: 'Flashpix版本', value: exifData?.FlashpixVersion?.description },
        { label: '感光方法', value: exifData?.SensingMethod?.description },
        { label: '场景捕捉类型', value: exifData?.SceneCaptureType?.description },
        { label: '数字变焦', value: exifData?.DigitalZoomRatio?.value && `${exifData.DigitalZoomRatio.value[0] / exifData.DigitalZoomRatio.value[1]}` },
        { label: '最大光圈', value: exifData?.MaxApertureValue?.value && `${exifData.MaxApertureValue.value[0] / exifData.MaxApertureValue.value[1]}` }
      ]
    },
    {
      title: '缩略图信息',
      items: [
        { label: '缩略图格式', value: exifData?.Thumbnail?.type },
        {
          label: '缩略图尺寸', value: exifData?.Thumbnail?.image?.width && exifData?.Thumbnail?.image?.height
            ? `${exifData.Thumbnail.image.width} × ${exifData.Thumbnail.image.height} 像素`
            : null
        },
        { label: '缩略图压缩', value: exifData?.Thumbnail?.Compression?.description }
      ]
    },
    {
      title: '高级功能',
      items: [
        {
          label: '用户注释', value: exifData?.UserComment?.value?.[0] ? '查看详情' : null,
          render: exifData?.UserComment?.value?.[0] ? (
            <CollapsibleSection
              title="查看详情"
              content={exifData.UserComment.value[0]}
            />
          ) : null
        },
        { label: '多帧合成', value: exifData?.UserComment?.value?.[0]?.includes('multi-frame') ? '是' : null },
        { label: 'HDR状态', value: exifData?.UserComment?.value?.[0]?.match(/HdrStatus:\s*(\w+)/)?.[1] }
      ]
    },
    {
      title: '其他标记',
      items: [
        { label: '子秒时间', value: exifData?.SubSecTime?.value?.[0] },
        { label: '子秒原始时间', value: exifData?.SubSecTimeOriginal?.value?.[0] },
        { label: '子秒数字化时间', value: exifData?.SubSecTimeDigitized?.value?.[0] },
        { label: '时区偏移', value: exifData?.OffsetTime?.value?.[0] },
        { label: '原始时区偏移', value: exifData?.OffsetTimeOriginal?.value?.[0] }
      ]
    }
  ];

  return (
    < >
      {dataSections.map((section, index) => {
        // 过滤掉没有有效数据的项
        const validItems = section.items.filter(item => {
          if (item.render) return true; // 如果有自定义渲染组件，总是显示
          return item.value !== null && item.value !== undefined;
        });

        // 如果该部分没有有效数据，则不渲染整个卡片
        if (validItems.length === 0) return null;

        return (
          <Card key={index} shadow={false}>
            <Column className='gap-2'>
              <Text size={3} color={duxappTheme.primaryColor}>
                {section.title}
              </Text>

              {validItems.map((item, idx) => (
                <Row key={idx} items='center'>
                  <Text bold size={2}>
                    {item.label}：
                  </Text>
                  <View style={{ flex: 1 }}>
                    {item.render || (
                      <Text size={2}>
                        {item.value}
                      </Text>
                    )}
                  </View>
                </Row>
              ))}
            </Column>
          </Card>
        );
      })}
    </>
  );
};



export {
  ImageExifViewer,
};

