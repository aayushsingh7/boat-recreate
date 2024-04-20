# Boat Redesign Project

This project breathes new life into the Boat company website, introducing vibrant color schemes, layouts that seamlessly adapt to any screen size, and subtle animations. While modernizing certain aspects, it ensures the core essence of the original site remains unmistakable.

<br>

## Tech Stack

**Client [Front-End] :**

**_JavaScript_**: The programming language used for the frontend development.

- **Vite JS**: A fast, opinionated web dev build tool that serves your code via native ES Module imports during dev and bundles it with Rollup for production. `Powered by React`, a JavaScript library for building user interfaces.

- **Framer Motion**: A library for creating smooth and expressive animations in React.

- **React Helmet**: This library empowers you to dynamically control document head elements, such as title tags, meta descriptions, and other SEO-related attributes, directly from your React

<br>

## Installation & Usage

To get started with the project, follow these steps:

- Clone the repository:

```bash
 git clone https://github.com/aayushsingh7/Boat-recreate.git
```

- Navigate to the project directory:

```bash
 cd boat-redesign
```

- Install dependencies using npm:

```bash
npm install
```

- Start the development server:

```bash
npm start
```

- Open your browser and navigate to the link given on termial to view the application.

![Alt Text](https://res.cloudinary.com/dvk80x6fi/image/upload/v1713424840/Screenshot_610_neaytl.png)

<br>

## Features

- **Responsive Design**: Seamlessly adapts to various screen sizes, ensuring optimal user experience across devices.

- **Dynamic Color Schemes**: Delightful visuals enhanced by carefully curated color palettes that enhance user engagement.

- **Effortless Cart Management**: Easily add or remove items from the cart, providing users with a smooth shopping experience.

- **Simple User Authentication**: Utilizing local storage, users can conveniently log in and register to personalize their experience and manage their accounts.

- **Immersive Animations**: Leveraging Framer, the interface comes to life with captivating animations, enriching user interaction and aesthetics.

- **Intuitive Search and Filtering**: Streamline project discovery with robust search and filtering options, empowering users to find what they need efficiently.

- **Engaging Product Slider**: A responsive cursor-driven slider enhances product browsing, offering an immersive and dynamic exploration experience.

<br>

## Optimizations

`DISCLAIMER: Both results were obtained in a production environment and within an incognito window. Please be aware that results may vary in a development environment or in a normal browser page due to external extensions.`

During the creation of this project, we encountered various best practices for developing React Applications.

Upon completion of our project, we assessed the performance and other factors of our application, and the results were not as impressive as we had hoped.

![Screenshot of Performance Results](https://res.cloudinary.com/dvk80x6fi/image/upload/v1713429245/Screenshot_588_tficn9.png)

Certainly, we were dissatisfied with these outcomes. Therefore, we implemented the following optimizations:

- We replaced `static imports` with `dynamic imports (React.lazy)` to limit the loading of non-essential pages, layouts, components, etc. This adjustment significantly improved the loading speed of the application.

- Additionally, we utilized React's `img` tag options such as `loading="instant"` and `loading="lazy"`, enabling us to instantly load essential images and defer loading of images that are not immediately required (e.g., those outside the viewport).

- Furthermore, we enhanced accessibility by adding `aria-label` to buttons and `title` attributes to anchor tags.

- We also employed the `preconnect` option on some `link` tags, instructing the browser to establish early connections to specified URLs for an enhanced user experience.

- Lastly, we implemented a `robots.txt` file to improve SEO optimization.

After implementing these optimizations, the current performance of our application is as follows:

![Screenshot of Current Performance](https://res.cloudinary.com/dvk80x6fi/image/upload/v1713429475/Screenshot_612_isgjed.png)

We are excited to see the positive impact these optimizations will have on our project's performance and user experience.

<br>

## Acknowledgements

**Development Team**:

- Thank you to our dedicated team of developers for their hard work and commitment to excellence throughout the project.
  - [Aayush Singh (Captain)](https://github.com/aayushsingh7)
  - [Srinivash R.T](https://github.com/CByadd)

**Sheryians from reImage Hackathon:**

- A special thank you to the `Sheryians team` for organizing the `reImage` Hackathon, which provided the platform for us to collaborate and create this project.

<br>

## Thank You😁💖
