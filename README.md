Mtify
Mtify is a cutting-edge web-based music player application inspired by platforms like Spotify, designed to deliver a best-in-class music streaming experience. Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Magic UI, Mtify combines a sleek, responsive interface with advanced functionality, including smooth navigation, personalized playlists, and animated UI components for an engaging user experience.
Features

Advanced Music Playback: Stream music with a modern player supporting play, pause, skip, and volume controls.
Personalized Playlists: Create, manage, and explore curated playlists with seamless integration.
Music Discovery: Discover trending songs, new releases, and personalized recommendations.
Responsive Design: Fully optimized for desktop, tablet, and mobile devices using Tailwind CSS.
Accessible Components: Powered by shadcn/ui, ensuring accessibility with Radix UI primitives.
Stunning Animations: Enhanced with Magic UI’s animation-rich components for visually appealing transitions and effects.
Type-Safe Development: Built with TypeScript for robust, maintainable code.
Customizable UI: Easily tailor components to match your brand using shadcn/ui and Tailwind CSS.

Tech Stack

Framework: Next.js 15.3.3 (App Router)
Language: TypeScript
Styling: Tailwind CSS 3.4.0
UI Libraries:
shadcn/ui: Accessible, customizable React components built with Radix UI and Tailwind CSS.
Magic UI: Animation-rich, modern UI components for engaging interfaces.


Build Tool: pnpm
Linting: ESLint with Next.js configuration
Dependencies:
React 19.0.0, React DOM 19.0.0
PostCSS 8, Autoprefixer 10



Prerequisites
Before setting up Mtify, ensure you have the following installed:

Node.js: Version 12.13.0 or higher
pnpm: Version 10.11.0 or higher (recommended)

Installation

Clone the Repository:
git clone https://github.com/your-username/mtify.git
cd mtify


Install Dependencies:
pnpm install


Install shadcn/ui:Initialize shadcn/ui and add desired components (e.g., button, card, input):
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input form

Note: If pnpm dlx fails (as seen previously with ERR_PNPM_DLX_NO_BIN), use:
npx shadcn@latest init
npx shadcn@latest add button card input form


Install Magic UI:Add Magic UI components (e.g., animated buttons, modals) by following their documentation or copying components from Magic UI. For example:
pnpm add framer-motion

Then, copy Magic UI components into your project’s components/ui/ directory.

Run the Development Server:
pnpm dev

Open http://localhost:3000 to view the app in your browser.
Note: If Turbopack causes issues, run:
pnpm dev --no-turbopack


Build for Production:
pnpm build
pnpm start



Project Structure
mtify/
├── app/                    # Next.js App Router (pages, layouts, etc.)
├── components/             # Reusable React components
│   ├── ui/                # shadcn/ui and Magic UI components
├── src/                   # Optional: Source files (if used)
├── public/                # Static assets (e.g., album artwork)
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── package.json           # Project dependencies and scripts
├── README.md              # This file

Configuration

Tailwind CSS: Configured in tailwind.config.ts with paths to app/, pages/, components/, and src/ for style purging. Example:
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;


PostCSS: Configured in postcss.config.js:
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};


Global CSS: Located in app/globals.css with Tailwind directives:
@tailwind base;
@tailwind components;
@tailwind utilities;


shadcn/ui: Components are stored in components/ui/ and can be customized directly. Example usage in app/page.tsx:
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Now Playing</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Explore your favorite tracks!</p>
        <Button variant="primary">Play Now</Button>
      </CardContent>
    </Card>
  );
}


Magic UI: Add animated components (e.g., animated buttons, modals) from Magic UI for enhanced interactivity. Example:
import { AnimatedButton } from '@/components/ui/animated-button'; // Custom Magic UI component
export default function Player() {
  return <AnimatedButton>Toggle Playback</AnimatedButton>;
}



Advanced Functionality
Mtify leverages shadcn/ui and Magic UI to deliver a best-in-class music player experience:

Music Discovery:

Use shadcn/ui’s Card and Tabs components for a visually appealing discovery section showcasing trending songs and albums.
Implement Magic UI’s animated cards for dynamic transitions when browsing new releases.


Playlist Management:

Build forms with shadcn/ui’s Form, Input, and Button components for creating and editing playlists.
Add Magic UI’s animated modals for a smooth playlist creation experience.


Search and Filters:

Integrate shadcn/ui’s Input and DropdownMenu for a search bar with genre/mood filters.
Use Magic UI’s animated dropdowns for a polished, interactive filter UI.


Player Controls:

Create a player interface with shadcn/ui’s Button and Slider components for play/pause, skip, and volume controls.
Enhance with Magic UI’s animated sliders for a modern, engaging look.


Accessibility:

shadcn/ui components (built on Radix UI) ensure keyboard navigation and screen reader support.
Magic UI components are designed to maintain accessibility while adding animations.


Animations:

Magic UI’s Framer Motion integration provides smooth transitions for modals, buttons, and cards, enhancing user engagement.
Example: Animated playlist cards that fade in when loaded.



Usage

Explore Music: Navigate to the discovery section to browse trending songs, albums, and personalized recommendations.
Manage Playlists: Create and edit playlists using the intuitive form interface.
Play Music: Use the player controls to stream music with smooth, animated transitions.
Customize: Modify shadcn/ui and Magic UI components in components/ui/ to match your brand’s style.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to your branch (git push origin feature/your-feature).
Open a pull request.

Please ensure your code follows ESLint rules and includes TypeScript types. Test new components for accessibility and responsiveness.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or feedback, reach out to your-email@example.com or open an issue on GitHub.
