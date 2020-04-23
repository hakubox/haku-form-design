<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { get, post } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { Getter } from 'vuex-class';

@Component({
  components: {
  }
})
export default class AntdFormDesignControlCustom extends Vue {
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;
    /** Vue对象 */
    @Getter('getFormScript') formScript!: FormDesign.FormScript;

    /** 是否为预览模式 */
    @Inject() preview!: boolean;

    /** 预览模式数据 */
    @Inject() readonly previewFormData!: (key?: string, value?: any) => any;

    created() {
        // this.$bus.$on('scriptUpdate', () => {
        //     this.$forceUpdate();
        // });
    }

    render(createElement) {
        if (this.$attrs.renderFn) {
            // 需要判断返回的是否为数值、当不为节点时需要另外处理。

            let result: any = null;

            let _data = this.preview === true ? this.previewFormData() : this.formScript.data instanceof Function ? this.formScript.data() : this.formScript.data;

            try {
                result = Function('h', '__data__', 'let me = __data__; return ' + this.$attrs.renderFn)(createElement, {
                    ..._data,
                    ...this.formScript.methods
                });
            } catch (err) {
                result = createElement('span', { style: 'display: inline-block; width: calc(100% + 8px); color: #FF0000;line-height: 30px; background: #FFF0F0; border: 1px solid #FFD6D6;padding-left: 10px; border-radius: 4px;' }, [ '表达式异常，请检查代码！' ]);
            }

            return createElement('span', {
                class: 'control-custom ant-form-text'
            }, [
                result
            ]);
        } else {
            return createElement('span', {
                class: 'control-custom ant-form-text'
            }, [
                createElement('form-design-blank-control', {
                })
            ]);
        }
    }
}
</script>

<style lang="scss" scoped>
    .control-custom {
        box-sizing: border-box;
        width: 100%;
    }
</style>