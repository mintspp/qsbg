const initialState = () => ({
    MEMBER_ID:"",
    PRODUCT_ID:""
})
const state = initialState()

const getters = {
MEMBER_ID: state => state.MEMBER_ID,
PRODUCT_ID: state => state.PRODUCT_ID
}

const mutations = {
SET_MEMBER_ID(state,data){
    state.MEMBER_ID = data
},
SET_PRODUCT_ID(state,data){
    state.PRODUCT_ID = data
}
}

const actions = {}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}