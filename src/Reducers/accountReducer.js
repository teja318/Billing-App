const accountInitialValue = {}

const accountReducer = (state=accountInitialValue,action)=>{
    switch(action.type){
        case "ACCOUNT_INFO" : {
            return {...action.payload}
        }
        case "CLEAR" :{
           return accountInitialValue
        }
        default : {
            return state
        }
    }
}
export default accountReducer