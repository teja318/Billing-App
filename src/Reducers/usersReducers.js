const usersInitialValue = []

const usersReducer = (state = usersInitialValue, action) =>{
    switch(action.type){
        case 'SET_USERS':{
            return [...state, {...action.payload}]
        }
        
        default:{
            return [...state]
        }
    }
}
export default usersReducer