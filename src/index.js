import configureStore from "./store/configureStore"
import { addBugs, loadBugs, resolveBug, assignBug } from './store/bugs';

const store = configureStore();

store.dispatch(loadBugs())

setTimeout(() => store.dispatch(assignBug(1, 2)), 2000)



// store.dispatch({
//     type: 'apiCallBegin',
//     payload: {
//         url: "/bugs",
//         onSuccess: 'bugsReceived',
//         onError: 'apiRequestFailed'
//     }
// }  
// ) 


