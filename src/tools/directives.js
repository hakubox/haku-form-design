import Vue from 'vue';
import store from '@/config/store';

function insertAfter(newElement, targentElement) {
    let parent = targentElement.parentNode;
    if (parent.lastChild == targentElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targentElement.nextSibling)
    }
}

/**
 * Action 权限指令 （不建议使用）
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 */
const action = Vue.directive('action', {
    inserted: function(el, binding, vnode) {
        let permission = binding.arg || binding.value;
        if(permission) {
            if(!store.getters.checkPermissions(permission)) {
                let comment = document.createComment(` ${permission} `);
                if(el.parentNode) {
                    insertAfter(comment, el);
                    vnode.context.comment = comment;
                }
                (el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none');
            } else if(vnode.context.comment) {
                insertAfter(el, vnode.context.comment);
                vnode.context.comment.parentNode.removeChild(vnode.context.comment);
            }
        }
    }
});

export default action;
