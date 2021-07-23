import "./fighterstats.styles.scss"
import React, { useState, useEffect } from 'react'
import PieChart from '../pieChart/PieChart';
import MyResponsiveBar from "../chart/Chart";
import { Fighter, Fights } from "../../types"
import SideBarTwo from '../sidebav/SideBarTwo';
import { useRecoilState } from "recoil";
import { specificFighter } from "../../store/store";
import axios from "axios";
const Fade = require('react-reveal/Fade')


interface Strikes {
  _Acc?: string | null | undefined,
  _Def?: string | null | undefined,
}

// need explanation by the team
// if i take off null stops working
interface Strike {
  id: string,
  label: string,
  value?: string | number | null
}


interface Props {
  params: any
}

interface FighterStatsProps {
  match: Props,
  location: any,
  fighter: Fighter
}

interface TakeDown {
  id: string,
  label: string,
  value?: string | number | null
}

interface Record {
  id: string,
  label: string,
  value?: string | number | null
}
interface ToggleState {
  strike: boolean,
  defense: boolean,
  bio: boolean
}

let RecLose = {
  total: 0,
  knockouts: 0,
  submissions: 0,
  decisions: 0,
  others: 0
}

let RecWins = {
  total: 0,
  knockouts: 0,
  submissions: 0,
  decisions: 0,
  others: 0
}

let deFights = {
  name: "",
  date: "",
  url: "",
  result: "",
  method: "",
  referee: "",
  round: "",
  time: "",
  opponent: {
    name: "",
    url: ""
  }
}

let defStrikes = {
  _Acc: "",
  _Def: "",
}

let defSubmissions = {
  _Avg: "",
}

let defaultFighter = {
  _id: "",
  First_Name: "",
  Last_Name: "",
  Nickname: "",
  Record: "",
  Wins: "",
  Losses: "",
  Draws: "",
  Height: "",
  Weight: "",
  Reach: "",
  Stance: "",
  SLpM: "",
  Str: defStrikes,
  SApM: "",
  TD_Avg: "",
  TD_Acc: "",
  TD_Def: "",
  Sub: defSubmissions,
  URL: "",
  nick: "",
  class: "",
  extras: {
    record: {
      wins: RecWins,
      losses: RecLose,
      no_contest: ""
    },
    fights: [
      deFights
    ]
  }
}

