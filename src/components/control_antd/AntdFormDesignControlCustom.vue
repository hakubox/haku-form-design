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

    render(createElement) {
        if (this.$attrs.renderFn) {
            // 需要判断返回的是否为数值、当不为节点时需要另外处理。

            let result: any = null;

            try {
                result = Function('h', '__data__', ('let { ' + Object.keys(this.formScript.data).join(', ') + ' } = __data__; const { ' + Object.keys(this.formScript.methods).join(', ') + ' } = __data__; ') + 'return ' + this.$attrs.renderFn)(createElement, {
                    ...this.formScript.data,
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