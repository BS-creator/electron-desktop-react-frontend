import { combineReducers } from 'redux'
import todos from './todos'
import inquiries from './inquiries'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  todos,
  inquiries,
  visibilityFilter
})