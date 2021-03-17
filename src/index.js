import configureStore from "./store/configureStore"

const store = configureStore();

store.dispatch((dispatch, getState) => {
    // call an API
    // When the promise is resolved => dispatch()
    dispatch({ type: 'bugsReceived', bugs: [1,2,3]})
    console.log(getState())
    // If the promise is rejected => 

})

store.dispatch({
    type: "error",
    payload: { message: "An error occured. "}
})

