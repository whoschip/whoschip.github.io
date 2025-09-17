<script lang="ts">
  export interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
  }

  export let projects: Project[] = [];
</script>

<section class="flex flex-col items-center justify-center min-h-screen space-y-10 px-6">
  <h2 class="text-4xl font-bold bg-clip-text">
    some of my projects
  </h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each projects as project}
      <div class="card bg-base-100 image-full w-80 shadow-x1 hover:scale-105 transition-transform">
        <figure>
          <img src={project.image} alt={project.title} />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{project.title}</h2>
          <p>{project.description}</p>
          <div class="card-actions justify-end">
            <a href={project.link} target="_blank" class="btn btn-primary">view</a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
