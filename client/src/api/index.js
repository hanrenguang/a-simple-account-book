const resolver = require.context('./extends', true, /\.js/);

export default function apiFactory(Vue) {
  const moduleInstanceList = {};
  const fileNameReg = /^\.\/(.*)\.js$/;

  resolver.keys().forEach((key) => {
    const fileName = key.match(fileNameReg)[1];
    const ModuleConstructor = resolver(key).default;
    moduleInstanceList[fileName] = new ModuleConstructor();
  });

  /* eslint no-param-reassign: ["error", { "props": false }] */
  Vue.prototype.$api = moduleInstanceList;
}
