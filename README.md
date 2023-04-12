# Project Overwatch Frontend

This is a project which I wipped up quickly to allow me to (from a database) check if anybody has been within +/- 20 blocks of the given coords since the time given and with an authorization token. This is the frontend part which is built with Svelte and Typescript. It has a nav bar and the "Overwatch" page which let's you enter the X and Y coordinates, the date since which will retrieve the data from the database. Inside of the API route you can find the old code for the MySL database backend from before I transitioned to PocketBase.

## Technologies

UI Framework: [Svelte](https://svelte.dev/)

SSR Framework: [SvelteKit](https://kit.svelte.dev/)

CSS Framework: [TailwindCSS](https://tailwindcss.com/)

Backend: [PocketBase](https://pocketbase.io)
