import G2 from '@antv/g2';

// 创建唯一的 ID
let uniqueId = 0;
function generateUniqueId() {
    return `el-g2-${uniqueId++}`;
}

export default function createG2(__operation) {
    return {
        data() {
            return {
                chart: null,
                chartId: generateUniqueId()
            };
        },
        props: {
            width: Number,
            height: {
                type: Number,
                default: 300
            },
            data: {
                type: Array | Object,
                default: function() {
                    return {};
                }
            },
            padding: {
                type: Array,
                default: () => [ 40, 30, 60, 60 ]
            },
            plotCfg: {
                type: Object
            },
            forceFit: {
                type: Boolean,
                default: () => true
            },
            config: {
                type: Object,
                default: () => ({})
            }
        },
        watch: {
            data: function(newData, oldData) {
                if (newData !== oldData) {
                    this.chart.changeData(newData);
                }
            },
            width: function(val, oldVal) {
                if (val !== oldVal) {
                    this.chart.changeSize(val, this.height);
                }
            },
            height: function(val, oldVal) {
                if (val !== oldVal) {
                    this.chart.changeSize(this.width, val);
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart();
            });
        },
        beforeDestory() {
            this.chart.destroy();
            this.chart = null;
            this.chartId = null;
        },
        methods: {
            initChart() {
                const { width, height, data, plotCfg, forceFit, config } = this;

                const chart = new G2.Chart({
                    id: this.chartId,
                    padding: this.padding,
                    width,
                    height,
                    plotCfg,
                    forceFit
                });

                chart.source(data, config);
                __operation(chart);
                this.chart = chart;
            }
        },
        render(createElement) {
            return createElement('div', {
                attrs: {
                    id: this.chartId
                }
            });
        }
    };
}
