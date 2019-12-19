export default {
  from( state = '北京' , action) {
    const { type, payload } = action;
    switch(type) {
      case '':
        return payload;
      default:
    }
    return state;
  },
};