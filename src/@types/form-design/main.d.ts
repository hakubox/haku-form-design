import { Location } from "./location";
import { DragConfig } from "./drag-config";
import { FormConfig } from "./form-config";
import { ComponentLibrary } from "./form-component-library";
import { FormFooterConfig } from "./form-footer-config";
import { FormControlGroup } from "./form-control-group";
import { RemoteDevice } from "./remote-device";
import { FormPanel } from "./form-panel";
import { FormControlProperty } from "./form-control-property";
import { FormFunction } from "./form-function";
import { PropertyEditor } from "./property-editor";
import { BasicControl } from "./basic-control";
import { PropertyGroup } from "./property-group";
import { FormControl } from "./form-control";
import { FormVariable } from "./form-variable";
import { FormTheme } from "./form-theme";
import { FormTemplate } from "./form-template";


export {
    /** 简单坐标类 */
    Location,
    /** 拖拽组件配置 */
    DragConfig,
    /** 表单基本配置 */
    FormConfig,
    /** 表单组件库 */
    ComponentLibrary,
    /** 表单底部配置 */
    FormFooterConfig,
    /** 设备类型 */
    RemoteDevice,
    /** 组件类型分组 */
    FormControlGroup,
    /** 包含一个控件列表的表单区域 */
    FormPanel,    
    /** 属性 */
    FormControlProperty,
    /** 基础组件 */
    BasicControl,    
    /** 属性编辑器 */
    PropertyEditor,    
    /** 属性组 */
    PropertyGroup,    
    /** 表单控件 */
    FormControl,
    /** 表单变量 */
    FormVariable,
    /** 函数 */
    FormFunction,
    /** 表单主题 */
    FormTheme,
    /** 表单模板 */
    FormTemplate
};