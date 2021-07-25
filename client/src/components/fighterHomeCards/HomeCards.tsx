import React from 'react'
import { Link } from 'react-router-dom'
import { Fighter } from '../../types'
import "./homecard.styles.scss"

interface PropFighter {
  fighter: Fighter
}

const HomeCards = ({ fighter }: PropFighter) => {
  return (
    <div className="card_component">
      <Link
        to={`/fighter/${fighter._id}`}
      >
        <img src={`${fighter.image}`} />
        <p>{fighter.First_Name} {fighter.Last_Name}</p>
        <p>Record: {fighter.Record}</p>
      </Link>
    </div>
  )
}

export default HomeCards