import "./Input.scss";

export function Input({
  value,
  setValue,
}: {
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <div className="settings-Input">
      <div className="minus" onClick={() => setValue(value - 1)}>
        -
      </div>

      <div className="value">{value}</div>

      <div className="plus" onClick={() => setValue(value + 1)}>
        +
      </div>
    </div>
  );
}
