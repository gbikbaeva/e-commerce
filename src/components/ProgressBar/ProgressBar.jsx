const ProgressBar = ({ color, value }) => {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      className="grow h-2 rounded-lg bg-gray-200"
    >
      <div
        className={`h-full rounded-lg ${color || ""}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
