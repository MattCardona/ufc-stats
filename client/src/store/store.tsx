import axios from 'axios';
import { atom } from 'recoil'
import { Fighter } from '../types'


const setStatefun = async () => {
  try {
    const { data } = await axios.get("/fighters");
    return data
  } catch (error) {
    console.log(error.response);
    // need to do something here if error from backend
    // return undefined;
  }

}




export const fighterState = atom({
  key: "fighterState",
  default: setStatefun()
})


export const specificFighter = atom({
  key: "specificFighter",
  default: {} as Fighter
})