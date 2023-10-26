/* eslint-disable react/prop-types */

export default function IconComponent({ children, click }) {
  return (
    <div
      onClick={click}
      className="icon h-6 w-6 flex items-center justify-center"
    >
      {children}
    </div>
  );
}
