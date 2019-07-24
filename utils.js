import QRCode from 'qrcodejs2'

/**
 * 获取url上的参数
 */
export const getUrlParams = name => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
};

/**
 * 获取手机类型IOS||安卓
 */
export const getPhoneType =()=> {
  let type = 0;
  if(/android/i.test(navigator.userAgent)){
    type = 2;
  }
  if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
    type = 1;
  }
  return type;
};

/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
};

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * 清空所有存储
 */
export const clearStore = () => {
  window.sessionStorage.clear();
};

export const isEqual=(a, b)=>{
  //如果a和b本来就全等
  if (a === b) {
    //判断是否为0和-0
    return a !== 0 || 1 / a === 1 / b;
  }
  //判断是否为null和undefined
  if (a == null || b == null) {
    return a === b;
  }
  //接下来判断a和b的数据类型
  var classNameA = toString.call(a),
    classNameB = toString.call(b);
  //如果数据类型不相等，则返回false
  if (classNameA !== classNameB) {
    return false;
  }
  //如果数据类型相等，再根据不同数据类型分别判断
  switch (classNameA) {
    case '[object RegExp]':
    case '[object String]':
      //进行字符串转换比较
      return '' + a === '' + b;
    case '[object Number]':
      //进行数字转换比较,判断是否为NaN
      if (+a !== +a) {
        return +b !== +b;
      }
      //判断是否为0或-0
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
  }
  //如果是对象类型
  if (classNameA == '[object Object]') {
    //获取a和b的属性长度
    var propsA = Object.getOwnPropertyNames(a),
      propsB = Object.getOwnPropertyNames(b);
    if (propsA.length != propsB.length) {
      return false;
    }
    for (var i = 0; i < propsA.length; i++) {
      var propName = propsA[i];
      //如果对应属性对应值不相等，则返回false
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }
  //如果是数组类型
  if (classNameA == '[object Array]') {
    if (a.toString() == b.toString()) {
      return true;
    }
    return false;
  }
};


/**
 * 生成二维码
 */
export const createQRCode = (id,url) => {
  let $codeDiv=document.getElementById(id);
  new QRCode($codeDiv, {
    text: url,
    width: 60,
    height: 60,
    render: "canvas",
    colorDark: "#333333",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.L
  })
};

/**
 * 判断图片是否存在
 */
export const validateImage=(pathImg)=> {
  let ImgObj = new Image();
  ImgObj.src = pathImg;
  let url;
  if(ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    url=pathImg;
  } else {
    url='http://global.ckv-test.sulink.cn/images/err/noneimg.png';

  }
  return url;

};
