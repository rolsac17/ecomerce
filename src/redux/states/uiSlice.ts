import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  show: false,
  doDelete: false,
  error: '',
  incomeForm: 0
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload.message
    },
    clearError: (state) => {
      state.error = ''
    },
    showModal: (state, action) => {
      state.show = true
      state.doDelete = action.payload
    },
    closeModal: (state) => {
      state.show = false
    },
    toggleLoading: (state) => {
      state.loading = !state.loading
    },
    changeIncomeForm: (state, action) => {
      state.incomeForm = action.payload
    }
  },
})

export const {
  toggleLoading,
  setError,
  clearError,
  showModal,
  closeModal,
  changeIncomeForm
} = uiSlice.actions

export default uiSlice.reducer
