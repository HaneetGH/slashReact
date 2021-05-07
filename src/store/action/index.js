import {SAVE_USER,CLEAR,TOKEN,MESSAGE,PROFILE_IMAGE,PLAYER_ID} from './actionTypes'

export const saveUserData = data => ({
    type: SAVE_USER,
    payload: data
  });



  export const saveUserProfile = data => ({
    type: PROFILE_IMAGE,
    payload: data
  });




  export const clear = () => ({
    type: CLEAR
  });