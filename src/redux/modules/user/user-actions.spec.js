import expect from 'expect'

import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  updateUser,
} from './user-actions'
describe('redux/modules/user-actions', () => {
  describe('updateUserRequest', () => {
    it(`returns an action with type ${UPDATE_USER_REQUEST}`, () => {
      const action = updateUserRequest()
      expect(action.type).toBe(UPDATE_USER_REQUEST)
    })

    it('does not contain user state', () => {
      const action = updateUserRequest()
      expect(action.user).toBe(undefined)
    })
  })

  describe('updateUserSuccess', () => {
    it(`returns an action with type ${UPDATE_USER_SUCCESS}`, () => {
      const action = updateUserSuccess()
      expect(action.type).toBe(UPDATE_USER_SUCCESS)
    })

    it('contains the updated user', () => {
      const user = { name: 'Test' }
      const action = updateUserSuccess(user)
      expect(action.user).toBe(user)
    })
  })

  describe('updateUserFailure', () => {
    it(`returns an action with type ${UPDATE_USER_FAILURE}`, () => {
      const action = updateUserFailure()
      expect(action.type).toBe(UPDATE_USER_FAILURE)
    })

    it('does not contain user state', () => {
      const action = updateUserFailure()
      expect(action.user).toBe(undefined)
    })
  })

  describe('updateUser', () => {
    it(`is an asynchronous action`, () => {
      const action = updateUser()
      expect(action).toBeA('function')
    })
  })
})

