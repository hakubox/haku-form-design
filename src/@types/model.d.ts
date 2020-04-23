

declare module 'model' {

    /** 用户Model */
    interface User {
        /** Id */
        id: string,
        /** 账号 */
        account: string,
        /** 姓名 */
        name?: string,
        /** 创建日期 */
        createtime?: string,
        /** 邮箱 */
        email?: string,
        nickname?: string,
        phone?: string,
        roleid?: string,
        rolename?: string,
    }

    /** 组织Model */
    interface Group {
        /** Id */
        key: string,
        /** 组织名称 */
        title: string,
        /** 组织英文名称 */
        enTitle: string,
        /** 子组织 */
        children: Array<Group>,
        /** 父组织Id */
        parentId: string,
        /** 可选插槽 */
        scopedSlots?: object
    }

    /**角色 */
    interface Role{
        /** Id */
        key: string,
        /** 角色名称 */
        name: string,
    }

}