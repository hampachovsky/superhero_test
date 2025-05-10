
## Instructions for running each part of the application can be found in the corresponding folder.  

## Client instructions: `client/README.md`  

## Server instructions: `server/README.md`

___

## Planning and implementing of backend


### Database choice:
Since the project involves only a single data model, I decided to avoid using SQL databases. Additionally, since the requirement was to build the backend with Node.js, options like Firebase or Supabase were not suitable.  
    Among the available options, I chose **MongoDB (NoSQL)** due to its simplicity for this use case.  
    For the server framework, I went with **Express.js** because of its simplicity and ease of use.
___
### Handling Image Uploads
One of the challenges I encountered was implementing image uploads. I considered two options:
- **Cloudinary** – for storing images in the cloud
- **Multer** – a Node.js middleware for storing uploaded files on the server and serving them via static routes

I chose **Multer**, mainly because it allowed for a quick local setup without involving external services or API keys — which seemed more straightforward during the initial implementation phase.

However, after completing the feature, I would now prefer the **Cloudinary** approach. It’s simpler to manage in the long term, provides built-in image optimization, and scales better with user volume. 

Currently, images are effectively stored in the GitHub repo, which is not suitable for real-world use — especially with many users.
___
### Implementing Pagination

For fetching superheroes, I implemented pagination. Having experience in past with pagination, this was straightforward. I used MongoDB’s skip and limit methods to retrieve a subset of data based on the requested page. The page number is extracted from the query parameters, with a fixed limit of 5 items per page. The total number of items and pages is calculated to provide metadata in the response. This approach ensures efficient data retrieval and a smooth client-side experience.
___
## Frontend Implementation

### UI Library Choice

For the UI library, I considered **MUI** and **Tailwind CSS**, dismissing plain CSS modules. I chose **MUI** because its pre-built, familiar component library promised faster development. It helped me quickly build a clean, consistent interface.

___
### State Management

I decided not to use a state manager because it felt unnecessary for this project. Axios and React Query were enough to handle data fetching and caching efficiently. I chose React Query because it automatically caches responses, makes data refreshing easier, and reduces the amount of boilerplate code. It also helps keep API calls optimized without manually managing state. 
___

### Future Improvements

Further improvements to the project could include:

1. **Switching from Multer to a cloud storage solution** – Using Cloudinary or another cloud provider would be a better long-term approach for storing images efficiently. It would provide built-in optimization, scalability, and remove the need for local file management.
2. **Writing tests for core functionality** – Implementing unit and integration tests for key features.
3. **Optimizing frontend performance** – Implementing lazy loading, memoizing expensive calculations..
