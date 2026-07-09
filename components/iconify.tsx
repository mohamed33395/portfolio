'use client';

import { Icon } from '@iconify/react';

interface IconifyProps {
  icon: string;
  width?: number;
  height?: number;
  className?: string;
  sx?: any;
}

export function Iconify({ icon, width = 24, height = 24, className, sx }: IconifyProps) {
  return <Icon icon={icon} width={width} height={height} className={className} style={sx} />;
}
