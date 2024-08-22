import { configureStore } from "@reduxjs/toolkit";
import componentReducer from "../feature/componentSlice";
import filtersReducer from "../feature/filtersSlice";

const store = configureStore({
  reducer: {
    component: componentReducer,
    filters: filtersReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
