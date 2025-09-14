import { create } from 'zustand'

export const useWorldState = create((set, get) => ({
  objects: [],
  scene: 'day',
  windEnabled: false,
  autumnStage: 0, // 0=green, 1=yellow, 2=orange, 3=deep red
  isTransitioning: false,
  autumnTreeIds: [],
  
  addObject: (object) => set((state) => ({ 
    objects: [...state.objects, object] 
  })),
  
  removeObject: (id) => set((state) => ({ 
    objects: state.objects.filter(obj => obj.id !== id) 
  })),
  
  removeAutumnTrees: () => set((state) => ({
    objects: state.objects.filter(obj => !state.autumnTreeIds.includes(obj.id)),
    autumnTreeIds: []
  })),
  
  setScene: (scene) => set({ scene }),
  
  toggleWind: () => set((state) => ({ 
    windEnabled: !state.windEnabled 
  })),
  
  progressAutumn: () => {
    const state = get()
    if (state.isTransitioning || state.autumnStage >= 3) return
    
    set({ isTransitioning: true })
    
    const newStage = state.autumnStage + 1
    set({ autumnStage: newStage })
    
    // Add autumn trees only on first progression
    if (newStage === 1) {
      const autumnColors = [
        ["#FFD700", "#FFFF99", "#FFD700"], // Yellow stage 1
        ["#FF8C00", "#FFA500", "#FF8C00"], // Orange stage 2  
        ["#8B0000", "#DC143C", "#8B0000"]  // Deep red stage 3
      ]
      
      const newTreeIds = []
      
      // Add 3 autumn trees with delays
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const angle = Math.random() * Math.PI * 2
          const radius = 1.5 + Math.random() * 1.5
          const position = [
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
          ]
          
          const treeId = Date.now() + i
          newTreeIds.push(treeId)
          
          set((state) => ({
            objects: [...state.objects, {
              id: treeId,
              type: 'tree',
              position,
              isNew: true,
              autumnStage: newStage,
              isAutumnTree: true
            }],
            autumnTreeIds: [...state.autumnTreeIds, treeId]
          }))
          
          console.log('🍂 Rustle sound effect')
          
        }, i * 600)
      }
    }
    
    // Particle burst effect
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const burstPos = [
          (Math.random() - 0.5) * 6,
          3 + Math.random() * 2,
          (Math.random() - 0.5) * 6
        ]
        set((state) => ({
          objects: [...state.objects, {
            id: Date.now() + Math.random(),
            type: 'leaf',
            position: burstPos,
            isBurst: true
          }]
        }))
      }, i * 100)
    }
    
    // Reset transition flag
    setTimeout(() => {
      set({ isTransitioning: false })
    }, 2000)
  },
  
  resetAutumn: () => set({ 
    autumnStage: 0,
    isTransitioning: false,
    objects: [],
    autumnTreeIds: []
  }),
}))
