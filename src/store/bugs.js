import { createSlice } from '@reduxjs/toolkit'

let lastId = 0;

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        // actions => action handlers
        bugAdded: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            });
        },

        bugRemoved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id)
            bugs.splice(index, index)
        },
        
        bugResolved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id)
            bugs[index].resolved = true;
        }

        }
})

export const  { bugAdded, bugRemoved, bugResolved } = slice.actions
export default slice.reducer

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