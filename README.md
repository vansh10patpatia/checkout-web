
# Checkout Web

The Checkout web app simplifies online shopping, focusing on the final steps of the purchasing process, seamlessly guiding users from cart to order completion.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/checkout](http://localhost:3000/checkout) with your browser to see the default checkout page.

## Tech Stack
- Next.js
  - For building a React-based web app with server-side rendering.
- React Context API
  - For state management and handling theme and cart logic
- Custom Cache Hook
  - For implementing API level cache currently 60 sec
- SCSS & Lottie
  - For styling components and displaying animations

## Features
- Local API cache
  - Usage Guide:
    -   Import the useCachedAPI hook into your React component.
    -   Call the hook with the desired API endpoint URL and optional customization parameters.
    -   Access the fetched data, loading state, and error status returned by the hook.
  -   Best Practices
    -   Use avoidInitialFetch when the initial fetch is unnecessary or can be deferred.
    -   Set an appropriate TTL based on data volatility and application requirements for optimal caching performance.
  -   Improved Performance: Local caching reduces latency by serving subsequent requests from cache, optimizing resource usage and enhancing user experience.
  -   Reduced Server Load: Caching data locally conserves server resources, improving scalability and ensuring reliability even during high traffic.
 
- Dynamic Theming Feature
  - It uses CSS root variables for theming, enabling easy and efficient customization of the application's styling.
  - This allows for seamless customization of the application's theme, enabling brands to create a unique and branded user experience.
  - The feature is seamlessly integrated into the application, ensuring smooth implementation and minimal disruption to existing functionality.  

## Screenshots

<div>
  <img width="48%" alt="Checkout-desktop" src="https://github.com/vansh10patpatia/checkout-web/assets/68200019/4579cca8-4086-481e-a9c8-d81e74308ecc">
  <img width="48%" alt="Payment-desktop" src="https://github.com/vansh10patpatia/checkout-web/assets/68200019/9bfd0b17-d30f-41e4-b286-6c167f15f22b">
</div>
<div>
  <img width="32%" alt="Checkout-phone" src="https://github.com/vansh10patpatia/checkout-web/assets/68200019/82f0bb34-42d6-45e1-b371-a4cf27c2a02b">
  <img width="32%" alt="Payment-phone" src="https://github.com/vansh10patpatia/checkout-web/assets/68200019/40bd0e50-8e93-4c3c-9215-c0c6b3db4f46">
  <img width="32%" alt="Confirmation-phone" src="https://github.com/vansh10patpatia/checkout-web/assets/68200019/648327df-0c49-4768-ac78-476f619ef1c0">
</div>

## Non-Technical Learnings
- Time Management: Improved time management skills through structured development phases.
- Presentation Skills: Enhanced the ability to present and showcase a project effectively.
- Documentation Skills: Learned the importance of well-maintained documentation for codebases.
