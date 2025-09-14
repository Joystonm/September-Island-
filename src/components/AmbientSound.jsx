import React, { useState } from 'react'

export default function AmbientSound() {
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState('lofi')
  
  const tracks = [
    { id: 'lofi', emoji: '🎵', bg: 'bg-purple-200 hover:bg-purple-300', text: 'text-purple-800' },
    { id: 'nature', emoji: '🌲', bg: 'bg-green-200 hover:bg-green-300', text: 'text-green-800' },
    { id: 'cozy', emoji: '🔥', bg: 'bg-red-200 hover:bg-red-300', text: 'text-red-800' }
  ]
  
  const toggleMute = () => {
    setIsMuted(!isMuted)
    console.log(isMuted ? '🔊 Audio enabled' : '🔇 Audio muted')
  }
  
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-3">
      {tracks.map(track => (
        <button
          key={track.id}
          onClick={() => setCurrentTrack(track.id)}
          className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg ${
            currentTrack === track.id
              ? `${track.bg} ${track.text} ring-2 ring-white ring-opacity-50`
              : `${track.bg} ${track.text}`
          }`}
          title={track.id}
        >
          {track.emoji}
        </button>
      ))}
      
      <button 
        onClick={toggleMute}
        className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg ${
          isMuted 
            ? 'bg-red-200 hover:bg-red-300 text-red-800' 
            : 'bg-blue-200 hover:bg-blue-300 text-blue-800'
        }`}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}
