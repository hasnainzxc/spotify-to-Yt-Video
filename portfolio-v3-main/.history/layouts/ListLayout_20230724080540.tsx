import { Header } from '@/components/Form';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import Tag from '@/components/Tag';
import formatDate from '@/lib/utils/formatDate';
import { ComponentProps, useState, useEffect } from 'react';
import { BsFilterLeft as FilterIcon } from 'react-icons/bs';
import { PostFrontMatter } from 'types/PostFrontMatter';
import axios from 'axios';

interface Props {
  post: string;
  title: string;
  initialPosts?: PostFrontMatter[];
  pagination?: ComponentProps<typeof Pagination>;
}

interface MediumPost {
  post: string;
  title: string;
  pubDate: string;
  link: string;
  categories: string[]; // Correctly define categories as an array of strings
  description: string;
  initialPosts?: PostFrontMatter[];
  pagination?: ComponentProps<typeof Pagination>;
}

export default function ListLayout({
  title,
  initialPosts = [],
  pagination,
}: Props) {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Fetch data from your Medium blog URL
    axios
      .get(
        'https://api.rss2json.com/v1/api.json?rss_url=https://hasnainzxc.medium.com/feed/',
      )
      .then(response => {
        if (response.data.status === 'ok') {
          setPosts(response.data.items);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredPosts = posts.filter(post => {
    const searchContent =
      post.title + post.description + post.categories.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayPosts =
    initialPosts.length > 0 && !searchValue ? initialPosts : filteredPosts;

  return (
    <>
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title={title}>
          <div className='relative max-w-lg'>
            <input
              aria-label='Search articles'
              type='text'
              onChange={({ target }) => setSearchValue(target.value)}
              placeholder='Search articles'
              className='focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
            />
            <svg
              className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <Link
              href='/tags'
              className='absolute right-10 top-2 text-gray-400 dark:text-gray-300'
            >
              <FilterIcon size={30} />
            </Link>
          </div>
        </Header>

        <ul>
          {/* {!filteredBlogPosts.length && (
            <p className='mt-8 text-center'>No posts found</p>
          )} */}
          {displayPosts.map(frontMatter => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className='py-4'>
                <article className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                  <dl>
                    <dt className='sr-only'>Published on</dt>
                    <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className='space-y-3 xl:col-span-3'>
                    <div>
                      <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                        <Link
                          href={`/blog/${slug}`}
                          className='text-gray-900 dark:text-gray-100'
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className='flex flex-wrap'>
                        {tags.map(tag => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}
