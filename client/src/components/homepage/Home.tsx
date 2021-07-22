import React from 'react'
import { useRecoilValue } from 'recoil';
import { Fighter } from '../../types';
import { fighterState } from '../../store/store';
import HomeCards from '../fighterHomeCards/HomeCards';
import "./home.styles.scss"


const Home = () => {
  const getFighters = useRecoilValue(fighterState)
  return (
    <div id="home_page">
      {getFighters && getFighters.map((fighter: Fighter) => <HomeCards key={fighter._id} fighter={fighter} />)}
    </div>
  )
}

export default Home;