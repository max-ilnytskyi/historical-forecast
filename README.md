# Getting Started

This guide will help you set up and run the project locally.

### Prerequisites
Make sure you have [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) installed.

### Installation

First, install the dependencies:

```bash
yarn install
```

### Running the Development Server

Once dependencies are installed, you can start the development server:

```bash
yarn dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

### Building the Application

To create a production build, use the following command:

```bash
yarn build
```

### Running the Production Build

After building the application, you can start it in production mode:

```bash
yarn start
```

The production build will run on [http://localhost:3000](http://localhost:3000).

### Project Description
This project provides a visual representation of changes in maximum and minimum temperatures in Jerusalem. Users can select a specific date range for the chart, with the default range set to the last month. Daily information is available via tooltips for better detail.

### Technology Overview
The project is built using the **Next.js** framework. Styling is managed with **Tailwind CSS**. For client-side data management, the **@tanstack/react-query** library is used. Data visualization of daily maximum and minimum temperatures is implemented using **Chart.js**. For convenient date selection, the **react-datepicker** library is also integrated.

### Next Steps
- Add location selection capability.
- Review user scenarios and explore opportunities to improve UX.
- Develop a complete page and layout design.
- Systematize base types for scalability.
- Unify request logic in **React Query** and extract it into base hooks.
- Better organize styles by placing them in a separate, well-structured folder.
- Integrate custom fonts, add a favicon, and configure the manifest.
- Thoroughly test different scenarios to identify and fix bugs.
- Improve the date range input component, adding custom styling.
- For larger date ranges, consider displaying aggregated data points instead of daily data.
- Add a "reset" option when using a saved date range.
- Provide hints about any limitations when selecting dates.
- Implement authentication and access control.
- Handle different types of errors (e.g., 401, 404).
- Take a closer look at the external API to anticipate any potential pitfalls.
- Explore the use of the API for dates earlier than 2021-03-24.
- Add zoom functionality in addition to tooltips, and revise the layout for small screens.
