import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { BlogPost as BlogPostType } from '../types/blog';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Load metadata
        const metadataResponse = await fetch('/blog-metadata.json');
        const metadata = await metadataResponse.json();
        const foundPost = metadata.posts.find((p: BlogPostType) => p.slug === slug);

        if (!foundPost) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }

        setPost(foundPost);

        // Load HTML content
        const htmlResponse = await fetch(`/posts/${foundPost.html_file}`);
        const htmlText = await htmlResponse.text();
        setHtmlContent(htmlText);
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <Section background="white" className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-text-muted">Loading...</p>
        </div>
      </Section>
    );
  }

  if (error || !post) {
    return (
      <Section background="white" className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-600 mb-4">{error || 'Post not found'}</p>
          <Button variant="secondary" to="/blog">
            Back to Blog
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <Section background="warm-sand" className="py-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sunlit-amber hover:text-text-main transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </Section>

      {/* Article Header */}
      <Section background="white" className="py-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                post.audience === 'executive' 
                  ? 'bg-lavender-mist bg-opacity-20 text-lavender-mist' 
                  : 'bg-teal-softwave bg-opacity-20 text-teal-softwave'
              }`}>
                {post.audience === 'executive' ? 'Executive' : 'Technical'}
              </span>
              <span className="text-text-muted text-sm">{post.reading_time}</span>
              <span className="text-text-muted text-sm">•</span>
              <span className="text-text-muted text-sm">{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <h1 className="text-4xl font-bold text-text-main mb-4">{post.title}</h1>
            <p className="text-xl text-text-muted">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-warm-sand rounded text-sm text-text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </Section>
    </div>
  );
};
