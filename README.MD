# movs

Movie streaming web application like Netflix for users to see a real-time movie list and add titles to their favourite list.
<br/>

## Setup

Copy and rename .env.example file to .env, then fill in the [TMDB](https://www.themoviedb.org/settings/api) key and access token in the .env file :

```bash
VITE_TMDB_API_KEY=your_api_key
VITE_TMDB_ACCESS_TOKEN=your_access_token
```

## NOTES:

Pay attention: this is not the original sign in. Don't insert your real credentials here!
User data is stored in [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Available user:

```json
{
    "name": "John Doe",
    "email": "john.doe@email.com",
    "password": "password",
}
```

### Install dependencies

```bash
npm install
```

Then you can follow the steps below :

<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img alt="refine logo" src="https://refine.ams3.cdn.digitaloceanspaces.com/readme/refine-readme-banner.png">
    </a>
</div>
<br/>

This [Refine](https://github.com/refinedev/refine) project was generated with [create refine-app](https://github.com/refinedev/refine/tree/master/packages/create-refine-app).

## Getting Started

A React Framework for building internal tools, admin panels, dashboards & B2B apps with unmatched flexibility ✨

Refine's hooks and components simplifies the development process and eliminates the repetitive tasks by providing industry-standard solutions for crucial aspects of a project, including authentication, access control, routing, networking, state management, and i18n.

## Available Scripts

### Running the development server.

```bash
npm run dev
```

### Building for production.

```bash
npm run build
```

### Running the production server.

```bash
npm run start
```

## Learn More

To learn more about **Refine**, please check out the [Documentation](https://refine.dev/docs)

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Material UI** [Docs](https://refine.dev/docs/ui-frameworks/mui/tutorial/)
- **Inferencer** [Docs](https://refine.dev/docs/packages/documentation/inferencer)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **Custom Auth Provider** [Docs](https://refine.dev/docs/core/providers/auth-provider/)
- **i18n** [Docs](https://refine.dev/docs/core/providers/i18n-provider/)

## License

MIT
