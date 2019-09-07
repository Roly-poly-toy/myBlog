import Vue from 'vue'
import Router from 'vue-router'
import announce from './views/announce.vue'
import  message from './views/message.vue'
import index from './views/index.vue'
import forgetPwd from './views/forgetPwd.vue'
import newBlog from './views/newBlog.vue'
import myBlog from './views/myBlog.vue'
import myAccount from './views/myAccount.vue'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}




export default new Router({
  routes: [
    {path:'/',name:'index',component:index},
    {path:'/message',name:'message',component:message},
    {path:'/announce',name:'announce',component:announce},
    {path:'/forgetPwd',name:'forgetPwd',component:forgetPwd},
    {path:'/newBlog',name:'newBlog',component:newBlog},
    {path:'/myBlog',name:'myBlog',component:myBlog},
    {path:'/myAccount',name:'myAccount',component:myAccount},
  ]
})
