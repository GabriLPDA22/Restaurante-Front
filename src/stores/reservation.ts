import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useReservationStore = defineStore('reservation', () => {
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

        console.log('Validation errors:', errors.value);
        return Object.keys(errors.value).length === 0
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

    return { form, errors, validateForm, submitReservation }
})
