import * as THREE from 'three';

// Tree Dimensions
export const TREE_HEIGHT = 12;
export const TREE_RADIUS = 5.5;
export const CHAOS_RADIUS = 25; // How far items scatter

// Counts
export const FOLIAGE_COUNT = 15000;
export const ORNAMENT_COUNT = 150; // Baubles
export const GIFT_COUNT = 25;      // Heavy boxes
export const LIGHT_COUNT = 400;    // Tiny lights
export const POLAROID_COUNT = 24;

// Colors
export const COLOR_EMERALD = new THREE.Color("#004225"); // Darker British Racing Green
export const COLOR_EMERALD_LIGHT = new THREE.Color("#2E8B57");
export const COLOR_GOLD_LIGHT = new THREE.Color("#FFD700");
export const COLOR_GOLD_DARK = new THREE.Color("#DAA520");
export const COLOR_RED_VELVET = new THREE.Color("#800020");
export const COLOR_SILVER = new THREE.Color("#C0C0C0");
export const COLOR_WARM_WHITE = new THREE.Color("#FFFDD0");

// Animation
export const ANIMATION_SPEED = 2.5;

// Texture Placeholders for Polaroids (Local Images)
// Simple filenames assuming they are served from the same root as index.html
export const POLAROID_IMAGES = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg'
];