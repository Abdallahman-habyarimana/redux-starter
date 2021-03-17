import configureStore from "./store/configureStore"
import { projectAdded, projectRemoved } from "./store/projects";
import { bugAdded, bugResolved, bugRemoved } from './store/bugs';

const store = configureStore();

store.subscribe(() => {
    console.log("Store changed")
})

store.dispatch(bugAdded({ description: "Bug 1" }))
store.dispatch(bugAdded({ description: "Bug 2" }))
store.dispatch(bugAdded({ description: "Bug 3" }))
store.dispatch(bugResolved({ id: 1}))
store.dispatch(bugRemoved({ id: 2 }))

store.dispatch(projectAdded({ description: "Todo List 1"}))
store.dispatch(projectAdded({ description: "Todo List 2"}))
store.dispatch(projectAdded({ description: "Todo List 3"}))
store.dispatch(projectAdded({ description: "Todo List 4"}))
store.dispatch(projectRemoved({ id: 3}))

console.log(store.getState())
