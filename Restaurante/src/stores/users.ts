import {defineStore} from "pinia";
import { ref } from "vue";
import UserDto from "./Dtos/user.dto";

export const useUsersStore = defineStore('users', () => {

    const users = ref(new Array<UserDto>())

    // users.value.push({ id: 1, name: 'John Doe' })

    function findAll(){
        let data = [
            {id: 1, name: 'John Doe'},
            {id: 2, name: 'Jane Doe'}
        ]
        users.value.splice(0, users.value.length, ...data.map((user: any) => new UserDto(user.id, user.name)))
    }

    function findById(id: number){
        return {id: 1, name: 'John Doe'}
    }

    function create(user: any){
        users.value.push({id: 1, name: 'John Doe'})
    }

    function update(user: any){
        return {id: 1, name: 'John Doe'}
    }

    function deleteById(id: number){
        return {id: 1, name: 'John Doe'}
    }

    return {
        users,
        findAll,
        findById,
        create,
        update,
        deleteById
    }
})