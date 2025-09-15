import React, { useRef } from 'react'
import { useWorldState } from '../hooks/useWorldState'
import { getRandomPosition } from '../utils/randomPosition'

export default function Controls() {
  const { addObject, toggleWind, windEnabled, progressAutumn, autumnStage, isTransitioning } = useWorldState()
  const buttonRef = useRef()
  
  const addRandomPumpkin = () => {
    const position = getRandomPosition(2.5)
    position[1] = 0
    
    addObject({
      id: Date.now() + Math.random(),
      type: 'pumpkin',
      position,
      isNew: true
    })
  }
  
  const addRandomTree = () => {
    const position = getRandomPosition(2.5)
    position[1] = 0
    
    // Add slight random offset to position for natural placement
    position[0] += (Math.random() - 0.5) * 0.3
    position[2] += (Math.random() - 0.5) * 0.3
    
    addObject({
      id: Date.now() + Math.random(),
      type: 'tree',
      position,
      isNew: true,
      seed: Math.random() * 1000 // Add seed for consistent randomization
    })
  }
  
  const handleProgressAutumn = () => {
    if (!isTransitioning) {
      if (autumnStage >= 3) {
        // Bounce animation when maxed out
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'scale(1.2)'
          setTimeout(() => {
            if (buttonRef.current) {
              buttonRef.current.style.transform = 'scale(1)'
            }
          }, 200)
        }
        return
      }
      progressAutumn()
    }
  }
  
  const getAutumnButtonStyle = () => {
    const stages = [
      { bg: 'bg-green-200 hover:bg-green-300', text: 'text-green-800', icon: '🌱' },
      { bg: 'bg-yellow-200 hover:bg-yellow-300', text: 'text-yellow-800', icon: '🍃' },
      { bg: 'bg-orange-200 hover:bg-orange-300', text: 'text-orange-800', icon: '🍂' },
      { bg: 'bg-red-200 hover:bg-red-300', text: 'text-red-800', icon: '🍁' }
    ]
    
    if (isTransitioning) {
      return {
        bg: 'bg-amber-300',
        text: 'text-amber-900',
        icon: '✨',
        extra: 'cursor-not-allowed animate-pulse'
      }
    }
    
    if (autumnStage >= 3) {
      return {
        ...stages[3],
        extra: 'opacity-75 cursor-not-allowed'
      }
    }
    
    return stages[autumnStage]
  }
  
  const buttonStyle = getAutumnButtonStyle()
  const tooltips = [
    "Start Autumn",
    "Deepen Colors", 
    "Rich Autumn",
    "Peak Autumn"
  ]
  
  return (
    <div className="absolute bottom-6 left-6 flex flex-col gap-3">
      <button 
        onClick={addRandomTree}
        className="w-12 h-12 bg-green-200 hover:bg-green-300 text-green-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg"
        title="Add Tree"
      >
        🌳
      </button>
      
      <button 
        onClick={addRandomPumpkin}
        className="w-12 h-12 bg-orange-200 hover:bg-orange-300 text-orange-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg"
        title="Add Pumpkin"
      >
        🎃
      </button>
      
      <button 
        ref={buttonRef}
        onClick={handleProgressAutumn}
        disabled={isTransitioning}
        className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg ${buttonStyle.bg} ${buttonStyle.text} ${buttonStyle.extra || ''}`}
        title={autumnStage >= 3 ? "Peak Autumn Reached" : tooltips[autumnStage]}
      >
        {buttonStyle.icon}
      </button>
      
      <button 
        onClick={toggleWind}
        className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg ${
          windEnabled 
            ? 'bg-blue-200 hover:bg-blue-300 text-blue-800 ring-2 ring-blue-400 animate-pulse' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
        }`}
        title={`Wind ${windEnabled ? 'On' : 'Off'}`}
      >
        💨
      </button>
    </div>
  )
}
