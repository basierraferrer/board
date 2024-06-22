# Drawing Board

## Overview

This project includes an interactive drawing board implemented using RxJS. Users can draw on an HTML canvas element using their mouse.

### Features

- Draw strokes on the canvas by holding down the mouse button and moving the cursor.
- Clear the canvas and restart the drawing by clicking a restart button or reloading the window.
- Smooth user experience with debouncing and optimal event handling using RxJS.

### Core Implementation

The interactive drawing board leverages RxJS for event handling:

1. **Observables:**
   - `onMouseDown$`, `onMouseUp$`, `onMouseMove$`: Used to track mouse events.
2. **Subscriptions:**
   - Subscribes to the mouse events to update cursor positions and draw strokes on the canvas.
3. **Restart Mechanism:**
   - Merges window load and restart button click events to clear the canvas and reinitialize event subscriptions.

### Instalation

- How to get the project

```bash
# Clone the repository
git clone https://github.com/basierraferrer/board.git

# Navigate to the project directory
cd board/

# Install dependencies
npm install
```

- Running locally

```bash
npm start
```

- Then open the browser on

```url
http://localhost:8080
```
