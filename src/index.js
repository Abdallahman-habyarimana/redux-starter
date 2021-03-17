import configureStore from "./store/configureStore"
import { projectAdded, projectRemoved } from "./store/projects";
import { bugAdded, bugAssignedToUser, getBugsByUser, getUnresolvedBugs, getAssignedBugs } from './store/bugs';
import { userAdded } from './store/users'

const store = configureStore();

store.subscribe(() => {
    console.log("Store changed")
})

store.dispatch(userAdded({ name: "User 1" }))
store.dispatch(userAdded({ name: "User 2 " }))
store.dispatch(bugAdded({ description: "Bug 1" }))
store.dispatch(bugAdded({ description: "Bug 2" }))
store.dispatch(bugAdded({ description: "Bug 3" }))
store.dispatch(bugAdded({ description: "Bug 4" }))
store.dispatch(bugAdded({ description: "Bug 5" }))
store.dispatch(bugAssignedToUser({ bugId: 4, userId: 1 }))
store.dispatch(bugAssignedToUser({ bugId: 5, userId: 1 }))
store.dispatch(bugAdded({ description: "Bug 6" }))

store.dispatch(projectAdded({ description: "Todo List 1"}))
store.dispatch(projectAdded({ description: "Todo List 2"}))
store.dispatch(projectAdded({ description: "Todo List 3"}))
store.dispatch(projectAdded({ description: "Todo List 4"}))
store.dispatch(projectRemoved({ id: 4}))

//const unresolvedBugs = store.getState().entities.bugs.filter(bug => !bug.resolved)
//const unresolvedBugs = getUnresolvedBugs(store.getState())
const bugs = getBugsByUser(2)(store.getState())

console.log(bugs)

const assignedBugs = getAssignedBugs(store.getState())

console.log(assignedBugs)

