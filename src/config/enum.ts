export namespace Enum {
    /** 用户权限类型 */
    export enum userRole {
        /** 管理员 */
        manager,
        /** 用户 */
        user,
        /** 游客 */
        visitor
    }

    /** 表单类型 */
    export enum FormType {
        /** 移动端 */
        mobile = 'mobile',
        /** PC端 */
        pc = 'pc'
    }

    /** 表单组件库 */
    export enum formComponentLib {
        vant = 'vant',
        antDesignVue = 'ant-design-vue'
    }

    /** 控件类型 */
    export enum FormControlType {
        /** 子表单控件 */
        childform = 'childform',
        /** 布局控件 */
        layout = 'layout',
        /** 输入控件 */
        input = 'input',
        /** 选择控件 */
        select = 'select',
        /** 上传控件 */
        upload = 'upload',
        /** 其他控件 */
        else = 'else'
    }

    /** 控件属性组 */
    export enum FormControlPropertyGroup {
        /** 表单分组 */
        childform = '子表单属性',
        /** 表单分组 */
        form = '表单属性',
        /** 外观分组 */
        style = '外观',
        /** 行为分组 */
        action = '行为',
        /** 数据源分组 */
        data = '数据',
        /** 其他分组 */
        else = '其他',
        /** 函数分组 */
        function = '函数',
    }

    /** 属性布局方式 */
    export enum PropertyLayout {
        /** 行内布局（默认） */
        inline = 'inline',
        /** 整块布局 */
        block = 'block'
    }

    /** 属性附加选项 */
    export enum FormControlPropertyAttach {
        /** 计算表达式 */
        expression = 'expression',
        /** 绑定变量 */
        variable = 'variable',
        /** 系统-视图 Array<any> */
        view = 'view',
        /** 系统-基础数据 Record<string, any> */
        basicData = 'basic-data',
        /** 远端请求 */
        request = 'request'
    }

    /** 属性编辑器 */
    export enum FormControlPropertyEditor {
        /** 任意值 */
        any = 'any',
        /** 单行文本 */
        singerLine = 'singer-line',
        /** 多行文本 */
        multiLine = 'multi-line',
        /** 布尔类型 */
        boolean = 'boolean',
        /** 整数 */
        int = 'int',
        /** 浮点数 */
        float = 'float',
        /** 像素长度 */
        pixel = 'pixel',
        /** 颜色 */
        color = 'color',
        /** 文件大小 */
        byte = 'byte',
        /** Json类型 */
        json = 'json',
        /** Javascript类型 */
        javascript = 'javascript',
        /** 图标类型 */
        icon = 'icon',
        /** 列表型 */
        list = 'list',
        /** 函数类型 */
        function = 'function',
        /** 对象列表类型 */
        modelList = 'model-list',
        
        /** 计算表达式 */
        expression = 'expression',
        /** 绑定变量 */
        variable = 'variable',
        /** 系统-视图 Array<any> */
        view = 'view',
        /** 系统-基础数据 Record<string, any> */
        basicData = 'basic-data',
        /** 远端请求 */
        request = 'request'
    }

    /** 表单区域中的控件堆叠方向 */
    export enum FormPanelDirection {
        /** 行堆叠 */
        row = 'row',
        /** 反向行堆叠 */
        rowReverse = 'row-reverse',
        /** 列堆叠 */
        column = 'column',
        /** 反向列堆叠 */
        columnReverse = 'column-reverse'
    }
}