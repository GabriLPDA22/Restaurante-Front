<script setup lang="ts">
import { useUsersStore } from '../stores/users'
const store = useUsersStore()

store.findAll()

function InsertarUser() {
    console.log('UsersView created');
    store.create({
        name: 'User 1',
        id: 1
    });
}

InsertarUser();
</script>

<template>
    <div>
        <h1>Users</h1>
        <ul>
            <li v-for="user in store.users" :key="user.id">
                {{ user.name }} {{ user.id }}
            </li>
        </ul>
    </div>
    <v-btn @click="InsertarUser">
        Insertar Usuario
    </v-btn>
</template>
