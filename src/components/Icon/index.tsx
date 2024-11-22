type Props = {
  lib: "remix-icon";
  icon: string;
  className?: string;
  onClick?: () => void;
};

const Icon = ({ lib, icon, className, onClick }: Props) => {
  const classNames = lib === "remix-icon" ? "ri-" + icon : "";
  return (
    <i
      className={
        className !== undefined ? className + " " + classNames : classNames
      }
      onClick={onClick}
    ></i>
  );
};

export default Icon;
