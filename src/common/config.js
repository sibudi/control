/**
 * Created by alan on 17-4-30.
 */
 let Config = {
  //host: '/',
  //use control-uat, it's the one who have the correct SSL for now.
  host: process.env.NODE_ENV === 'development'? 'https://control-uat.doitglotech.co.id' : '/',
  oss: process.env.NODE_ENV === 'development'? 'https://collectionapi-uat.doitglotech.co.id' : '/collection',
  //host: process.env.NODE_ENV === 'development'? 'http://localhost:8082' : '/',
  ajaxError:'Silahkan login ulang'

  // host:'http://control.yqguan.com',
  // host:'http://control.uanguang.id/',
  // host:'https://control.do-it.id/',
  // host:'https://control.do-it.id/',
  // host:location.protocol+'//control.do-it.id/',
  // host:'https://admin.do-it.id/',
  // host:'http://cn.control.do-it.id/',
  // host:'http://doitapi.do-it.id/',
  // host:'http://control2.uanguang.co.id/',
  // host:'http://10.24.30.72:8082/',
  // host:'http://admin.do-it.co.id/',
  // host:'http://localhost:8082/',
  // imageUrl:'http://www.do-it.id/',
  // imageUrl:'http://image.uanguang.co.id/',
};
export default Config
