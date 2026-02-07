# Valentine's wordle

Forked from a wordle repo, modified to accept only 9 characters. Designed for valentine's day 2026.

Happy Valentine's day in advance!

## Deployment to GitHub Pages

This app is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Automatic Deployment

1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to the `main` or `master` branch - the workflow will automatically build and deploy

### Manual Deployment

If you prefer to deploy manually:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/valentine-wordle"
   ```

2. Install dependencies and deploy:
   ```bash
   npm install
   npm run deploy
   ```

The app will be available at `https://YOUR_USERNAME.github.io/valentine-wordle`