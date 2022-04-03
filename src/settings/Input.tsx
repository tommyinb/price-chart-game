import "./Input.scss";

export function Input({
  value,
  setValue,
  minimum,
  maximum,
}: {
  value: number;
  setValue: (value: number) => void;
  minimum: number;
  maximum: number;
}) {
  return (
    <div className="settings-Input">
      <div
        className="minus"
        onClick={() => setValue(Math.max(value - 1, minimum))}
      >
        -
      </div>

      <div className="value">{value}</div>

      <div
        className="plus"
        onClick={() => setValue(Math.min(value + 1, maximum))}
      >
        +
      </div>
    </div>
  );
}
