export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  genres?: Genre[];          
  genre_ids?: number[];      
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language?: string;
  original_title?: string;
  video?: boolean;
  adult?: boolean;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  last_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  genres?: Genre[];
  genre_ids?: number[];      
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language?: string;
  origin_country?: string[];
}

export interface TVResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}


export interface Person {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
  also_known_as?: string[];
  gender?: number;
}

export interface PersonResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order?: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface RecommendationResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
