import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: 'name',
    },
  },
  reducers: {
    addUser(state, action) {
      console.log(state, action); // eslint-disable-line
    },
    removeUser(state, action) {
      console.log(state, action); // eslint-disable-line
    },
    editUser(state, action) {
      console.log(state, action); // eslint-disable-line
    },
  },
});

export const { addUser, removeUser, editUser } = userSlice.actions;

export default userSlice.reducer;
