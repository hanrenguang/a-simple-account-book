/**
* 格式化时间
* @param { String | Number | Object } 日期
* @param { String } 返回日期格式
* @returns { String }
*/
export default function formatDate(date, format = 'YYYY-MM') {
  if (!date) return '';

  const dateInstance = new Date(date);
  const year = dateInstance.getFullYear();
  let month = dateInstance.getMonth() + 1;
  let day = dateInstance.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  /* eslint prefer-template: "off" */
  if (format === 'YYYY-MM') return `${year}-${month}`;
  return `${year}-${month}-${day}`;
}
