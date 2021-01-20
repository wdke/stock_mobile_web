import { TabBar } from 'antd-mobile';
import { connect } from 'umi';
import { save } from '@/function/HomeFunction';
import { history } from '@@/core/history';

import './Index.less';

const Index = ({ dispatch, children, location, home }) => {
  const { hidden, fullScreen, tabs } = home;
  let { selectedTab } = home;
  console.info('home=', home);
  console.info('children=', children);

  if (undefined === selectedTab) {

    tabs.forEach((item) => {

      if (item.link === location.pathname) {
        console.info(`item.link =${item.link}  location.pathname=${location.pathname}`)

        selectedTab=item.selectedTab;
      }
    });
  }
  console.info("selectedTab=",selectedTab)


  return (

    <div style={fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
      <div style={{height:document.documentElement.clientHeight-50,overflow:'auto'}}>
        {children}
      </div>
      <div style={{height:50}}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={hidden}
      >

        {tabs.map((obj) => {
          return <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
              }}
              />
            }
            title={obj.title}
            key={obj.key}
            // badge={'new'}
            selected={selectedTab === obj.selectedTab}
            onPress={() => {
              save(dispatch, { selectedTab: obj.selectedTab });

              //  跳转到指定路由
              history.push(obj.link);
            }}
            data-seed="logId1"
          >
          </TabBar.Item>;
        })}
      </TabBar>
      </div>
    </div>
  );
};

export default connect(({ home }) => ({
  home,
}))(Index);
