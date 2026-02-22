# React Precision Suite

A high-performance React application serving as a modern playground for interactive components. This project implements a standardized user interface with fluid animations, a global dark/light theme toggle, and local storage persistence across several functional mini-applications.

## Tech Stack

<div align="left">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/framer%20motion-black?style=for-the-badge&logo=framer&logoColor=blue" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
</div>

## Core Architecture

The repository is built on React 19 and Vite, utilizing functional components and hooks. State management is handled through React Context for global settings and local state for component-specific logic. 

Key architectural implementations include:
* **Theme Management:** A global `ThemeContext` that reads from and writes to `localStorage`, applying a `dark` class to the HTML root. Tailwind CSS v4 is configured with `@custom-variant dark` to respond to this class.
* **Routing and Transitions:** `react-router-dom` handles client-side navigation, wrapped in Framer Motion's `AnimatePresence` to enable smooth fade and slide transitions between page routes.
* **Persistent Data:** The `useEffect` hook syncs state changes directly to the browser's `localStorage` to ensure data persists across sessions.

## Applications within the Suite

### 1. Precision Counter
An interactive counter designed with keyboard accessibility.
* Supports incrementing/decrementing via UI buttons (+1, +2, -1, -2) and keyboard arrows.
* Dynamic background gradient that reacts to the current value.
* Values are cached in `localStorage` to retain the count upon reload.

### 2. Precision Compute
A functional calculator with a glassmorphism interface.
* Handles standard arithmetic operations (addition, subtraction, multiplication, division).
* Supports decimal floating-point arithmetic and state reset.
* Displays live equation tracking above the main input display.

### 3. Precision Strategy (Tic-Tac-Toe)
A classic zero-sum logic game.
* Implements win-detection logic to identify completed rows, columns, or diagonals.
* Highlights the winning line dynamically upon completion.
* Animated entry for 'X' and 'O' markers using Framer Motion.

### 4. Action Items (Todo List)
A task management interface.
* Users can add, toggle completion status, and delete tasks.
* Utilizes Framer Motion's `layout` prop for fluid reordering and removal animations.
* Completed tasks transition to a muted, strike-through styling.
* Task lists are preserved across sessions via `localStorage`.

### 5. Precision Hub (GitHub Explorer)
A developer profile explorer integrating with the public GitHub API.
* Uses Redux Thunk to handle asynchronous data fetching for user profiles and recent repositories.
* Global state management caches the fetched data, preventing redundant API calls when navigating between suite applications.
* Handles loading states, error boundaries, and success data mapping gracefully.

## Getting Started

To run this project locally, ensure you have Node.js installed, then execute the following commands in your terminal:

```bash
# Clone the repository
git clone https://github.com/daff00/react-modern-playground.git

# Navigate into the project directory
cd react-precision-suite

# Install dependencies
npm install

# Start the development server
npm run dev