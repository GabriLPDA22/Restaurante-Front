export default class UserDto {

    constructor(public id: number, public name: string) {
    }

    static fromJson(json: any): UserDto {
        return new UserDto(json.id, json.name)
    }


}