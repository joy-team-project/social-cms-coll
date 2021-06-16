const BuildRelease = true;
const DebugLog = false;
const BuildServerTest = false;
const LoggerRedux = false;

const Config = {
  versionCode: 20210202, //20210118,//20201120,// 20201016, // 20200728, //20200707, //20200506, Version Code của ứng dụng
  versionApi: "/api/v3/", // API Version đánh dấu các phiên bản nâng cấp Server
  port: 3005, // Port server Test
  platformConfig: 5, // Platform cấu hình chỉ định giả lập môi trường TV, chỉ có giá trị khi dev trên Browser
  buildRelease: BuildRelease, // Build release
  debug: BuildRelease ? false : DebugLog, // Bật tắt chế độ debug để có thể hiển thị 1 số chức năng khi DEV
  useLoggerRedux: BuildRelease ? false : LoggerRedux, // Bật/tắt chế độ sử dụng thư viện xem log Redux
  useServerTest: BuildRelease ? false : BuildServerTest, // Bật tắt chế độ server Test để dev
};

export default Config;
