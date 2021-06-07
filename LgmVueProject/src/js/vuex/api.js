//api地址
const HOST = "http://xxx.com";
const API = HOST + "/api/public/";

const Apis = {
    // 产品
    getProduct: API + 'product',
    // 微信购买
    wxPay: API + 'weixinPay',
}
export default Apis