<template>
  <NuxtLayout name="default">
    <section class="mb-8">
      <h2 class="text-5xl font-serif font-medium mb-2">Hello, {{ getUserName() ?? 'User' }}</h2>
      <p class="text-gray-500 pt-6">Welcome to iCube System's Marketplace.</p>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">

const { session } = await useSession()

const getUserName = (): string => {

  // get first and second name
  const { firstname, lastname }: { firstname: string, lastname: string } = session.value?.auth?.name
  
  return `${ setUppercaseAtFirstChar(firstname) } ${ setUppercaseAtFirstChar(lastname) }`
}

const setUppercaseAtFirstChar = (word: string): string => {

  // parse to array
  const wordInArray: string[] = word.split('')

  // replace first char into uppercase
  wordInArray[0] = wordInArray[0].toUpperCase()

  return wordInArray.join('')
}

</script>