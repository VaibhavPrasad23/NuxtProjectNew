<template>
    <NuxtLayout name="auth">
        <section class="mt-2 bg-white p-8 shadow-sm border md:w-5/12">
            <span class="text-center ">
                <h1 class="text-4xl font-medium mb-2 font-sans font-serif">Login</h1>
                <p class="">Lets get Started!</p>
            </span>

            <form class="mt-4" @submit.prevent="login">
                <div class="form--wrapper ">
                    <label class="form--label" for="username">Username</label>
                    <input v-model="username" class="form--input" type="text" name="username" id="username" required placeholder="Username">
                </div>

                <div class="form--wrapper">
                    <label class="form--label" for="password">Password</label>
                    <input v-model="password" class="form--input" type="password" name="password" id="password" required placeholder="Password">
                </div>

                <button ref="button" type="submit" class="btn btn-primary w-full mb-6">Login</button>

                <p class="mb-5 text-sm text-gray-500">Not have account ? <button @click="getRandomUser" type="button" class="text-blue-600" >Click here</button> for guest account.</p>
            </form>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">




// composables
const app = useNuxtApp()
const router = useRouter()

// body
const username = ref('')
const password = ref('')
const id = ref()

// DOM Element
const button = ref<HTMLButtonElement | null>(null)

// use notyf
const error: any = app.$notyfError
const success: any = app.$notyfSuccess

// middleware
definePageMeta({
    middleware: [
        async (to: any, from: any) => {
            // get session
            const { session } = await useSession()

            if (session.value?.auth) {
                return navigateTo({ path: '/' })
            }
        }
    ]
})

// form handler
const login = async () => {

    // disabled submit button
    button!.value!.innerText = 'Please wait ...'
    button!.value!.disabled = true

    // try to login
    const { data } = await useFetch('/auth/login', {
        method: 'POST',
        body: {
            username: username.value,
            password: password.value,
            id: id.value
        }
    })

    if (data?.value?.status) {
        success('Login Successful!')
        router.push('/')
    } else {
        error(`Login Failed! ${ data?.value?.message }`)
    }

    // enabled
    button!.value!.innerText = 'Submit'
    button!.value!.disabled = false
}

// randoming user
const getRandomUser = async (evt: MouseEvent) => {

    const targetElement = evt.target as HTMLButtonElement

    targetElement.innerText = 'getting ...'
    targetElement.disabled = true

    const { data: user } = await useFetch('/api/users')

    // auto fill
    if (user.value) {

        username.value = user.value.username
        password.value = user.value.password
        id.value = user.value.id
    }

    success('Guest User Generated! ')

    targetElement.innerText = 'Click here'
    targetElement.disabled = false
}

</script>

<style scoped>

</style>