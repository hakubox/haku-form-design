import { Vue } from 'vue-property-decorator';
import { thousandNum } from './common';

// 数字转换为金额
Vue.filter('money', function (money) {
    return thousandNum(money);
});