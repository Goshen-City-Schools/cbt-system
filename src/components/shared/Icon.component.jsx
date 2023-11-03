/* eslint-disable react/prop-types */

export default function IconComponent({ children, click, className }) {
  return (
    <div
      onClick={click}
      className={`${className} icon h-6 w-6 flex items-center justify-center`}
    >
      {children}
    </div>
  );
}
