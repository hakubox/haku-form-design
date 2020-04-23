import { Vue } from 'vue-property-decorator';
import { thousandNum, dateFormat } from './common';

// 数字转换为金额
Vue.filter('money', function (money) {
    return thousandNum(money);
});

// 日期格式化
Vue.filter('format', function (date: string, format: string) {
    return dateFormat(new Date(date), format);
});