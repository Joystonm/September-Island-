import { useRef } from 'react'

export default function WishLanternButton({ onSpawn }) {
  const buttonRef = useRef()
  
  const handleClick = () => {
    // Visual feedback animation
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(1.2)'
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'scale(1)'
        }
      }, 150)
    }
    
    // Spawn lantern
    onSpawn()
  }
  
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="w-12 h-12 bg-orange-200 hover:bg-orange-300 text-orange-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg"
      title="Release Wish Lantern"
    >
      🏮
    </button>
  )
}
