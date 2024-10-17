import { getAllFilesFrontMatter } from '@/lib/mdx';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayout';
import { PageSEO } from '@/components/SEO';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ComponentProps } from 'react';
import axios from 'axios';
import { POSTS_PER_PAGE } from 'config';

export async function getStaticProps() {
  const response = await axios.get(
    'https://api.rss2json.com/v1/api.json?rss_url=https://hasnainzxc.medium.com/feed/',
  );
  if (response.data.status === 'ok') {
    const initialPosts = response.data.items;
    const pagination = {
      currentPage: 1,
      totalPages: Math.ceil(initialPosts.length / POSTS_PER_PAGE),
    };
    return {
      props: {
        posts: initialPosts,
        initialDisplayPosts: initialPosts,
        pagination,
      },
    };
  } else {
    console.error('Error fetching data:', response.data);
    return { props: { posts: [], initialPosts: [], pagination: null } };
  }
}

export default function Blog({
  posts,
  initialPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout
        initialPosts={initialPosts}
        pagination={pagination}
        title='Blog'
      />
    </>
  );
}
