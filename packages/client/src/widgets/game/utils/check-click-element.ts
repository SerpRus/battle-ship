type TargetType = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type ClickPositionType = {
  x: number;
  y: number;
};

export default function checkClickElement(
  target: TargetType,
  clickPosition: ClickPositionType
) {
  return (
    clickPosition.x >= target.x &&
    clickPosition.y >= target.y &&
    clickPosition.x <= target.x + target.width &&
    clickPosition.y <= target.y + target.height
  );
}
