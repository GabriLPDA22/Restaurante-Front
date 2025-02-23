// /src/stores/useFloatingDecorStore.ts
import { defineStore } from 'pinia'

export const useFloatingDecorStore = defineStore('floatingDecor', {
    state: () => ({
        items: generateItems(10)
    })
})

function generateItems(count: number) {
    // Añadimos las 5 imágenes que quieres usar
    const images = [
      'src/assets/pasta.png', 
      'src/assets/Plato_spaghett.png',
      'src/assets/pngtree-risotto-italian.png',
      'src/assets/spaghetti-removebg.png',
      'src/assets/spaghetti-with-meatballs.png'
    ]

    const width = window.innerWidth
    const height = window.innerHeight
    const edgeMargin = 0.2 // 20% desde el borde (izq/der en este caso)

    return Array.from({ length: count }, (_, index) => {
        // Seleccionamos aleatoriamente entre 'left' o 'right' (sin top/bottom)
        const border = pickRandomBorder() // 'left' o 'right'
        let x = 0
        let y = 0

        if (border === 'left') {
            // x dentro del 20% inicial de la pantalla
            x = Math.floor(Math.random() * (width * edgeMargin))
            // y en cualquier parte vertical
            y = Math.floor(Math.random() * height)
        } else {
            // border === 'right'
            // x en el 20% final de la pantalla
            x = Math.floor(width * (1 - edgeMargin) + Math.random() * (width * edgeMargin))
            y = Math.floor(Math.random() * height)
        }

        return {
            id: index + 1,
            image: images[index % images.length],
            x,
            y,
            speed: 0 
        }
    })
}


function pickRandomBorder(): 'left' | 'right' {
    const borders = ['left', 'right'] as const
    return borders[Math.floor(Math.random() * borders.length)]
}
