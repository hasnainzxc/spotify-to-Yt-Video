import Conditional from '@/components/Conditional';
import { H1, H2, H3 } from '@/components/Form';
import DeploymentList from '@/components/list/DeploymentList';
import StackList from '@/components/list/StackList';
import { PageSEO } from '@/components/SEO';
import config from 'config';
import type { Project, SubProject } from 'config/projects';
import { defaultDimensions } from 'config/projects';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import React, { useCallback } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

const { projects } = config;

export async function getStaticPaths() {
  return {
    paths: projects.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  project: Project;
}> = async ({ params }) => {
  const project = projects.find(project => project.slug === params.slug);

  return {
    props: {
      project,
    },
  };
};

export default function Project({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    title,
    description,
    shortDescription,
    banner,
    dimensions,
    stack,
    deployment,
    screenshots,
    subProjects,
    repository,
  } = project;

  const [height, width] = dimensions ?? defaultDimensions;

  const renderScreenShotList = useCallback(
    (screenshot: string) => {
      const style: React.CSSProperties = {
        height,
        width,
      };

      return (
        <div
          className='mr-2 flex-shrink-0 overflow-hidden rounded bg-placeholder-light p-1 dark:bg-placeholder-dark'
          style={style}
        >
          <Image
            loading='eager'
            src={screenshot}
            height={height}
            width={width}
            objectFit='cover'
            alt=''
          />
        </div>
      );
    },
    [height, width],
  );

  const renderSubProjectList = useCallback(
    ({ title, deployment, description, repository }: SubProject) => (
      <>
        <H3>{title}</H3>
        <Conditional condition={!!deployment}>
          <DeploymentList deployment={deployment} repository={repository} />
        </Conditional>
        <p className='mb-4 mt-2 font-light'>{description}</p>
      </>
    ),
    [],
  );

  const hasDeployments = !!deployment;
  const hasScreenshots = !!screenshots.length;
  const hasSubProjects = !!subProjects.length;

  const GOOGLE_DRIVE_BASE_URL = 'https://i.imgur.com/';

  return (
    <>
      <PageSEO
        title={title}
        description={shortDescription || description}
        imageUrl={banner}
      />

      {title === 'Darkblock' ? (
        <div className='relative' style={{ paddingTop: '56.25%' }}>
          <iframe
            className='absolute left-0 top-0 h-full w-full'
            src='https://www.youtube.com/embed/G0KIdNRg57Y'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className='relative mt-10 w-full md:h-36 lg:h-48'>
          <Image
            alt={title}
            src={banner}
            className='absolute h-full w-full object-cover object-center'
            layout='fill'
          />
        </div>
      )}

      <H1 className='lg:text-5x mb-4 mt-20 text-3xl font-bold dark:text-white'>
        {title}
      </H1>
      <p className='mb-4 font-light'>{description}</p>

      <H2>Tech</H2>
      <StackList stack={stack} />

      <Conditional condition={hasDeployments}>
        <H2>Product Page</H2>
        <DeploymentList deployment={deployment} repository={repository} />
      </Conditional>

      <Conditional condition={hasScreenshots}>
        <H2 className='my-4'>Screenshots</H2>
        <ScrollContainer
          className='list mb-1 mt-4 flex overflow-auto'
          hideScrollbars={false}
        >
          {React.Children.toArray(
            screenshots.map(id =>
              renderScreenShotList(GOOGLE_DRIVE_BASE_URL + id),
            ),
          )}
        </ScrollContainer>
      </Conditional>

      <Conditional condition={hasSubProjects}>
        <H2 className='mt-10'>Sub Products</H2>
        {React.Children.toArray(subProjects.map(renderSubProjectList))}
      </Conditional>
    </>
  );
}
