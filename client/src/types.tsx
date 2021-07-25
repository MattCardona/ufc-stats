interface RecLose {
  total?: number,
  knockouts?: number,
  submissions?: number,
  decisions?: number,
  others?: number
}

interface RecWins {
  total?: number,
  knockouts?: number,
  submissions?: number,
  decisions?: number,
  others?: number
}

export interface Fights {
  name?: string,
  date?: string,
  url?: string,
  result?: string,
  method?: string,
  referee?: string,
  round?: string,
  time?: string,
  opponent?: {
    name?: string,
    url?: string
  }
}

interface Strikes {
  _Acc: string | null | undefined,
  _Def: string | null | undefined,
}

interface Submissions {
  _Avg: string | null | undefined,
}

export interface Fighter {
  _id: string,
  First_Name: string,
  Last_Name: string,
  Nickname?: string | null | undefined,
  Record: string | null | undefined,
  Wins: string | null | undefined,
  Losses: string | null | undefined,
  Draws: string | null | undefined,
  Height: string | null | undefined,
  Weight: string | null | undefined,
  Reach: string | null | undefined,
  Stance: string | null | undefined,
  SLpM: string | null | undefined,
  Str: Strikes,
  SApM: string | null | undefined,
  TD_Avg: string | null | undefined,
  TD_Acc: string | null | undefined,
  TD_Def: string | null | undefined,
  Sub: Submissions,
  URL?: string,
  nick?: string,
  class?: string,
  extras?: {
    record: {
      wins: RecWins,
      losses: RecLose,
      no_contest?: string | undefined
    },
    fights: [
      Fights
    ]
  },
  image?: string | undefined
}

