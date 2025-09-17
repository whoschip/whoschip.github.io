<script lang="ts">
  import Projects from "$lib/components/projects/projects.svelte";
  import gar1 from "$lib/assets/gar1.jpg";
  import gar2 from "$lib/assets/gar2.jpg";
  import gar3 from "$lib/assets/gar3.jpg";


  const myProjects = [
    {
      title: "Lution",
      description: "A boostrapper for sober",
      image: gar1,
      link: "https://github.com/Wookhq/Lution"
    },
    {
      title: "Ropon",
      description: "A really simple and very cool™ roblox api helper lib for developersA really simple and very cool™ roblox api helper lib for developers",
      image: gar2,
      link: "https://github.com/Wookhq/ropon"
    },
    {
      title: "Scratch2Json",
      description: "A command-line tool for converting Scratch .sb3 projects into structured JSON and compiling structured JSON back into Scratch .sb3 format.",
      image: gar3,
      link: "https://github.com/whoschip/scratch2json"
    }
  ];
</script>

<Projects projects={myProjects} />
