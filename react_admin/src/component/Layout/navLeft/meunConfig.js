const menu = [{
    title: '主页',
    key: '/admin/home',
    icon: 'home',
}, {
    title: '商品',
    key: '/admin/good',
    icon: 'mail',
    children: [{
            title: '商品管理',
            key: '/admin/goods/goodsMng',
            icon: 'shop'
        },
        {
            title: ' 分类管理 ',
            key: '/admin/goods/category',
            icon: 'linkedin'
        }
    ]
},{
    title:'角色管理',
    key:'/admin/role',
    icon:'lock'
},
    {
        title:'用户管理',
        key:'/admin/userMng',
        icon:'user'
    }]
export default menu