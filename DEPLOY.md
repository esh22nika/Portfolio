# Deploy to Render

Place the contents of this project folder in the root of your GitHub repository. The root should contain render.yaml, package.json, build.mjs, components, and dist.

1. In the Render dashboard, select New and then Blueprint.
2. Connect the GitHub repository containing this version of the portfolio.
3. Select the branch with these files and leave the Blueprint Path as render.yaml.
4. Review the static site named eshanika-portfolio and select Deploy Blueprint.
5. Render installs dependencies, runs the build, and publishes dist.

For a manual Static Site setup, use npm ci && npm run build as the build command and dist as the publish directory.

The current site uses separate HTML pages. No catch-all SPA rewrite is needed.

If your GitHub repository contains the surrounding Portfolio workspace instead of this project's contents at its root, set the service rootDir to eshan-portfolio and use eshan-portfolio/render.yaml as the Blueprint Path.
