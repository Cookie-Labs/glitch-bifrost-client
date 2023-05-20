export const Divider = ({width=1, height=12, color}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={12} fill={color} />
    </svg>
  );
};
