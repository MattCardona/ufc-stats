import "./fighterstats.styles.scss"
import React, { useState, useEffect } from 'react'
import PieChart from '../pieChart/PieChart';
import { Link } from "react-router-dom";
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

interface Submissions {
  _Avg: string | null | undefined,
}

// interface Fighter {
//   id: number,
//   First_Name: string,
//   Last_Name: string,
//   Nickname?: string | null | undefined,
//   Record: string | null | undefined,
//   Wins: string | null | undefined,
//   Losses: string | null | undefined,
//   Draws: string | null | undefined,
//   Height: string | null | undefined,
//   Weight: string | null | undefined,
//   Reach: string | null | undefined,
//   Stance: string | null | undefined,
//   SLpM: string | null | undefined,
//   Str: Strikes,
//   SApM: string | null | undefined,
//   TD_Avg: string | null | undefined,
//   TD_Acc: string | null | undefined,
//   TD_Def: string | null | undefined,
//   Sub: Submissions,
//   URL?: string
//   nick: string
// }

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
// interface Toggler {
//   strikes: boolean,
//   defense: boolean
// }
interface ToggleState {
  strike: boolean,
  defense: boolean,
  bio: boolean
}

const FighterStats = (props: FighterStatsProps) => {
  let defaultToggleState = { strike: false, defense: false, bio: false }
  let [fighter, setfighter] = useState(props.location.state.fighter)
  let [strikeData, setStrikeData] = useState<Strikes>(fighter.Str);
  let [formateStrike, setformateStrike] = useState<Strike[]>([])
  let [takeDownData, settakeDownData] = useState<TakeDown[]>([])
  let [record, setrecord] = useState<Record[]>([])
  let [recordWins, setrecordWins] = useState<Record[]>([])
  let [recordLosses, setRecordLosses] = useState<Record[]>([])
  let [toggle, setToggle] = useState(defaultToggleState as ToggleState);
  const [getUserById, setUserById] = useRecoilState(specificFighter)

  useEffect(() => {
    // console.log(toggle)
    formatDataForStrikes(strikeData);
    formatDataForTakeDown(fighter["TD_Avg"], fighter["TD_Acc"], fighter["TD_Def"])
    formatDataForRecord(fighter.extras.record.wins.total, fighter.extras.record.losses.total, fighter.extras.record.no_contests = 0)
    formatDataForRecordWins(fighter.extras.record.wins.knockouts, fighter.extras.record.wins.submissions, fighter.extras.record.wins.decisions)
    formatDataForRecordLoses(fighter.extras.record.losses.knockouts, fighter.extras.record.losses.submissions, fighter.extras.record.losses.decisions)
    getFighter();
    toggleStats("bio")
  }, [])
  let getFighter = async () => {
    try {
      let { data } = await axios.get(`/fighters/${props.match.params.id}`);
      console.log(data)
    } catch (error) {
      console.log("There was a error")
    }

  }
  const formatDataForRecordLoses = (knockouts: number, submissions: number, decisions: number) => {
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
  const formatDataForRecordWins = (knockouts: number, submissions: number, decisions: number) => {
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
  const formatDataForRecord = (wins: number, losses: number, no_contests: number) => {
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
    // console.log(data, "form")
    // formatedStrike = data
    setformateStrike(data)
    // console.log(formatedStrike, "form")
  }
  const formatDataForTakeDown = (tdAvg: Fighter["TD_Avg"], tdAcc: Fighter["TD_Acc"], tdDef: Fighter["TD_Def"]) => {
    // console.log(ufcFighterStr["Acc"]);
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
    // this.setState(() => ({
    //   takeDownData: [...data]
    // }))
  }
  const toggleStats = (type: string) => {
    switch (type) {
      case "strikes":
        // setshowStrikes(!showStrikes);
        setToggle(defaultToggleState)
        setTimeout(() => { setToggle({ ...defaultToggleState, strike: true }) }, 500)
        // setToggle({ ...defaultToggleState, strike: true })
        break;
      case "defense":
        setToggle(defaultToggleState)
        setTimeout(() => { setToggle({ ...defaultToggleState, defense: true }) }, 500)
        // setToggle({ ...defaultToggleState, defense: true })
        break;
      case "bio":
        setToggle(defaultToggleState)
        setTimeout(() => { setToggle({ ...defaultToggleState, bio: true }) }, 500)
        // setToggle({ ...defaultToggleState, defense: true })
        break;
      case "all_stats":
        setToggle(defaultToggleState)
        setTimeout(() => { setToggle({ defense: true, strike: true, bio: true }) }, 500)
        break;
      default:
        break;
    }
    // setshowStrikes(!showStrikes);
  }
  // const { fighter, strikeData, takeDownData } = this.state;
  // const { fighter, strikeData, takeDownData } = this.state;
  // console.log(formatedStrike, "formaed")
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
                      <li><p>Wins: {fighter.extras.record.wins.total} Loses: {fighter.extras.record.losses.total} Draws: {fighter.Draws}</p></li>
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

            <div
              style={{
                border: "2px solid green",
                display: "flex",
                flexDirection: "column",
                margin: "10px"
                // justifyContent: "center"
              }}
            >
              {fighter.extras.fights && fighter.extras.fights.map((fight: Fights) => {
                return (<div style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignContent: "space-between",
                  border: "3px solid blue",
                  margin: "1px 0px"

                }}
                >
                  <p
                    style={{ border: "1px solid red", width: "20%", margin: "10px" }}
                  >{fight.name}</p>
                  <p style={{ border: "1px solid red", width: "20%", margin: "10px" }}>{fight.date}</p>
                  <p style={{ border: "1px solid red", width: "20%", margin: "10px" }}>{fight.result}</p>
                  <p style={{ border: "1px solid red", width: "20%", margin: "10px" }}>{fight.method}</p>
                  <p style={{ border: "1px solid red", width: "20%", margin: "10px" }}>{fight.round}</p>
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


      <div>
        {/* {fighter.extras.record.wins && <p>{fighter.extras.record.wins.knockouts}</p>} */}
      </div>

    </div >
  )
}

export default FighterStats;