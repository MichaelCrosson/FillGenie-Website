import React, { useEffect, useState, useRef } from 'react';
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
  const contentRef = useRef<HTMLDivElement>(null);

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

        // Load HTML content - use html_file if provided, otherwise construct from slug
        const htmlFile = foundPost.html_file || `${foundPost.slug}.html`;
        const htmlResponse = await fetch(`/posts/${htmlFile}`);
        if (!htmlResponse.ok) {
          throw new Error(`Failed to load HTML content: ${htmlResponse.status}`);
        }
        let htmlText = await htmlResponse.text();
        
        // Extract only the body content and strip unwanted styles
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const bodyContent = doc.querySelector('body') || doc.documentElement;
        
        // Remove style tags and inline styles that might override our theme
        bodyContent.querySelectorAll('style').forEach(el => el.remove());
        bodyContent.querySelectorAll('[style]').forEach(el => {
          el.removeAttribute('style');
        });
        
        setHtmlContent(bodyContent.innerHTML);
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  // Add copy buttons to code blocks after content loads
  useEffect(() => {
    if (!contentRef.current || !htmlContent) return;

    const codeBlocks = contentRef.current.querySelectorAll('pre');
    codeBlocks.forEach((pre) => {
      // Skip if button already exists
      if (pre.querySelector('.copy-button')) return;

      // Get the code element inside pre
      const codeElement = pre.querySelector('code');
      const codeText = codeElement ? codeElement.textContent : pre.textContent;

      const button = document.createElement('button');
      button.className = 'copy-button';
      button.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 0.5rem; background-color: #D98C4A; color: white; font-size: 0.875rem; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s; z-index: 10;';
      button.innerHTML = `<svg style="width: 1rem; height: 1rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><span>Copy</span>`;
      
      button.onmouseover = () => {
        button.style.backgroundColor = '#c17a3d';
      };
      
      button.onmouseout = () => {
        if (!button.classList.contains('copied')) {
          button.style.backgroundColor = '#D98C4A';
        }
      };
      
      button.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
          await navigator.clipboard.writeText(codeText || '');
          button.innerHTML = `<svg style="width: 1rem; height: 1rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Copied!</span>`;
          button.style.backgroundColor = '#6BA4A6';
          button.classList.add('copied');
          setTimeout(() => {
            button.innerHTML = `<svg style="width: 1rem; height: 1rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><span>Copy</span>`;
            button.style.backgroundColor = '#D98C4A';
            button.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          button.innerHTML = `<svg style="width: 1rem; height: 1rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg><span>Error</span>`;
        }
      };

      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  }, [htmlContent]);

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
      <Section background="warm-sand" className="py-1">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sunlit-amber hover:text-text-main transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </Section>

      {/* Article Header */}
      <Section background="white" className="py-2">
        <article className="max-w-4xl mx-auto">
          <header className="mb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                post.audience === 'executive' 
                  ? 'bg-lavender-mist bg-opacity-20 text-lavender-mist' 
                  : 'bg-teal-softwave bg-opacity-20 text-teal-softwave'
              }`}>
                {post.audience === 'executive' ? 'Executive' : 'Technical'}
              </span>
              <span className="text-text-muted text-sm">{post.reading_time} min read</span>
              <span className="text-text-muted text-sm">•</span>
              <span className="text-text-muted text-sm">
                {post.date ? new Date(post.date).toLocaleDateString() : 
                 post.created_at ? new Date(post.created_at).toLocaleDateString() : 
                 'Recent'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-main mb-2">{post.title}</h1>
            <p className="text-base sm:text-lg text-text-muted">{post.excerpt || ''}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {(post.tags || post.keywords || []).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-warm-sand rounded text-sm text-text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-warm-sand">
            <div 
              ref={contentRef}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </article>
      </Section>
    </div>
  );
};
