# Mobile To-Do List App (iOS & Android with JavaScript/React Native & Expo)

## Project Overview

**Core Idea:** Develop a mobile application for managing tasks and to-do lists, built for iOS and Android using the JavaScript programming language and React Native framework with Expo.

**Key Features:**

*   **Task Creation:** Allow users to add new tasks with titles and optional descriptions.
*   **Task Viewing:** Display a list of tasks.
    *   Show different views (e.g., all tasks, pending tasks, completed tasks).
*   **Task Editing:** Allow users to modify existing tasks (title, description).
*   **Task Completion:** Mark tasks as complete/incomplete.
*   **Task Deletion:** Remove tasks.
*   **Data Persistence:** Save tasks locally on the device so they persist between app sessions.
*   **User-Friendly Interface:** Simple, intuitive UI for managing tasks.

**Optional/Future Features:**

*   Due dates and reminders.
*   Task prioritization (e.g., high, medium, low).
*   Different lists/categories for tasks.
*   Cloud sync (e.g., using Firebase or another backend service).
*   Sorting and filtering tasks.

**Technology Stack:**

*   **Language:** JavaScript (or TypeScript)
*   **Framework/Platform:** React Native with Expo
*   **Target Platforms:** iOS and Android
*   **Local Data Storage:** `AsyncStorage` (or a more robust local database like SQLite via Expo's `expo-sqlite` if needed for more complex data).

**Goal:** Gain experience in mobile app development with React Native and Expo by building a practical and commonly used application, focusing on CRUD (Create, Read, Update, Delete) operations, state management, and local data persistence.

## Development Plan

### Phase 1: Basic UI and Task Input
**Status:** In Progress

1.  **Project Setup**
    *   **Status:** Completed
    *   Expo project `To_do_list` created.
    *   Development environment for testing on a physical device (via Expo Go) or emulator/simulator is ready.
2.  **Basic App Structure**
    *   **Status:** Pending
    *   Set up the main app component (`App.js`).
    *   Create a basic layout for the to-do list screen.
3.  **Task Input Component**
    *   **Status:** Pending
    *   Create a component with a `TextInput` for users to enter new task titles.
    *   Add a button ("Add Task") to submit the new task.
4.  **Initial Task Display (Static)**
    *   **Status:** Pending
    *   Display a few hardcoded tasks in a list to visualize the UI.
    *   Use React Native components like `<View>`, `<Text>`, `<TextInput>`, `<Button>` (or `<TouchableOpacity>` for custom buttons).

### Phase 2: State Management and Core Task Operations
**Status:** Pending

1.  **State for Tasks**
    *   **Status:** Pending
    *   Use React's `useState` hook to manage an array of task objects in the `App` component or a dedicated screen component. Each task object could have properties like `id`, `title`, `completed`.
2.  **Adding Tasks**
    *   **Status:** Pending
    *   Implement the logic to add a new task (from the input component) to the tasks array in the state.
    *   Ensure each new task gets a unique ID.
3.  **Rendering Tasks Dynamically**
    *   **Status:** Pending
    *   Use `<FlatList>` or `map()` to render the tasks from the state array.
    *   Each task in the list should be a separate component (`TaskItem.js`).
4.  **Toggling Task Completion**
    *   **Status:** Pending
    *   In `TaskItem.js`, add a way to mark a task as complete/incomplete (e.g., a checkbox or a tappable area).
    *   Update the `completed` status of the corresponding task in the main state.
    *   Visually differentiate completed tasks (e.g., strikethrough text).
5.  **Deleting Tasks**
    *   **Status:** Pending
    *   Add a delete button to each `TaskItem.js`.
    *   Implement logic to remove the selected task from the tasks array in the state.

### Phase 3: Data Persistence with AsyncStorage
**Status:** Pending

1.  **Saving Tasks**
    *   **Status:** Pending
    *   Whenever the tasks array in the state changes (add, toggle, delete), save the entire array to `AsyncStorage`. Remember to stringify the array before saving.
2.  **Loading Tasks**
    *   **Status:** Pending
    *   When the app starts, load the tasks from `AsyncStorage`.
    *   If tasks are found, initialize the app's state with these tasks. Remember to parse the stringified data.
3.  **Error Handling**
    *   **Status:** Pending
    *   Basic error handling for `AsyncStorage` operations (though it's generally reliable for simple data).

### Phase 4: UI Refinements & Basic Styling
**Status:** Pending

1.  **Styling**
    *   **Status:** Pending
    *   Apply styles using `StyleSheet` to make the app look presentable.
    *   Focus on readability and ease of use.
2.  **User Feedback**
    *   **Status:** Pending
    *   Provide some visual feedback for actions (e.g., when a task is added or deleted, though Fast Refresh often handles this visually during development).
3.  **Empty State**
    *   **Status:** Pending
    *   Display a message when there are no tasks to show.

### Phase 5: Further Enhancements (Optional)
**Status:** Pending

1.  **Task Editing**
    *   **Status:** Pending
    *   Implement functionality to edit the title/description of an existing task (e.g., tapping a task opens a modal or navigates to an edit screen).
2.  **Filtering**
    *   **Status:** Pending
    *   Add controls to filter tasks (e.g., show all, only pending, only completed).
3.  **Improved Styling and UX**
    *   **Status:** Pending
    *   More advanced styling, animations, or gestures.

## File Structure (Initial Thoughts)

A typical Expo/React Native project structure will be used for the `To_do_list` folder. Key files/directories we'll likely create/modify:

*   `package.json`: Manages dependencies. We'll rely on core React Native and Expo packages. `AsyncStorage` is available via `@react-native-async-storage/async-storage`.
*   `App.js` (or `App.tsx` if using TypeScript): Entry point of the application. Might contain the main screen logic or navigation setup.
*   `src/` (or a similar directory for your source code, e.g., `app/` or just keep components in the root for a small app):
    *   `screens/`:
        *   `TodoListScreen.js`: Main screen component that displays the list of tasks and handles task input.
    *   `components/`: Reusable UI components.
        *   `TaskItem.js`: Component to render a single task in the list (with complete/delete functionality).
        *   `TaskInput.js`: Component for the text input and add button.
    *   `utils/` or `hooks/`:
        *   Could have utility functions for ID generation or `AsyncStorage` interactions if they become complex.
    *   `constants/`: For any constant values (e.g., `AsyncStorage` keys).
    *   `assets/`: For any images or custom fonts (if used).

This plan provides a structured approach to developing the To-Do List app.
