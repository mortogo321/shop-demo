stickydevs
Software Engineer Test
Position Software Engineer (React)
Deadline 1 week from the date of the test
Submit to jobs@stickydevs.com (GitHub repo link)
Design Reference https://drive.google.com/file/d/1QuwWq6wJv9CDm
yz_9I63hc2sXLsEgfqA/view?usp=drive_link
React Guidelines https://tenlogs.notion.site/React-guidelines-a17f12b
c9aba43f9a59d48c6b15a4743
Overview
Build a simple online shop application. The goal is to assess your ability to write clean,
well-structured React code following our guidelines while delivering a polished user experience.
Required Stack
●
●
●
React (with TypeScript)
Next.js
Tailwind CSS
●
State Management (React Context, Zustand, or similar)
Features

1. Products Listing Page
   Route: /
   ●
   ●
   Display a grid of product cards.
   Each product card should show at minimum:
   ●
   ●
   ●
   Product image
   ●
   Product name
   ●
   Price
   ●
   "Add to Cart" button
   Implement responsive design (mobile, tablet, desktop).
   Data source: Use a mock data source (local JSON file or a free public API such as Fake Store
   API or DummyJSON).
2. Product Detail Modal
   Route: /products/[id]
   Clicking on a product card opens a modal/overlay displaying full product details:
   ●
   Product image(s)
   ●
   Product name
   ●
   Price
   ●
   Description
   ●
   "Add to Cart" button
   ●
   ●
   ●
   ●
   URL sync: URL must update when the modal opens (e.g., /products/1), enabling direct
   navigation and shareability.
   Pressing the browser back button or closing the modal should return to the listing page and
   restore the previous URL.
   Navigating directly to /products/[id] should render the listing page with the modal open for that
   product.
   The modal should have a backdrop overlay and smooth open/close transitions.
3. Shopping Cart
   ●
   A persistent cart icon/indicator visible across the application showing the number of items in
   the cart.
   ●
   Clicking the cart icon opens a cart drawer/panel displaying:
   ●
   List of added products (name, price, quantity)
   ●
   Ability to increase/decrease quantity or remove items
   ●
   Total price calculation
   ●
   ●
   ●
   Adding a product already in the cart should increase its quantity.
   Cart state should persist across page navigation.
   The cart should update in real-time without page reload.
   Technical Requirements
   ●
   ●
   ●
   ●
   ●
   Guidelines: Follow the stickydevs React Guidelines.
   TypeScript: Use TypeScript throughout the project.
   Components: Use proper component composition — keep components small and focused.
   States: Implement proper loading and error states.
   Quality: Code should be clean, well-structured, and follow best practices.
   Submission Guidelines
4. 2. 3. Create a public repository on GitHub.
         Send the GitHub repo link via email to: jobs@stickydevs.com
         Include a README file with:
         ●
         ●
         ●
         How to install and run the application
         Any architectural decisions or trade-offs made
         Any other relevant information
         Plus Points
         ●
         ●
         ●
         ●
         ●
         ●
         Deploying the application (e.g., Vercel, Netlify) so we can see it in action.
         Writing unit/integration tests (e.g., Vitest, React Testing Library).
         Implementing search or filter functionality on the products listing.
         Adding animations/transitions for a polished user experience.
         Cart persistence using localStorage.
         Implementing responsive design that works well on all screen sizes.
         Deadline: 1 week from the date of the test
         Submit to: jobs@stickydevs.com (GitHub repo link)
