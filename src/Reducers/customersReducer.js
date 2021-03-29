const customersInitialValue = []

const customersReducer = (state = customersInitialValue, action) =>{
    switch(action.type){
        case 'SET_CUSTOMERS':{
            return [...action.payload]
        }
        case 'ADD_CUSTOMERS':{
            return [{...action.payload}, ...state]
        }
        default:{
            return [...state]
        }
        case "REMOVE" :{
            return state.filter(ele=> ele._id !== action.payload._id)
            
        }
        case "EDIT" : {
            return state.map(ele=>{
                if(ele._id === action.payload._id){
                    return {...ele , ...action.payload}
                } else {
                    return {...ele}
                }
            })
        }
    }
}
export default customersReducer