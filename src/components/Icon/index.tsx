type Props = {
    lib: "remix-icon";
    icon: string;
    className?: string;
};

const Icon = ({ lib, icon, className }: Props) => {
    const classNames = lib === "remix-icon" ? "ri-" + icon : "";
    return (
        <i
            className={
                className !== undefined
                    ? className + " " + classNames
                    : classNames
            }
        ></i>
    );
};

export default Icon;
