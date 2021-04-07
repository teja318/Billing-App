const userInitialValue = {}

const userReducer = (state=userInitialValue,action)=>{
    switch(action.type){
        case "ACCOUNT_INFO" : {
            return {...action.payload}
        }
        case "CLEAR" :{
           return userInitialValue
        }
        default : {
            return state
        }
    }
}
export default userReducer