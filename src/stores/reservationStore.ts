import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useReservationStore = defineStore('reservation', () => {
    // Estado base del formulario
    const form = ref({
        date: '',
        time: '',
        selectedTables: [] as number[],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        comment: ''
    })

    // Estado para almacenar las reservas
    const existingReservations = ref<any[]>([])

    // Estado para control de carga y errores
    const isLoadingReservations = ref(false)
    const loadingError = ref('')

    // Errores de validación
    const errors = ref<{
        date?: string;
        time?: string;
        selectedTables?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
    }>({})

    // Watch para ver los cambios en el formulario
    watch(form, () => {
        console.log('Current form values:', form.value);
    }, { deep: true });

    // Watch para fecha y hora - para cargar automáticamente
    watch(() => [form.value.date, form.value.time], ([newDate]) => {
        if (newDate) {
            fetchReservationsByDate(newDate);
        }
    });

    // Función para obtener reservas por fecha desde la API
    const fetchReservationsByDate = async (date: string) => {
        if (!date) return;

        isLoadingReservations.value = true;
        loadingError.value = '';

        try {
            console.log(`Fetching reservations for date: ${date}`);

            const response = await fetch(`http://localhost:5021/api/Reservations/byDate?date=${date}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API error:', errorText);
                throw new Error(`Server responded with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('API response data:', data);

            existingReservations.value = data || [];

            // Si no hay reservaciones, simplemente registrar esto (no es un error)
            if (existingReservations.value.length === 0) {
                console.log('No reservations found for this date. All tables are available.');
            } else {
                console.log(`Found ${existingReservations.value.length} reservations for this date.`);
            }

        } catch (error) {
            console.error('Error fetching reservations:', error);
            loadingError.value = `Error al cargar reservas: ${error instanceof Error ? error.message : 'Error desconocido'}`;

            // Si hay un error, fallback a modo simulación para pruebas de UI
            useFallbackMockData(date);
        } finally {
            isLoadingReservations.value = false;
        }
    };

    // Función para usar datos simulados en caso de error
    const useFallbackMockData = (date: string) => {
        console.warn('Using fallback mock data due to API error');

        if (date === '2025-02-25') {
            existingReservations.value = [
                { tableId: 3, dateTime: `${date}T${form.value.time || '12:00'}:00.000Z` },
                { tableId: 7, dateTime: `${date}T${form.value.time || '12:00'}:00.000Z` },
                { tableId: 10, dateTime: `${date}T${form.value.time || '12:00'}:00.000Z` }
            ];
            loadingError.value += ' (Usando datos de simulación)';
        } else {
            existingReservations.value = [];
        }
    };

    // Función para verificar si una mesa está disponible
    const isTableAvailable = (tableId: number) => {
        if (!form.value.date || !form.value.time) return true;

        // Convertir la hora seleccionada a minutos desde medianoche para comparación
        const [hours, minutes] = form.value.time.split(':').map(Number);
        const selectedTimeInMinutes = hours * 60 + minutes;

        // Ventana de 2 horas para la reserva
        const reservationWindow = 120; // minutos

        // Buscar reservas que se superpongan para esta mesa
        const hasOverlap = existingReservations.value.some(reservation => {
            // Verificar si es la misma mesa
            if (reservation.tableId !== tableId) return false;

            // Extraer la hora de la reserva existente
            const reservationDateTime = new Date(reservation.dateTime);
            const reservationHours = reservationDateTime.getHours();
            const reservationMinutes = reservationDateTime.getMinutes();
            const reservationTimeInMinutes = reservationHours * 60 + reservationMinutes;

            // Verificar si hay superposición
            const reservationEndTime = reservationTimeInMinutes + reservationWindow;
            const selectedEndTime = selectedTimeInMinutes + reservationWindow;

            return (
                (selectedTimeInMinutes < reservationEndTime) &&
                (selectedEndTime > reservationTimeInMinutes)
            );
        });

        return !hasOverlap;
    };

    // Obtener mesas ocupadas
    const getOccupiedTables = () => {
        if (!form.value.date || !form.value.time) return [];

        // Suponemos que tienes 15 mesas en total
        const allTableIds = Array.from({ length: 15 }, (_, i) => i + 1);

        return allTableIds.filter(tableId => !isTableAvailable(tableId));
    };

    // Obtener mesas disponibles
    const getAvailableTables = () => {
        const allTableIds = Array.from({ length: 15 }, (_, i) => i + 1);
        const occupiedIds = getOccupiedTables();

        return allTableIds.filter(id => !occupiedIds.includes(id));
    };

    // Simulación para desarrollo y pruebas
    const simulateReservations = () => {
        isLoadingReservations.value = true;
        loadingError.value = '';

        // Simulamos un pequeño retraso
        setTimeout(() => {
            try {
                if (form.value.date === '2025-02-25') {
                    // Para esta fecha específica, simulamos que algunas mesas están ocupadas
                    existingReservations.value = [
                        { tableId: 3, dateTime: `${form.value.date}T${form.value.time}:00.000Z` },
                        { tableId: 7, dateTime: `${form.value.date}T${form.value.time}:00.000Z` },
                        { tableId: 10, dateTime: `${form.value.date}T${form.value.time}:00.000Z` }
                    ];
                } else {
                    // Para otras fechas, todas las mesas están disponibles
                    existingReservations.value = [];
                }
                console.log('Simulated reservations:', existingReservations.value);
            } catch (error) {
                console.error('Error in simulation:', error);
                loadingError.value = 'Error al simular reservas.';
            } finally {
                isLoadingReservations.value = false;
            }
        }, 500);
    };

    // Función de validación
    const validateForm = () => {
        errors.value = {}

        if (!form.value.date.trim()) errors.value.date = "Date required."
        if (!form.value.time.trim()) errors.value.time = "Time required."
        if (!form.value.selectedTables || form.value.selectedTables.length === 0) errors.value.selectedTables = "At least one table must be selected."
        if (!form.value.firstName.trim()) errors.value.firstName = "First Name required."
        if (!form.value.lastName.trim()) errors.value.lastName = "Last Name required."
        if (!form.value.email.trim()) errors.value.email = "Email required."
        if (!form.value.phone.trim()) errors.value.phone = "Phone required."

        // Validar que las mesas seleccionadas estén disponibles
        const unavailableTables = form.value.selectedTables.filter(
            tableId => !isTableAvailable(tableId)
        );

        if (unavailableTables.length > 0) {
            errors.value.selectedTables = `Tables ${unavailableTables.join(', ')} are no longer available. Please select different tables.`;
        }

        console.log('Validation errors:', errors.value);
        return Object.keys(errors.value).length === 0;
    }

    // Función para enviar la reserva
    const submitReservation = () => {
        if (validateForm()) {
            const reservations = form.value.selectedTables.map(tableId => ({
                id: 0,
                dateTime: `${form.value.date}T${form.value.time}:00.000Z`,
                customerName: `${form.value.firstName} ${form.value.lastName}`,
                tableId,
                email: form.value.email,
                phone: form.value.phone,
                comment: form.value.comment
            }));

            console.log('Reservations Data:', reservations)

            Promise.all(reservations.map(reservationData =>
                fetch('http://localhost:5021/api/Reservations', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reservationData)
                })
            ))
                .then(responses => {
                    if (responses.every(response => response.ok)) {
                        alert('Reservations submitted successfully!')
                        // Recargar las reservas para actualizar el estado
                        fetchReservationsByDate(form.value.date);
                    } else {
                        alert('Failed to submit some reservations.')
                    }
                })
                .catch(error => {
                    console.error('Error submitting reservations:', error)
                    alert('An error occurred while submitting the reservations.')
                })
        } else {
            alert('Please fill in all required fields.')
        }
    }

    // Función para resetear el formulario
    const resetForm = () => {
        form.value = {
            date: '',
            time: '',
            selectedTables: [],
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            comment: ''
        };
        errors.value = {};
    };

    return {
        form,
        errors,
        validateForm,
        submitReservation,
        fetchReservationsByDate,
        isTableAvailable,
        getOccupiedTables,
        getAvailableTables,
        isLoadingReservations,
        loadingError,
        existingReservations,
        simulateReservations,
        resetForm
    }
})