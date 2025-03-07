import { useEffect } from "react";
import { TopView, TabBar, duxappTheme } from "@/img_parse";
import { user as userManage , request } from "@/img_parse/utils";
import { UiIcon } from "@/duxui";
import { View, Image, Text } from "@tarojs/components";
import { login } from '@tarojs/taro'
import { Home } from "./pages/home";
import { User } from "./pages/user";

const tabbarList = [
  {
    text: "首页",
    icon: "nav-home-line",
    iconHover: "nav-home-fill",
    comp: Home,
  },
  {
    text: "个人中心",
    icon: "nav-mine-line",
    iconHover: "nav-mine-fill",
    comp: User,
  },
];

const TabBarIcon = ({ hover, index }) => {
  return (
    <TabBar.ItemIcon
      hover={hover}
      name={tabbarList[index].text}
      icon={
        <UiIcon
          size={40}
          color={hover ? duxappTheme.primaryColor : duxappTheme.textColor1}
          name={tabbarList[index][hover ? "iconHover" : "icon"]}
        />
      }
    />
  );
};

export default function Index() {
  // const [items, setItems] = useState('stretch')

  // return <Column items={items} className='p-3 bg-success w-full gap-3'>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('start')}>start</Text>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('center')}>center</Text>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('end')}>end</Text>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('stretch')}>stretch</Text>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('baseline')}>baseline</Text>
  // </Column>

  useEffect( () => {
    login().then(res=>{
      request({
        url: "auth/login",
        method: "POST",
        data: {
          code:res.code,
        },
      }).then(res1=>{
        userManage.set({token:res1.data.token})
      })
    })
  }, []);

  return (
    <TopView isSafe>
      <TabBar>
        {tabbarList.map((item) => (
          <TabBar.Item
            key={item.text}
            component={item.comp}
            icon={TabBarIcon}
          />
        ))}
      </TabBar>
    </TopView>
  );
}
