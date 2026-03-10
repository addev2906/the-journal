# The Journal

A web-based tracker for pictos in *Clair Obscur: Expedition 33* save files. Upload your save file to view your collection progress, search for specific pictos, and filter to see only uncollected ones.

## Features

- **Savegame Upload**: Import your game save file to analyze pictogram collection.
- **Completion Tracking**: View which pictos you've found and which are missing.
- **Search Functionality**: Quickly find specific picto by name.
- **Filter Options**: Show only uncollected pictos for easy tracking.
- **Progress Visualization**: See your overall completion rate.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Vite**: Build tool for fast development and optimized production builds.
- **UESave**: Library for parsing Unreal Engine save files.
- **Webassembly**: To run uesave binary directly in the browser.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/addev2906/the-journal.git
   cd the-journal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Usage

1. Launch the app in your browser.
2. Click on the upload area to select and upload your game save file (`.sav` format).
3. View your picto collection status.
4. Use the search bar to find specific pictos.
5. Toggle the "Show Not Found Only" filter to focus on missing pictos.
6. Check your completion rate in the header.
