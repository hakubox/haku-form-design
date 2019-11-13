import { createDecorator } from'vue-class-component'

//Vue装饰器

export const NoCache = createDecorator((options, key) => {
    //@ts-ignore
    options.computed[key].cache = false;
});

/** 调用时打印相关日志 */
export const Log = createDecorator((component, key) => {
    console.log("#Component", component);
    console.log("#Key", key);
});