Assessment Overview
Use the OpenAQ-provided API to create a visualization of air quality data in your home country!

 

Context: Much of the work performed by Opower product front-end engineering is creating rich, compelling visualizations of new and unique data-driven insights.  We want to see what you can bring to our teams to help use data to create positive social change!  OpenAQ (https://openaq.org/) is a free resource that provides, via an OpenAPI specification (https://docs.openaq.org/#/), data points on air quality and is a good baseline to build visualizations on top of, and a good representation of the kind of work you will be doing on a daily basis working with our teams.

Detailed Instructions
Build a standalone ReactJS application, with a tool like Create React App or with a standalone web server, to create an application that can run locally.  Using the OpenAQ API Spec:

·       Start by calling the locations endpoint (note that this is the v2 endpoint that we should use… please avoid the v1 endpoint). This will gather the baseline dataset. When calling this endpoint, there should be default parameters defined by the developer (e.g. country code) as well as at least one other parameter which can be defined by the user (e.g. limit).

·       Using this baseline data, the developer should choose from one of the following options to visually display this data in a comprehensible way.

1.     Display this data as plots on a map and a hover over to give a summary of the data. DONE

2.     Display this data as informational cards or graphs that have tags, icons, or tooltips to represent the data. X

In Both Options:

·       Visually represent what each location is [government, research, or community]. The user should also be able to filter by this attribute. DONE

·       Display a summary of each location. The more detailed the better. DONE

From the location screen, the user should be able to click a data point and navigate to view further measurement details of that location. The data for this can be found using the measurements endpoint (note that this is the v2 endpoint that we should use… please avoid the v1 endpoint).

·       From this measurements view:

1.      The parent location data should be displayed so the user is aware of what they clicked on the previous view.

2.     Create at least two different visual representations (table, graph, chart, cards, etc.) using the measurements and parent location. The idea being to provide an intuitive way for the user to make sense of the data.

3.     Bonus: either at a page level or within one of the visual representations, build or incorporate a selection tool to filter and further analyze the data. An example of this could be to filter and display data based on measurement types for a given location.














# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
