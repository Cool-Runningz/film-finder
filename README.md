# Film Finder 🎬
The deployed version of the project can be accessed here: https://film-finder-iota.vercel.app/

## About this Project ℹ️
This project uses [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) for type safety, [Vite](https://vite.dev/) for fast development and building, and [Tailwind CSS](https://tailwindcss.com/) for styling. The application uses the [Movies API](https://github.com/thisdot/movies-api) to obtain movie data.

In the `src` directory, you will find the following folder structure:

```bash
src
├── components/          
│   ├── MovieGrid.tsx   # Main movie listing component with search and filters
│   ├── MovieCard.tsx   # Individual movie display component
│   ├── MovieDetailsModal.tsx # Detailed movie information modal
│   ├── SearchInput.tsx # Search functionality component
│   ├── GenreFilter.tsx # Genre filtering component
│   └── PaginationSection.tsx # Pagination controls
├── catalyst/           # UI component library from Tailwind
│   ├── Button.tsx
│   ├── Dialog.tsx
│   ├── Input.tsx
│   └── ...
├── hooks/              
│   └── useMovieApi.ts  # SWR-based API data fetching hook
├── types/              # TypeScript type definitions
│   └── movie.ts        # Movie and API response types
├── utils/              # Helper functions and files
│   ├── constants.ts    
│   └── helpers.ts      
└── images/            
```


## Project Setup 📁

### Install project dependencies
```bash
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory and add the following environment variable:
```bash
VITE_AUTH_TOKEN="your-movie-api-token-here"
```

### Running the application
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.


---

## My Implementation Approach 👩🏽‍💻

### Phase 1: URL State Management with Query Parameters

One aspect of this project that I found particularly interesting was implementing URL state management using query parameters. Rather than keeping search terms, genre filters, and pagination state in local component state, I pushed this data directly to the URL using the [nuqs](https://www.npmjs.com/package/nuqs) library. This approach provides several benefits:

- **Shareable URLs**: Users can bookmark or share specific search results
- **Browser navigation**: Back/forward buttons work intuitively with search states
- **Persistent state**: Refreshing the page maintains the current search context
- **Deep linking**: Direct access to specific filtered views

This pattern makes the application feel more like a traditional web experience while maintaining the interactivity of a single-page application.

### Phase 2: Intelligent Data Caching with SWR

The implementation leverages [SWR](https://swr.vercel.app/) (Stale-While-Revalidate) for data fetching, which adds intelligent caching by default. This means when users navigate back to previously viewed pages or repeat searches, the data loads much more quickly.

### Phase 3: Component Architecture and Code Quality

What I'm most proud of in this implementation is the overall structure and componentization. I strive to create code that is both functional and easy for not only myself but others to review and work on. The architecture demonstrates:

- **Single Responsibility Principle**: Each component has a focused, well-defined purpose
- **Reusable UI Components**: The `catalyst/` directory provides a consistent design system
- **Custom Hooks**: Business logic is extracted into reusable hooks like `useMovieApi`
- **Type Safety**: Comprehensive TypeScript interfaces ensure data integrity
- **Clean Patterns**: Consistent import organization, naming conventions, and file structure

The code follows established React patterns and maintains readability through clear component boundaries, descriptive naming, and logical organization.


## Future Enhancements

Given more time, the next feature I would love to add is a **favorites functionality**. This would include:

- A favorite button on each movie card to save movies of interest
- A dedicated favorites modal to view all saved movies
- Visual indicators showing which movies have been favorited

This feature would enhance the user experience by allowing users to curate their own collection of interesting films without having to search or filter repeatedly to find movies they've already discovered.

---

## Technology Stack 🛠️

- [**React**](https://react.dev/) - Frontend framework with latest features
- [**TypeScript**](https://www.typescriptlang.org/) - Type-safe JavaScript development
- [**Vite**](https://vite.dev/) - Fast build tool and development server
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework
   - [**Tailwind Plus UI Block**](https://tailwindcss.com/plus/ui-blocks/ecommerce/components/product-lists#component-f0541d3d493c2571c74e2c37507722c5) - Used for movie card layout 
   - [**Catalyst**](https://catalyst.tailwindui.com/docs) (Modern UI Kit written by the Tailwind team)
- [**SWR**](https://swr.vercel.app/) - Data fetching with caching and revalidation
- [**Headless UI**](https://headlessui.com/) - Unstyled, accessible UI components
- [**Heroicons**](https://heroicons.com/) - SVG icons
- [**nuqs**](https://www.npmjs.com/package/nuqs) - URL state management for React