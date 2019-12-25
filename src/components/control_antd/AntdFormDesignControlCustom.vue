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
    @Prop({ type: Object }) control!: any;
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;
    /** 表单变量 */
    @Getter('getFormVariables') formVariables!: Array<FormDesign.FormVariable>;

    get variables() {
        if (this.formVariables.length == 0) return {};
        // @ts-ignore
        return Object.assign.apply({}, this.formVariables.map(i => ({ [i.name]: i.value })) || [{}]);
    };

    render(createElement) {
        if (this.$attrs.renderFn) {
            console.log(('let { ' + Object.keys(this.variables).join(', ') + ' } = data;') + 'return ' + this.$attrs.renderFn);
            // 需要判断返回的是否为数值、当不为节点时需要另外处理。
            return createElement('span', {
                class: 'control-custom ant-form-text'
            }, [
                Function('h', 'data', ('let { ' + Object.keys(this.variables).join(', ') + ' } = data;') + 'return ' + this.$attrs.renderFn)(createElement, this.variables)
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
    }
</style>