import * as THREE from 'three';

export type TreeState = 'CHAOS' | 'FORMED';

export interface DualPosition {
  chaos: THREE.Vector3;
  target: THREE.Vector3;
}

export interface OrnamentData {
  chaosPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  scale: number;
  color: THREE.Color;
  speed: number; // For physics weight simulation
  rotationSpeed: THREE.Vector3;
}

export interface PolaroidData {
  chaosPos: THREE.Vector3;
  chaosOffset: THREE.Vector3; // Position relative to camera
  targetPos: THREE.Vector3;
  targetRot: THREE.Euler;
  url: string;
  speed: number;
}