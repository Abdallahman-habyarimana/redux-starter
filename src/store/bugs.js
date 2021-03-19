import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { apiCallBegan } from './api';
import moment from 'moment'

const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        // actions => action handlers
        bugsRequested: (bugs, loading) => {
            bugs.loading = true;
        },
        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false
        },
        bugReceived: (bugs, action) => {
            bugs.list = action.payload
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },
        bugAssignedToUser: (bugs, action) => {
            const { id: bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId)
            bugs.list[index].userId = userId;    
        },

        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload);
        },

        bugRemoved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list.splice(index, index)
        },

        
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list[index].resolved = true;
        }

        }
})

 const  { 
    bugAdded, 
    bugRemoved, 
    bugAssignedToUser, 
    bugResolved,
    bugReceived, 
    bugsRequested,
    bugsRequestFailed
 } = slice.actions
export default slice.reducer

const url = "/bugs"

export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;
    
    console.log(lastFetch)

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

    if (diffInMinutes < 10 ) return;

    dispatch(
        apiCallBegan({
        url,
        onStart: bugsRequested.type,
        onSuccess: bugReceived.type,
        onError: bugsRequestFailed
    })
    )
}

export const addBugs = bug => apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type
})

export const resolveBug = id => apiCallBegan({
    url: url + '/' + id,
    method: "patch",
    data: { resolved: true},
    onSuccess: bugResolved.type
})

export const assignBug = id => userId => apiCallBegan({
    url: url + '/' + id,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type
})

    

// selector
//export const getUnresolvedBugs = state => state.entities.bugs.filter(bug => !bug.resolved)

//Memoization
export const getUnresolvedBugs = createSelector( 
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved)    
)

// Memoization assigned bugs
export const getAssignedBugs = createSelector( 
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId)    
)

// selector 
export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)



// Action types
// const BUG_ADDED = "bugAdded"
// const BUG_REMOVED = "bugRemoved"
// const BUG_RESOLVED = "bugResolved"



//Action creators
// export const bugAdded = createAction("bugAdded")
// export const bugRemoved = createAction("bugRemoved")
// export const bugResolved = createAction("bugResolved")


// // export const bugAdded = description => ({
// //     type: BUG_ADDED,
// //     payload: {
// //         description: description
// //     } 
// // }) 

// // export function bugRemoved(id) {
// //     return {
// //         type:BUG_REMOVED,
// //         payload: {
// //         id: id
// //     }
// //     }
// // }

// // export const bugResolved = id => ({
// //     type:BUG_RESOLVED,
// //     payload: {
// //         id: id
// //     }
// // })


// // create reducers
// let lastId = 0;

// // you can rename the bugAdded
// // [bugAdded.type] in place of bugAdded in reducers


// export default createReducer([], {
//     // key: value
//     //actions: functions
//     bugAdded: (bugs, action) => {
//         bugs.push({
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false
//             })
//         },
//     bugRemoved: (bugs, action) => {
//         const index = bugs.findIndex(bug => bug.id === action.payload.id)
//         bugs.splice(index, index)
//     },
//     bugResolved: (bugs, action) => {
//         const index = bugs.findIndex(bug => bug.id === action.payload.id)
//         bugs[index].resolved = true;
//     }
// })

// // export default function reducer(state = [], action) {
// //     switch(action.type) {
// //         case bugAdded.type: 
// //             return [
// //                     ...state, {
// //                     id: ++lastId,
// //                     description: action.payload.description,
// //                     resolved: false
// //                     }
// //                 ]
// //         case bugRemoved.type:
// //             return state.filter(bug => bug.id !== action.payload.id);
// //         case bugResolved.type:
// //             return state.map(bug => (bug.id === action.payload.id) ? {...state, resolved: true} : bug);
        
// //         default:
// //             return state;
// //     }
// // }