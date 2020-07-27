import store from 'store'

export default {
    setLloginInfo(userInfo) {
        store.set('userInfo', userInfo)
    },
    getLoginInfo() {
        return store.get('userInfo') || {}
    },
    removeLoginInfo() {
        store.remove('userInfo')
    },
    setLGoodsInfo(goodsInfo) {
        store.set('goodsInfo', goodsInfo)
    },
    getGoodsInfo() {
        return store.get('goodsInfo') || {}
    },
    removeGoodsInfo() {
        store.remove('goodsInfo')
    }
}