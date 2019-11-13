import Vue from 'vue';
import {
    Alert,
    Button,
    Breadcrumb,
    Pagination,
    DatePicker,
    Divider,
    Dropdown,
    Form,
    Icon,
    Input,
    InputNumber,
    Layout,
    message,
    Popconfirm,
    Radio,
    Table,
    Row,
    Col,
    Select,
    Slider,
    Tabs,
    Tag,
    Tooltip,
    Drawer,
    Upload,
    notification,
    LocaleProvider,
    Modal,
    Switch,
    List,
    Tree,
    Card,
    Collapse,
    Spin,
    Avatar,
    Menu
} from 'ant-design-vue';

import InputSearch from 'ant-design-vue/lib/input';

import Empty from 'ant-design-vue/lib/empty';

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;

Vue.use(Alert);
Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(Pagination);
Vue.use(Divider);
Vue.use(Dropdown);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Layout);
Vue.use(Popconfirm);
Vue.use(Radio);
Vue.use(Table);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Slider);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(Tooltip);
Vue.use(Drawer);
Vue.use(Upload);
Vue.use(LocaleProvider);
Vue.use(Modal);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(List);
Vue.use(Tree);
Vue.use(Collapse);
Vue.use(Empty);
Vue.use(Card);
Vue.use(Spin);
Vue.use(Avatar);
Vue.use(Menu);

Vue.component(InputSearch.name, InputSearch);
Vue.component(Empty.name, Empty);