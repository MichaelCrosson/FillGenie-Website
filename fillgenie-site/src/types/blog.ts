export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  audience: 'executive' | 'technical';
  content_type: 'news' | 'guide' | 'analysis';
  date: string;
  reading_time: string;
  author: string;
  excerpt: string;
  tags: string[];
  html_file: string;
}

export interface BlogMetadata {
  posts: BlogPost[];
  last_updated: string;
}
