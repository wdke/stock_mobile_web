

export function save(dispatch,data) {
  // console.log('onMaskClick');
  dispatch({
    type: 'home/save',
    data: { ...data },
  });
};
