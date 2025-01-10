export interface PostItem {
  author: string;
  story_title?: string;
  title?: string;
  story_url?: string;
  url?: string;
  story_id: number;
  created_at: string;
  created_ai_i: number;
  num_comments: number;
  points: number;
  objectID: string;
}

export interface Posts {
  hits: PostItem[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  query: string;
  params: string;
}
