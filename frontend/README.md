# Frontend README

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

## Component Structure

### Pages
- **Home**: Landing page with hero section, services overview, stats, and CTA
- **Services**: Detailed services page with all offerings
- **About**: Company information and values
- **Contact**: Contact form and information
- **BookAppointment**: Interactive appointment booking form
- **GetQuote**: Detailed quote request form

### Components
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Site footer with links and contact info

## Styling

The application uses custom CSS with:
- CSS Variables for theming
- Flexbox and Grid for layouts
- Media queries for responsiveness
- Framer Motion for animations
- Mobile-first approach

## API Integration

API calls are centralized in `src/services/api.ts`. The application connects to the backend at the URL specified in `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## State Management

Currently using React's built-in useState and useEffect hooks. For larger applications, consider adding:
- Redux Toolkit
- React Query
- Zustand

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React.lazy() (can be added)
- Image optimization
- Minification and bundling
- CSS purging (can be configured)

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variables

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #7c3aed;
  --accent-color: #f59e0b;
  /* ... */
}
```

### Fonts
Update font imports in `public/index.html` and `src/index.css`

### Content
Update text content directly in component files
