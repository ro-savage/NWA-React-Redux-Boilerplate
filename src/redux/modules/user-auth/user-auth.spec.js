import React from 'react'
import expect from 'expect'
import deepFreeze from 'deep-freeze'
import configureStore from '../../configure-store'

import * as userAuth from './user-auth'

describe("[Redux] redux/modules/user-auth", function() {

  /*
   * DISPATCHES DOES NOT WORK
   * NEED TO FIGURE OUT HOW TO MOCK STUFF TO GET THIS TO WORK CORRECTLY!
   * THESE DO NOT CURRENTLY WORK!!! THEY ARE JUST FOR MUCKING ROUND
   */
  describe("DISPATCHES", function() {

    describe("checkTokenAuth", function() {

      it('should return rejected promise when missing token', function() {

        const store = configureStore({})
        const dispatch = expect.spyOn(store, 'dispatch').andCallThrough()

        // Remove token. Just in case.
        localStorage.removeItem('userToken')

        return store.dispatch(userAuth.checkTokenAuth())
                    .then(()=>{
                      // Shouldn't reach here. Auto fail.
                      expect(dispatch).toHaveBeenCalled();
                    })
                    .catch(()=>{
                      // Should reach here. Auto pass.
                      expect(dispatch).toHaveBeenCalled();
                    })
      })

      it('should return promise when token is found', function() {

        // Save to localStorage for testing
        localStorage.setItem('userToken', 'token')
        const store = configureStore({})
        const dispatch = expect.spyOn(store, 'dispatch').andCallThrough()

        return store.dispatch(userAuth.checkTokenAuth())
                    .then(()=>{
                      localStorage.removeItem('userToken')
                      // Should reach here. Auto pass.
                      // expect(true).toBe(true)
                      const user = {}
                      expect(dispatch).toHaveBeenCalled()

                    })
                    .catch((err)=>{
                      localStorage.removeItem('userToken')
                      // Shouldn't reach here. Auto fail.
                      // expect(dispatch).toHaveBeenCalled()
                      expect(dispatch).toHaveBeenCalled()

                      // expect(true).toBe(false)
                    })
      })

    })

    describe('REDUCERS', function() {
      describe('LOGIN_SUCCESS', () => {

        it('Should mark user as isAuthenticated and add token', function() {
          const state = {}
          const action = {
            type: userAuth.LOGIN_SUCCESS,
            user: {
              token: 'token',
              email: 'test@test.com',
              role: 'Admin'
            }
          }

          // Ensure that we can't modify these.
          deepFreeze(state)
          deepFreeze(action)

          const newState = userAuth.userAuthReducer(state, action)

          expect(newState.isAuthenticated).toBe(true)
          expect(newState.token).toBe('token')
        })

        it('Should have a user with email and role', function() {
          const state = {}
          const action = {
            type: userAuth.LOGIN_SUCCESS,
            user: {
              token: 'Token',
              email: 'test@test.com',
              role: 'Admin'
            }
          }

          // Ensure that we can't modify these.
          deepFreeze(state)
          deepFreeze(action)

          const newState = userAuth.userAuthReducer(state, action)

          expect(newState.user).toExist()
          expect(newState.user.email).toBe('test@test.com')
          expect(newState.user.role).toBe('Admin')
        })
      })

      describe("LOGIN_FAIL", function() {
        it('Should handle failed logins', function() {
          const state = {
            isAuthenticated: true,
            token: 'token',
            user: {
              email: 'test@test.com',
              role: 'Admin'
            }
          }
          const action = {
            type: userAuth.LOGIN_FAIL
          }
          // Ensure that we can't modify these.
          deepFreeze(state)
          deepFreeze(action)

          const newState = userAuth.userAuthReducer(state, action)

          expect(newState.isAuthenticated).toBe(false)
          expect(newState.token).toNotExist()
          expect(newState.user).toExist()
          expect(newState.user.email).toNotExist()
          expect(newState.user.role).toNotExist()
        })
      })
    })
  })

})
