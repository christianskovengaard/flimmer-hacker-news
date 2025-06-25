# The is the hacker news flimmer app

To get started do the following.

1. clone the repo

2. run this command ```run npm install && npm run dev```


## Architectural decisions
I think "architectural decisions" might be a bit too strong a term to use here,
but I can explain my technical choices.

The project is built with React and Vite.
I chose React because I have many years of experience with it, and I believe its structure makes the project more readable and scalable.
Vite was chosen because it allows you to scaffold a project quickly, has excellent support for React, and provides a fast development experience.

The files are structured so that components, utilities, and types are kept separately.
This makes the project scalable and allows for easy reuse of code and components.

## Possible improvement
The project is very much an MVP.
Some of the component styling should be moved to separate files.
It could benefit from additional styling for a better UI, as well as a skeleton grid while data is loading.
Adding tests — such as E2E, component, and utility tests — would also be a good idea.