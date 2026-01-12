export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  audience: 'executive' | 'technical';
  content_type?: 'news' | 'guide' | 'analysis';
  date?: string;
  created_at?: string;
  reading_time: string | number;
  author?: string;
  excerpt?: string;
  tags?: string[];
  keywords?: string[];
  html_file?: string;
  word_count?: number;
}

export interface BlogMetadata {
  posts: BlogPost[];
  last_updated?: string;
}
