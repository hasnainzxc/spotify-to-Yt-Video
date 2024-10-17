import { Colors } from 'config/colors';
import { Deployment } from 'config/projects';
import React from 'react';
import { AiOutlineLink } from 'react-icons/ai';

interface DeploymentListProps {
  deployment: Deployment;
}

function DeploymentList(props: DeploymentListProps): React.ReactElement {
  const { deployment } = props;

  function renderList(type: string): React.ReactNode {
    const background = Colors[type];
    const link = deployment[type];

    const textColor = determineTextColor(background);

    return (
      <a
        className='mr-2 flex items-center rounded-sm px-2 py-1 text-xs font-medium'
        href={link}
        style={{ background, color: textColor }}
        target='_blank'
        rel='noopener noreferrer'
      >
        <AiOutlineLink className='mr-1' size={15} />
        {type}
      </a>
    );
  }

  function determineTextColor(backgroundColor: string): string {
    // Check the background color's brightness
    // You can adjust the threshold value as needed
    const brightnessThreshold = 150;
    const brightness = getBrightness(backgroundColor);

    return brightness < brightnessThreshold ? '#FFFFFF' : '#000000';
  }

  function getBrightness(color: string): number {
    // Convert color to RGB
    const rgb = hexToRgb(color);
    // Calculate brightness using relative luminance formula
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      };
    }
    return { r: 0, g: 0, b: 0 };
  }

  return <div className='flex'>{Object.keys(deployment).map(renderList)}</div>;
}

export default DeploymentList;
