export interface SharedState{
    showLoadingSpinner: boolean,
    errorMessages: string[]
}

export const initialState: SharedState = {
    showLoadingSpinner: false,
    errorMessages: null
}