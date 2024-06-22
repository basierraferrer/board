import { fromEvent, map, merge, mergeAll, takeUntil } from "rxjs";

const canvas = document.getElementById("reactive-canvas") as HTMLCanvasElement;
const restartButton = document.getElementById(
  "restart-btn"
) as HTMLButtonElement;

const cursorPosition = { x: 0, y: 0 };

const onMouseDown$ = fromEvent<MouseEvent>(document, "mousedown");
const onMouseUp$ = fromEvent(document, "mouseup");
const onMouseMove$ = fromEvent(document, "mousemove").pipe(
  takeUntil(onMouseUp$)
);

const updateCursorPosition = (evt: MouseEvent) => {
  cursorPosition.x = evt.clientX - canvas.offsetLeft;
  cursorPosition.y = evt.clientY - canvas.offsetTop;
};

let mouseDownSubscription$ = onMouseDown$.subscribe(updateCursorPosition);

const canvasContext = canvas.getContext("2d");

canvasContext!.lineWidth = 8;
canvasContext!.lineJoin = "round";
canvasContext!.lineCap = "round";
canvasContext!.strokeStyle = "white";

const paintStroke = (event: Event) => {
  canvasContext!.beginPath();
  canvasContext!.moveTo(cursorPosition.x, cursorPosition.y);
  updateCursorPosition(event as MouseEvent);
  canvasContext!.lineTo(cursorPosition.x, cursorPosition.y);
  canvasContext!.stroke();
  canvasContext!.closePath();
};

const startPaint$ = onMouseDown$.pipe(
  map(() => onMouseMove$),
  mergeAll()
);

let startPaintSubscription$ = startPaint$.subscribe(paintStroke);

const onLoadWindow$ = fromEvent(window, "load");
const onRestartBoard$ = fromEvent(restartButton, "click");

const restartBoard$ = merge(onLoadWindow$, onRestartBoard$);

restartBoard$.subscribe(() => {
  startPaintSubscription$.unsubscribe();
  mouseDownSubscription$.unsubscribe();
  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  startPaintSubscription$ = startPaint$.subscribe(paintStroke);
  mouseDownSubscription$ = onMouseDown$.subscribe(updateCursorPosition);
});
