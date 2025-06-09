import { Resource } from './types';
import { INITIAL_RESOURCES } from '../config/resources';

export function isMaterial(resourceId: string): boolean {
  const resource = INITIAL_RESOURCES[resourceId];
  return resource?.type === 'material';
}

export function isPart(resourceId: string): boolean {
  const resource = INITIAL_RESOURCES[resourceId];
  return resource?.type === 'part';
}

export function getResourceType(resourceId: string): 'material' | 'part' | 'currency' | undefined {
  return INITIAL_RESOURCES[resourceId]?.type;
} 