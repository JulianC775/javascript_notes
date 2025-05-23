# Mobile Game: Snake (iOS with Dart/Flutter)

## Project Overview

**Core Idea:** Develop mobile games for iOS using the Dart programming language and Flutter framework.

**Starting Project: Snake Game**
*   **Concept:** Classic Snake game where the player controls a growing snake, eating food and avoiding collisions with itself and the walls.
*   **Key Features (Snake):**
    *   Smooth snake movement and controls (swipe or D-pad).
    *   Random food generation.
    *   Score tracking.
    *   Game over conditions (collision).
    *   Simple UI for score and game state.
*   **Future Game Ideas:** (Placeholder for now, to be expanded later)

**Technology Stack:**
*   **Language:** Dart
*   **Framework:** Flutter
*   **Platform:** iOS (initially, with potential for Android)

**Goal:** Gain experience in mobile game development using Dart and Flutter, starting with a simple, well-known game and potentially expanding to more complex projects.

## Development Plan

### Phase 1: Basic Game Logic & Rendering

1.  **Project Setup:**
    *   Create a new Flutter project.
    *   Set up iOS simulator/device for testing.
2.  **Game Board & Snake Representation:**
    *   Define the game area (grid).
    *   Represent the snake (list of coordinates).
    *   Implement snake movement logic (changing direction).
3.  **Rendering:**
    *   Use Flutter's `CustomPaint` widget to draw the game board, snake, and food.
    *   Initial static rendering of the snake and food.
4.  **Game Loop:**
    *   Implement a basic game loop (e.g., using `Timer.periodic`) to update game state and re-render.
5.  **Food Spawning:**
    *   Logic to randomly place food on the board, avoiding snake's body.
6.  **Eating & Growth:**
    *   Detect collision between snake head and food.
    *   Increase snake length when food is eaten.
    *   Spawn new food.

### Phase 2: Controls & Collision

1.  **Input Handling:**
    *   Implement swipe gesture controls for snake direction.
    *   (Optional) Add on-screen D-pad controls.
2.  **Collision Detection:**
    *   Detect collision with walls (game boundaries).
    *   Detect collision with the snake's own body.
3.  **Game Over State:**
    *   Implement game over logic when a collision occurs.
    *   Display a "Game Over" message.

### Phase 3: UI & Scoring

1.  **Score Display:**
    *   Display the current score on the screen.
    *   Update score when food is eaten.
2.  **Game State UI:**
    *   Simple UI elements to show game status (e.g., "Paused", "Game Over").
    *   Add a "Start Game" / "Restart Game" button.
3.  **Basic Styling:**
    *   Apply simple styling to game elements and UI.

### Phase 4: Refinements & Polish (Optional but Recommended)

1.  **Sound Effects:**
    *   Add sound for eating food, game over, etc.
2.  **Difficulty Levels:**
    *   Option to increase snake speed or add obstacles.
3.  **High Score:**
    *   Persist high score (e.g., using `shared_preferences`).
4.  **Pause/Resume Functionality.**
5.  **Improved Visuals/Animations.**

## File Structure (Initial Thoughts)

A typical Flutter project structure will be generated. Key files/directories we'll be working with:

*   `pubspec.yaml`: For managing dependencies (e.g., `shared_preferences` if used).
*   `lib/`: Main directory for Dart code.
    *   `main.dart`: Entry point of the application.
    *   `game_screen.dart`: Widget for the main game screen, handling game loop and rendering.
    *   `snake.dart`: Class representing the snake, its properties, and movement logic.
    *   `food.dart`: Class or logic for food generation and properties.
    *   `game_controller.dart` (or similar): Handles game state, input, collision logic.
    *   `ui/`: Directory for UI-specific widgets (e.g., score display, game over screen).
    *   `utils/` or `helpers/`: For utility functions (e.g., coordinate calculations).
*   `assets/`: For any game assets like sound files or custom fonts (if used).

This plan provides a structured approach to developing the Snake game. Each phase builds upon the previous one, leading to a functional game.
