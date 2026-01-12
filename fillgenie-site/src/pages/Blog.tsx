import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { 
  DocumentTextIcon,
  ClockIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import type { BlogPost as BlogPostType, BlogMetadata } from '../types/blog';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostType[]>([]);
  const [filter, setFilter] = useState<'all' | 'executive' | 'technical'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/blog-metadata.json');
        if (!response.ok) {
          throw new Error(`Failed to load blog metadata: ${response.status}`);
        }
        const data: BlogMetadata = await response.json();
        setPosts(data.posts);
        setFilteredPosts(data.posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.audience === filter));
    }
  }, [filter, posts]);

  return (
    <div>
      {/* Hero Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            FillFlow Blog
          </h1>
          <p className="text-xl text-text-muted mb-8">
            Insights on automation, AI innovations, productivity, and the latest tech trends.
          </p>
        </div>
      </Section>

      {/* Filter Section */}
      <Section background="white" className="py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-text-muted" />
              <span className="text-text-muted font-medium">Filter by:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-sunlit-amber text-white'
                    : 'bg-warm-sand text-text-main hover:bg-sunlit-amber hover:text-white'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setFilter('executive')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'executive'
                    ? 'bg-lavender-mist text-white'
                    : 'bg-warm-sand text-text-main hover:bg-lavender-mist hover:text-white'
                }`}
              >
                Executive
              </button>
              <button
                onClick={() => setFilter('technical')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'technical'
                    ? 'bg-teal-softwave text-white'
                    : 'bg-warm-sand text-text-main hover:bg-teal-softwave hover:text-white'
                }`}
              >
                Technical
              </button>
            </div>
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-text-muted">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Card>
                <div className="flex flex-col items-center py-8">
                  <div className="bg-lavender-mist bg-opacity-20 p-6 rounded-full mb-6">
                    <DocumentTextIcon className="w-16 h-16 text-lavender-mist" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main mb-4">
                    No Posts Found
                  </h2>
                  <p className="text-text-muted mb-6 max-w-xl">
                    No posts match the selected filter. Try a different filter option.
                  </p>
                </div>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.slug}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.audience === 'executive' 
                          ? 'bg-lavender-mist bg-opacity-20 text-lavender-mist' 
                          : 'bg-teal-softwave bg-opacity-20 text-teal-softwave'
                      }`}>
                        {post.audience === 'executive' ? 'Executive' : 'Technical'}
                      </span>
                      <div className="flex items-center gap-1 text-text-muted text-sm">
                        <ClockIcon className="w-4 h-4" />
                        <span>{post.reading_time} min read</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-text-main mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-text-muted mb-4 line-clamp-3 flex-grow">
                      {post.excerpt || 'Click to read more about this topic...'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(post.tags || post.keywords || []).slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-warm-sand rounded text-xs text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-warm-sand">
                      <span className="text-sm text-text-muted">
                        {post.date ? new Date(post.date).toLocaleDateString() : 
                         post.created_at ? new Date(post.created_at).toLocaleDateString() : 
                         'Recent'}
                      </span>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="text-sunlit-amber hover:text-text-main font-medium text-sm transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};
