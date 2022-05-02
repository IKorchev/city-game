
export const generateRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min)

export const canvasStyles: any = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  zIndex: 5,
  top: 0,
  left: 0,
}
