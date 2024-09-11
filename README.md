# Welcome to Medical-AI

The goal of this project is to create a website where we can discover, upload and test all the models applied to medical purposes.

## Folder Structure

The project is organized into several key folders, each serving a specific purpose:

- **app/routes**: This folder contains all the route components for the application. Each file represents a different route, and the file name corresponds to the route path. For example, `datasets.tsx` handles the `/datasets` route, and `models.$modelId.tsx` handles the `/models/:modelId` route.

- **app/routes/datasets.tsx**: This file defines the `Datasets` component, which renders the datasets page with a simple header.

- **app/routes/models.$modelId.tsx**: This file defines the `ModelPage` component, which renders detailed information about a specific model, including its name, description, target diseases, input data, training details, and testing details.

- **app/routes/\_index.tsx**: This file defines the `Index` component, which serves as the homepage of the application. It includes links to the latest models and datasets.

- **app/routes/diseases.tsx**: This file contains a list of diseases and their details, as well as a list of categories that classify these diseases.

- **public**: This folder contains static assets such as images, fonts, and other files that are publicly accessible.

- **styles**: This folder contains the CSS files used for styling the application. The project uses Tailwind CSS for styling.

- **build**: This folder contains the production build of the application, including the server and client bundles.

- **node_modules**: This folder contains all the project dependencies installed via npm.

- **package.json**: This file contains metadata about the project, including dependencies, scripts, and other configuration details.

- **README.md**: This file provides an overview of the project, including instructions for development, deployment, and styling.

## Important

The three main sections are:

- **Models**: This section includes various AI models used for medical purposes. Each model has detailed information such as its name, description, target diseases, input data, training details, and testing details. The data structure for a model is as follows:

  ```typescript
  const model = {
    id: string,
    name: string,
    description: string,
    targetDiseases: [
      {
        id: number,
        name: string,
        testingScore: number,
      },
    ],
    inputData: string[],
    training: {
      date: string,
      dataSetId: string,
      dataSetName: string,
      trainingError: number,
      trainingAccuracy: number,
    },
    testing: [
      {
        date: string,
        dataSetId: string,
        dataSetName: string,
        testingError: number,
        testingAccuracy: number,
      },
    ],
    testingScore: number,
    sizeMB: number,
  };
  ```

- **Datasets**: This section includes various datasets used for training and testing the AI models. Each dataset has a simple structure with a header. The data structure for a dataset is as follows:

  ```typescript
  export default function Datasets() {
    return (
      <>
        <h1>Datasets</h1>
      </>
    );
  }
  ```

- **Diseases**: This section includes a list of diseases and their details, as well as a list of categories that classify these diseases. The data structure for diseases and categories is as follows:

  ```typescript
  const diseases = [
    {
      id: number,
      name: string,
      description: string,
      category: string,
      categoryId: number,
    },
  ];

  const categories = [
    {
      categoryId: number,
      categoryName: string,
      ICDCode: string,
      description: string,
    },
  ];
  ```

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
