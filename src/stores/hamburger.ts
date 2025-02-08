import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHamburgerStore = defineStore('hamburger', () => {
    // Estado: abierto/cerrado
    const isOpen = ref(false);

    // Alternar
    function toggle() {
        isOpen.value = !isOpen.value;
    }

    // Cerrar
    function close() {
        isOpen.value = false;
    }

    // Abrir
    function open() {
        isOpen.value = true;
    }

    return {
        isOpen,
        toggle,
        close,
        open,
    };
});
