const productsInitialValue = []

const productsReducer = (state = productsInitialValue, action) =>{
    switch(action.type){
        case 'SET_PRODUCTS':{
            return [...action.payload]
        }
        case 'ADD_PRODUCTS':{
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
export default productsReducer