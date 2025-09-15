import { useState, useCallback } from 'react'

export function useWishLanterns() {
  const [lanterns, setLanterns] = useState([])

  const spawnLantern = useCallback(() => {
    const newLantern = {
      id: Date.now() + Math.random(),
      position: [
        (Math.random() - 0.5) * 10, // Random X position
        0.5, // Start near ground
        (Math.random() - 0.5) * 10  // Random Z position
      ]
    }
    
    setLanterns(prev => [...prev, newLantern])
    
    // Play sound effect
    try {
      const audio = new Audio('/sounds/whoosh.mp3')
      audio.volume = 0.3
      audio.play().catch(() => {}) // Ignore if sound fails
    } catch (e) {}
  }, [])

  const removeLantern = useCallback((id) => {
    setLanterns(prev => prev.filter(lantern => lantern.id !== id))
  }, [])

  return { lanterns, spawnLantern, removeLantern }
}
