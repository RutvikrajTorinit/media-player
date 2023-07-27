interface GET_SONGS_QUERY_PROPS {
  offset?: number;
  searchTerm?: string;
}

interface GET_SONGS_RES {
  resultCount: number;
  results: AUDIO[];
}
