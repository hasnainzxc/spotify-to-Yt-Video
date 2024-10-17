import { Colors } from 'config/colors';
import { Deployment } from 'config/projects';
import React from 'react';
import { AiOutlineLink } from 'react-icons/ai';

interface DeploymentListProps {
  deployment: Deployment;
  deploymentMode: 'light' | 'dark'; // Add deployment mode prop
}

function DeploymentList(props: DeploymentListProps): React.ReactElement {
  const { deployment, deploymentMode } = props;

  function renderList(type: string): React.ReactNode {
    const background = Colors[type];
    const link = deployment[type];
    const textColor =
      deploymentMode === 'dark' ? 'text-white' : 'text-gray-900';

    return (
      <a
        className={`mr-2 flex items-center rounded-sm px-2 py-1 text-xs font-medium ${textColor}`}
        href={link}
        style={{ background }}
        target='_blank'
        rel='noopener noreferrer'
      >
        <AiOutlineLink className='mr-1' size={15} />
        {type}
      </a>
    );
  }

  return (
    <div className='flex'>
      {React.Children.toArray(Object.keys(deployment).map(renderList))}
    </div>
  );
}

export default DeploymentList;
