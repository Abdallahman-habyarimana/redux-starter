let lastId = 0;
import { BUG_ADDED, BUG_REMOVED, BUG_RESOLVED } from './actionTypes';

export default function reducer(state = [], action) {
    switch(action.type) {
        case BUG_ADDED: 
            return [
                    ...state, {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                    }
                ]
        case BUG_REMOVED:
            return state.filter(bug => bug.id !== action.payload.id);
        case BUG_RESOLVED:
            return state.map(bug => (bug.id === action.payload.id) ? {...state, resolved: true} : bug);
        
        default:
            return state;
    }
}