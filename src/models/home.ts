

export default {
  namespace: 'home',
  state: {

    // selectedTab: 'optical_time',
    hidden: false,
    fullScreen: true,
    tabs:[
      // {
      //   title:"最佳时间",
      //   key:'optical_time',
      //   selectedTab:'optical_time',
      //   link:'/',
      // },
      {
        title:"股价筛选",
        key:'snalysis',
        selectedTab:'snalysis',
        link:'/',
      },
      {
        title:"持仓",
        key:'hold',
        selectedTab:'hold',
        link:'/hold',
      },
      {
        title:"今日股价",
        key:'hold_price',
        selectedTab:'hold_price',
        link:'/hold/price',
      },
      {
        title:"交易",
        key:'trading',
        selectedTab:'trading',
        link:'/trading',
      }
    ]
  },

  reducers: {
    save(state, { data }) {


      return { ...state, ...data };
    },
  },
  effects: {


  },
};

