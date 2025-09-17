<script lang="ts">
    import Skills from "$lib/components/skills/skills.svelte";
</script>

<section class="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
  <h1 class="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
    Chip
  </h1>

  <p class="max-w-xl text-lg text-gray-600 dark:text-gray-300">
    Hello! I'm <span class="font-semibold">Chip</span>, a Vietnamese & a pretty lazy programmer.  
    I love exploring new stuff and building random things.
  </p>

  <div class="flex space-x-4">
    <a href="/projects" class="btn btn-primary">my projects</a>
    <a href="/socials" class="btn btn-outline">socials</a>
  </div>

</section>

<Skills/>
