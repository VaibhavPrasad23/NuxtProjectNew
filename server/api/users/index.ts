import { IUser } from "../../../interfaces/user.interface"

export default defineEventHandler(async event => {

  const users: IUser[] = await $fetch('http://localhost:8090/user')

  // create random index
  const index: number = Math.floor(Math.random() * (users.length - 1))

  // get and return user random
  const user: IUser = {
    id: users[index].id,
    email: users[index].email,
    password: users[index].password,
    username: users[index].username,
    name: users[index].name,
  }

  return user ?? null
})
