const Tooltip = ({ children, content }) => {
  return (
    <div className="relative group">
      {children}
      <span className="hidden w-fit whitespace-nowrap bg-black text-white text-center rounded-[5px] py-1 px-2 absolute z-10 top-6 text-[12px] group-hover:block">
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
