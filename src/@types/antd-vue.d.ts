
//Antd-Vue Bug修复

import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { Component, Prop, Vue } from 'vue-property-decorator';

declare module 'ant-design-vue/types/form/form' {


    interface WrappedFormUtils {
        clearField(name?: string): void;
    }

    interface Form {
        /** 创建表单（于created事件） */
        createForm(context: Vue, options?: IformCreateOption): WrappedFormUtils;
    }
}