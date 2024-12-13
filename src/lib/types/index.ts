export interface StarCompletion {
    get_star_ts: number
    star_index?: number
  }
  
  export interface DayCompletion {
    1?: StarCompletion
    2?: StarCompletion
  }
  
  export interface Member {
    id: string
    name: string | null
    stars: number
    local_score: number
    global_score: number
    last_star_ts: number
    completion_day_level: {
      [key: string]: DayCompletion
    }
  }
  
  export interface AdventData {
    owner_id: number
    event: string
    members: {
      [key: string]: Member
    }
  }