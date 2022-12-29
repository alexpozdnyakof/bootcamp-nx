declare type RootState = ReturnType<typeof import('./store').store.getState>
declare type AppDispatch = ReturnType<typeof import('./store').store>
