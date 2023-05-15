export const debounce = (func: any) => {
  let time: any;
  return function (this: any, ...args: any) {
    let context = this;
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      time = null;
      func.apply(context, args);
    }, 1000);
  };
};