const FighterStats = (props: FighterStatsProps) => {
  let defaultToggleState = { strike: false, defense: false, bio: false }
  const [getUserById, setUserById] = useRecoilState(specificFighter)
  let [fighter, setfighter] = useState(defaultFighter as Fighter)
  let [formateStrike, setformateStrike] = useState<Strike[]>([])
  let [takeDownData, settakeDownData] = useState<TakeDown[]>([])
  let [record, setrecord] = useState<Record[]>([])
  let [recordWins, setrecordWins] = useState<Record[]>([])
  let [recordLosses, setRecordLosses] = useState<Record[]>([])
  let [toggle, setToggle] = useState(defaultToggleState as ToggleState);

  useEffect(() => {
    if (!getUserById._id) {
      getFighter()
    } else if (!fighter._id) {
      setfighter(getUserById)
    } else if (fighter && getUserById._id && fighter.extras) {
      formatDataForStrikes(fighter.Str);
      formatDataForTakeDown(fighter["TD_Avg"], fighter["TD_Acc"], fighter["TD_Def"])
      formatDataForRecord(fighter.extras.record.wins.total, fighter.extras.record.losses.total, fighter.extras.record.no_contest)
      formatDataForRecordWins(fighter.extras.record.wins.knockouts, fighter.extras.record.wins.submissions, fighter.extras.record.wins.decisions)
      formatDataForRecordLoses(fighter.extras.record.losses.knockouts, fighter.extras.record.losses.submissions, fighter.extras.record.losses.decisions)
      toggleStats("bio")
      return function cleanup() {
        // console.log("called clean up")
        setUserById(defaultFighter as Fighter)
      };
    }
  }, [getUserById, fighter])
  let getFighter = async () => {
    try {
      let { data } = await axios.get(`/fighters/${props.match.params.id}`);
      // console.log(data)
      await setUserById(data);
      await getUserById;
    } catch (error) {
      console.log("There was a error")
    }

  }
  const formatDataForRecordLoses = (knockouts: number | undefined, submissions: number | undefined, decisions: number | undefined) => {
    let data = [{
      id: "KO",
      label: "KO",
      value: knockouts
    },
    {
      id: "Sub",
      label: "Submission",
      value: submissions
    },
    {
      id: "Decisions",
      label: "Decisions",
      value: decisions
    }
    ];
    setRecordLosses(data);
  }
  const formatDataForRecordWins = (knockouts: number | undefined, submissions: number | undefined, decisions: number | undefined) => {
    let data = [{
      id: "KO",
      label: "KO",
      value: knockouts
    },
    {
      id: "Sub",
      label: "Submission",
      value: submissions
    },
    {
      id: "Decisions",
      label: "Decisions",
      value: decisions
    }
    ];
    setrecordWins(data);
  }
  const formatDataForRecord = (wins: number | undefined, losses: number | undefined, no_contests: string | undefined) => {
    let data = [{
      id: "Wins",
      label: "Wins",
      value: wins
    },
    {
      id: "Losses",
      label: "Losses",
      value: losses
    },
    {
      id: "No Contests",
      label: "No Contests",
      value: no_contests
    }
    ];
    setrecord(data);
  }
  const formatDataForStrikes = (ufcFighterStr: Strikes) => {
    let data = [{
      id: "Strike Accuracy",
      label: "Strike Accuracy",
      value: Math.min(Number(ufcFighterStr["_Acc"]))
    },
    {
      id: "Strike Defense",
      label: "Strike Defense",
      value: Math.min(Number(ufcFighterStr["_Def"]))
    }
    ];
    setformateStrike(data)
  }
  const formatDataForTakeDown = (tdAvg: Fighter["TD_Avg"], tdAcc: Fighter["TD_Acc"], tdDef: Fighter["TD_Def"]) => {
    let data = [{
      "id": "TD Acc",
      "label": "Take Down Accuracy",
      "value": tdAcc
    },
    {
      "id": "TD Def",
      "label": "Take Down Defense",
      "value": tdDef,
    },
    {
      "id": "TD Avg",
      "label": "Take Down Average",
      "value": tdAvg,
    }
    ]
    settakeDownData(data);
  }
  const toggleStats = (type: string) => {
    switch (type) {
      case "strikes":

        setToggle(defaultToggleState)
        setTimeout(() => { setToggle({ ...defaultToggleState, strike: true }) }, 500)
        break;
      case "defense":
        setToggle(defaultToggleState)
        setTimeout(() => { setToggle({ ...defaultToggleState, defense: true }) }, 500)
        break;
      case "bio":
        setToggle(defaultToggleState)
        setTimeout(() => { setToggle({ ...defaultToggleState, bio: true }) }, 500)
        break;
      case "all_stats":
        setToggle(defaultToggleState)
        setTimeout(() => { setToggle({ defense: true, strike: true, bio: true }) }, 500)
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <SideBarTwo toggle={toggleStats} />
      <div
        id="stats_main"

      >

        <h1>{fighter.First_Name} {fighter.Last_Name}</h1>
        {fighter.nick && <p>AKA: {fighter.nick}</p>}
        <h3>{fighter["Record"]}</h3>

        {toggle.bio && !toggle.defense && !toggle.strike &&
          <>
            <Fade bottom wait={1000} >
              <div className="stats_box">
                <PieChart data={record} text="Record" />
                <div>
                  <div className="fighter_box_bio">
                    <h3>Weight Class {fighter.class}</h3>
                    <ul
                      style={{
                        listStyle: "none"
                      }}
                    >
                      <li><p>Wins: {fighter.extras?.record.wins.total} Loses: {fighter.extras?.record.losses.total} Draws: {fighter.Draws}</p></li>
                      <li><p>Weight: {fighter.Weight} lbs</p></li>
                      <li><p>Reach: {fighter.Reach}</p></li>
                      <li><p>Stance: {fighter.Stance}</p></li>
                    </ul>
                  </div>
                </div>
              </div>
            </Fade>
            <Fade bottom wait={1000} >
              <div className="stats_box">
                <PieChart data={recordWins} text="Wins" />
                <PieChart data={recordLosses} text="Losses" />
              </div>
            </Fade>

            <div id="past_fights">
              <h2>Past Fights</h2>
              <div className="past_fights_box_top">
                <p>Fight</p>
                <p>Date</p>
                <p>Result</p>
                <p>Method</p>
                <p>Round</p>
              </div>
              {fighter.extras?.fights && fighter.extras?.fights.map((fight: Fights) => {
                return (<div key={fight.name} className="past_fights_box">
                  <p>{fight.name}</p>
                  <p>{fight.date}</p>
                  <p>{fight.result}</p>
                  <p>{fight.method}</p>
                  <p>{fight.round}</p>
                  {/* {fight.opponent.name && <p>fight.opponent.name</p>} */}
                </div>)
              })}
            </div>

          </>
        }


        {toggle.bio && toggle.defense && toggle.strike &&
          <Fade bottom wait={1000}>
            <div className="stats_box">
              <PieChart data={record} text="Record" />
            </div>
          </Fade>
        }

        {takeDownData.length && toggle.defense &&
          <Fade bottom wait={1000}>
            <div className="stats_box">
              <PieChart data={takeDownData} text="Takedown accuracy" />
            </div>
          </Fade>
        }


        {formateStrike.length && toggle.strike && (
          <Fade bottom wait={1000} >

            <div className="stats_box">
              <PieChart data={formateStrike} text={formateStrike[0]["id"]} />
              <MyResponsiveBar data={[{
                catagory: "strikes",
                'Sig.Str_Landed': fighter.SLpM || 0,
                'Sig.Str_Absorbed': fighter.SApM || 0
              }
              ]} />
            </div>
          </Fade>
        )
        }
      </div>

    </div >
  )
}

export default FighterStats;