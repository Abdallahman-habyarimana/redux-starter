import { createSlice } from '@reduxjs/toolkit'

let lastId = 0;

const slice = createSlice({
    name: 'projects',
    initialState: [],
    reducers: {
        // actions => action handlers
        projectAdded: (projects, action) => {
            projects.push({
                id: ++lastId,
                description: action.payload.description
            });
        },

        projectRemoved: (projects, action) => {
            const index = projects.findIndex(project => project.id === action.payload.id)
            projects.splice(index, index)
        },
    }
})

export const  { projectAdded, projectRemoved } = slice.actions
export default slice.reducer
