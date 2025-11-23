<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1OpLOdi2AR88HquEleGQ3Xoozhnc87DGv

## 🚀 How to Run

### 1. Development (Recommended)

Use this mode while coding. It supports hot-reloading.

```bash
npm run dev
```

- Opens the app at `http://localhost:3000` (or similar).
- Edits to `index.html` or `src` files appear instantly.

### 2. Production Build

Use this to create the final files for deployment.

```bash
npm run build
```

- Generates a `dist` folder.
- **Do not edit files in `dist`**. They are auto-generated.
- To preview the build: `npx vite preview`

## 📂 Project Structure

- `index.html`: **Main entry point**. Edit this file.
- `src/`: Contains your React code (`.tsx`, `.ts`).
- `dist/`: **Build output**. Contains optimized files for the web. **Ignore this folder**.
