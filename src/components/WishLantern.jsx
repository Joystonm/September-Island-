import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function WishLantern({ position, onRemove }) {
  const meshRef = useRef()
  const lightRef = useRef()
  const startY = position[1]
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Drift upward
      meshRef.current.position.y += delta * 0.5
      
      // Gentle rotation
      meshRef.current.rotation.y += delta * 0.2
      meshRef.current.rotation.x += Math.sin(state.clock.elapsedTime) * delta * 0.1
      
      // Slight horizontal drift
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.5) * delta * 0.1
      
      // Fade out when high enough
      if (meshRef.current.position.y > startY + 8) {
        meshRef.current.material.opacity -= delta * 0.5
        if (lightRef.current) lightRef.current.intensity -= delta * 0.5
        
        if (meshRef.current.material.opacity <= 0) {
          onRemove()
        }
      }
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshStandardMaterial 
          color="#ffaa44" 
          emissive="#ff6600" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      <pointLight 
        ref={lightRef}
        color="#ffaa44" 
        intensity={0.8} 
        distance={4}
        decay={2}
      />
    </group>
  )
}
