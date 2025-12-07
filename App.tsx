import React, { useState } from 'react';
import Scene from './components/Scene.tsx';
import BackgroundMusic from './components/BackgroundMusic.tsx';
import { TreeState } from './types.ts';
import { POLAROID_IMAGES } from './constants.ts';

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeState>('FORMED');
  const [userImages, setUserImages] = useState<string[]>(POLAROID_IMAGES);
  const [isDragging, setIsDragging] = useState(false);

  const toggleState = () => {
    setTreeState(prev => prev === 'FORMED' ? 'CHAOS' : 'FORMED');
  };

  // --- Drag & Drop Handlers ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only disable if we are actually leaving the container, not just entering a child
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const newImageUrls: string[] = [];
      Array.from(files).forEach(file => {
        // Only accept images
        if (file.type.startsWith('image/')) {
          newImageUrls.push(URL.createObjectURL(file));
        }
      });
      
      if (newImageUrls.length > 0) {
        setUserImages(newImageUrls);
      }
    }
  };

  return (
    <div 
      className="w-full h-screen relative overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      
      {/* 3D Scene */}
      <Scene treeState={treeState} userImages={userImages} />

      {/* Audio Control */}
      <BackgroundMusic />

      {/* Dragging Overlay */}
      <div 
        className={`
          absolute inset-0 z-40 flex items-center justify-center
          bg-emerald-950/60 backdrop-blur-sm border-8 border-yellow-500/30 m-4 rounded-3xl
          transition-opacity duration-300 pointer-events-none
          ${isDragging ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="text-center transform scale-110">
          <h2 className="text-5xl md:text-7xl text-yellow-200 font-serif tracking-widest uppercase drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            Release
          </h2>
          <p className="text-yellow-100/80 tracking-[0.5em] mt-4 uppercase font-light">
            to Decorate
          </p>
        </div>
      </div>

      {/* UI Overlay */}
      <div className={`absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-8 z-10 transition-opacity duration-300 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Header */}
        <div className="flex flex-col items-center mt-4 drop-shadow-lg">
          <h1 className="text-4xl md:text-7xl text-yellow-400 font-bold tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] luxury-font text-center">
            Grand Christmas
          </h1>
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-4 mb-2"></div>
          <p className="text-yellow-100/80 font-light tracking-[0.3em] text-xs md:text-sm uppercase font-sans">
            Luxury Interactive Experience
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center mb-12 pointer-events-auto gap-4">
           {/* Main Toggle Button */}
           <button
             onClick={toggleState}
             className={`
               relative overflow-hidden group px-12 py-4 
               transition-all duration-700 ease-out
               border border-yellow-500/50 min-w-[280px]
               ${treeState === 'FORMED' 
                 ? 'bg-gradient-to-t from-red-950 to-red-900 text-red-100 hover:border-red-400 shadow-[0_0_30px_rgba(139,0,0,0.3)]' 
                 : 'bg-gradient-to-t from-yellow-950 to-yellow-900 text-yellow-100 hover:border-yellow-400 shadow-[0_0_30px_rgba(255,215,0,0.3)]'}
             `}
           >
             <span className="relative z-10 font-serif text-lg tracking-widest uppercase flex items-center justify-center gap-3">
               {treeState === 'FORMED' ? (
                 <>
                   <span>❖</span> Disassemble <span>❖</span>
                 </>
               ) : (
                 <>
                   <span>✦</span> Assemble Tree <span>✦</span>
                 </>
               )}
             </span>
             
             {/* Hover Glow Effect */}
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
           </button>
           
           <div className="mt-4 flex flex-col items-center gap-1 text-[10px] text-yellow-500/40 font-mono tracking-widest">
             <span>FIG. 01 — {treeState === 'FORMED' ? 'STATE: ORDER' : 'STATE: ENTROPY'}</span>
             <span className="opacity-50 mt-1">DRAG & DROP PHOTOS ANYWHERE TO DECORATE</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default App;