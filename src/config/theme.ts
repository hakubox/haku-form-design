const themeCache: Record<string, Array<any>> = {};

const themeAction = {
    /** 默认主题 */
    default() {
        if (!themeCache.default) {
            themeCache.default = [
                require('@/assets/theme/theme-default/index.lazy.less'),
                require('@/assets/theme/theme-default/index.lazy.scss')
            ];
        }
        return themeCache.default;
    },
    /** [test]红色主题 */
    red() {
        if (!themeCache.red) {
            themeCache.red = [
                require('@/assets/theme/theme-red/index.lazy.less'),
                require('@/assets/theme/theme-red/index.lazy.scss')
            ];
        }
        return themeCache.red;
    }
};

/** 当前主题 */
let currentTheme: Array<any> = [];

/** 设置主题 */
async function setTheme(theme) {
    if (themeAction[theme]) {
        const style = await themeAction[theme]();
        currentTheme.forEach(i => i.unuse());
        style.forEach(i => i.use());
        currentTheme = style;
    }
}

export default setTheme;