import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { apiCallBegan } from '../api';
import { addBugs } from '../bugs';
import configureStore from '../configureStore';
import { getUnresolvedBugs } from './../bugs';

// describe("bugsSlice", () => {
//     describe("action creators", () => {
//         it("addBug", () => {
//             const bug = { description: 'a'}
//             const result = addBugs(bug);
//             const expected = {
//                 type: apiCallBegan.type,
//                 payload: {
//                     url: '/bugs',
//                     method: 'post',
//                     data: bug,
//                     onSuccess: bugAdded.type
//                 }
//             }
//             expect(result).toEqual(expected)
//         })
//     })
// })

// describe("bugsSlice", () => {
//     it("should handle the addBug action", async () => {

//         const bug = { description: 'a'}
//         const saveBug = { ...bug, id: 1}

//         const fakeAxios = new MockAdapter(axios);
//         fakeAxios.onPost('/bugs').reply(200, saveBug)
        
//         // dispatch(addBug) => store
//         const store = configureStore()
        


//         await store.dispatch(addBugs(bug))
//         expect(store.getState().entities.bugs.list).toContainEqual(saveBug)
//     })
// })

describe("bugsSlice", () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
            fakeAxios = new MockAdapter(axios);
            store = configureStore()
    });

    const bugsSlice = () => store.getState().entities.bugs

    const createState = () => ({
        entities: {
            bugs: {
                list: []
            }
        }
    })

    it("should add the bug to the store if it's saved to the server", async () => {
        // Arrange
        const bug = { description: 'a'}
        const saveBug = { ...bug, id: 1}
        fakeAxios.onPost('/bugs').reply(200, saveBug)
        // Act
        await store.dispatch(addBugs(bug))
        // Assert    
        expect(bugsSlice().list).toContainEqual(saveBug)

})
    it("should not add the bug to the store if it's not saved to the server", async () => {
        // Arrange
        const bug = { description: 'a'}
        fakeAxios.onPost('/bugs').reply(500)
        // Act
        await store.dispatch(addBugs(bug))
        // Assert    
        expect(bugsSlice().list).toHaveLength(0)

})

describe("selectors", () => {
    it("getUnresolvedBugs", () => {
        const state = createState();
        state.entities.bugs.list = [{ id: 1, resolved: true}, { id: 2 },{ id: 3 }]
        
        const result = getUnresolvedBugs(state);
        
        expect(result).toHaveLength(2)
        })
    })
})