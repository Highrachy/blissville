import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Button from '@/components/forms/Button';
import { ArrowRight } from '@/components/Icons/Icons';
import BLOG_POSTS from '@/data/blog';

export default function BlogSection({
  showLastPosts = false,
  hideLinkButton = false,
}) {
  const sortedPosts = BLOG_POSTS.reverse();
  const postsToShow = showLastPosts ? sortedPosts.slice(0, 4) : sortedPosts;

  return (
    <section className="py-6">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Insights &amp; Articles</h2>

          {!hideLinkButton && (
            <Link href="/blog" passHref>
              <Button color="secondary" className="btn-sm">
                View all articles{' '}
              </Button>
            </Link>
          )}
        </div>

        <div className="row g-4">
          {postsToShow.map((post) => (
            <div key={post.id} className="col-md-6 d-flex">
              <div className="blog-card h-100 w-100 d-flex flex-column">
                <div className="blog-card-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={500}
                    className="img-fluid"
                  />
                </div>

                <div className="blog-card-body d-flex flex-column">
                  <h5 className="fw-bold mb-2">{post.title}</h5>

                  <p className="text-muted mb-4">{post.excerpt}</p>

                  <div className="mt-auto">
                    <Link href={post.slug} passHref>
                      <Button
                        color="dark"
                        className="d-inline-flex align-items-center"
                      >
                        Read More&nbsp;
                        <ArrowRight className="ms-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
