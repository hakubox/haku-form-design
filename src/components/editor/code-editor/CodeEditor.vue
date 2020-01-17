<template>
    <div class="code-editor" ref="editor" :style="{ height: height }"></div>
</template>
 
<script>
    import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
    import { functionHeaderParse } from '@/tools/formCommon';

    export default {
        name: 'CodeEditor',
        props: {
            value: {
                type: String
            },
            marker: {
                type: Function
            },
            height: {
                type: String,
                default: '20px'
            },
            language: {
                type: String,
                default: 'json'
            },
            options: {
                type: Object,
                default: () => ({})
            },
            /** 是否为表单表达式 */
            isFormExpression: {
                type: Boolean,
                default: false
            },
            unseenLines: {
                type: Array
            },
            placeholder: {
                type: String,
                default: '请输入JSON字符串'
            }
        },
        inject: ['bus'],
        computed: {
            /** 表单变量 */
            formScriptCode () {
                return this.$store.getters.getFormScriptCode;
            }
        },
        data: () => ({
            editor: null,
            content: '',
            /** TS转JS的数据 */
            realJavascript: '',
            defaultOptions: {
                wordWrap: 'off', //控制如何换行
                automaticLayout: true,
                fontFamily: "'Fira Code', Consolas, 'Courier New', monospace, 'Microsoft YaHei'"
            },
            /** 停止绘制 */
            __preventTriggerChangeEvent: false
        }),
        watch: {
            value(newVal) {
                this.handerCodeChange(newVal);
            }
        },
        created() {
            if (this.isFormExpression) {
                monaco.editor.defineTheme('gj-dark', {
                    base: 'vs-dark',
                    inherit: true,
                    rules: [
                        { token: 'custom-variable', foreground: 'ffa500', fontStyle: 'underline' }
                    ]
                });

                // validation settings
                monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                    noSemanticValidation: true,
                    noSyntaxValidation: false
                });

                // compiler options
                monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                    target: monaco.languages.typescript.ScriptTarget.ESNext,
                    allowNonTsExtensions: true
                });

                // 引入变量
                // let _variables = this.formScriptCode.map(i => {
                // });

                console.log();
                console.log();
                let ranges = functionHeaderParse(['{', '}'], this.formScriptCode.trim().slice(8)).bodyRanges;

                let str = `
                    let __me = ${this.formScriptCode.trim().slice(8).substring(ranges[0][0], ranges[0][1] + 1)};
                `;

                monaco.languages.typescript.javascriptDefaults.addExtraLib(str, 'vars.d.ts');
            } else {
                monaco.editor.defineTheme('gj-dark', {
                    base: 'vs-dark',
                    inherit: true,
                    rules: [
                        { token: 'custom-variable', foreground: 'ffa500', fontStyle: 'underline' }
                    ]
                });

                const _languages = monaco.languages.getLanguages().map(i => i.id);
                if (!_languages.includes(this.language)) {
                    switch (this.language) {
                        case 'sql':
                            require('@/lib/monaco-language/sql/sql.contribution');
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        mounted() {
            this.initialize();
        },
        beforeDestroy() {
            this.destroy();
        },
        methods: {
            initialize() {
                // onDidChangeOptions 配置改变事件
                // onDidChangeLanguage 语言改变事件

                let _options = {
                    ...this.defaultOptions,
                    ...this.options,
                    theme: 'gj-dark',
                    language: this.language
                };

                this.editor = monaco.editor.create(this.$refs.editor, {
                    value: this.value,
                    ..._options
                });

                if (this.language == 'typescript') {
                    let tsProxy;
                    monaco.languages.typescript.getTypeScriptWorker().then((worker) => {
                        worker(this.editor.getModel().uri).then((proxy) => {
                            tsProxy = proxy;
                        });
                    });
                }

                // this.editor.onDidChangeModelContent(event => {
                //     if (!this.__preventTriggerChangeEvent) {
                //         this.$emit('input', this.getValue());
                //     }
                // });

                this.$emit('ready', this.editor);

                this.refresh();

                this.$nextTick(() => {
                    this.editor.onDidBlurEditorText(e => {
                        if (!this.__preventTriggerChangeEvent) {
                            if (this.language == 'typescript') {
                                tsProxy?.getEmitOutput(this.editor.getModel().uri.toString()).then((r) => {
                                    this.realJavascript = r.outputFiles?.[0]?.text;
                                });
                            }
                            this.$emit('input', this.getValue());
                        }
                    });
                    this.editor.onDidFocusEditorText(e => {
                        this.$emit('focus');
                    })
                });

                this.bus.$on('prop_change', () => {
                    this.$emit('input', this.getValue());
                });
            },
            refresh() {
                this.editor.layout();
                // this.editor.remeasureFonts();
            },
            setValue(value) {
                this.editor.setValue(value);
            },
            getValue() {
                return this.editor.getValue();
            },
            getMarkers() {
                debugger;
                return this.editor.getModelMarkers({});
            },
            handerCodeChange(value) {
                const model = this.editor.getModel();
                if (this.value && this.value !== this.editor.getValue()) {
                    this.__preventTriggerChangeEvent = true;
                    this.editor.pushUndoStop();
                    model.pushEditOperations(
                        [],
                        [
                            {
                                range: model.getFullModelRange(),
                                text: value
                            }
                        ]
                    );
                    this.editor.pushUndoStop();
                    this.refresh();
                    this.__preventTriggerChangeEvent = false;
                }
            },
            insertContent(text) {
                if (this.editor) {
                    let selection = this.editor.getSelection();
                    let range = new monaco.Range(
                        selection.startLineNumber,
                        selection.startColumn,
                        selection.endLineNumber,
                        selection.endColumn
                    );
                    let id = { major: 1, minor: 1 };
                    let op = { identifier: id, range: range, text: text, forceMoveMarkers: true };
                    this.editor.executeEdits(this.root, [op]);
                    this.editor.focus();
                }
            },
            destroy() {
                this.editor.dispose();
                const model = this.editor.getModel();
                if (model) {
                    model.dispose();
                }
            }
        }
    };
</script>
 
<style lang="scss" scoped>
    .code-editor {
        position: relative;

        ::v-deep > .monaco-editor {
        }
    }
</style>