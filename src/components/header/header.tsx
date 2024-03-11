interface Props {
  children: React.ReactNode;
}

const Header = ({ children }: Props) => {
  return (
    <header
      className={`
       w-full
       h-[34px]
       mb-8 
       flex 
       items-center
       border-b-2	
      border-[#5c7f94]
      hover:cursor-pointer
      `}
    >
      <h3
        className={`
        ml-4
        color-[#5c7f94]
        font-bold
        hover:cursor-pointer
      `}
      >
        {children}
      </h3>
      <div className="bg-blue-500 w-4 h-4 ml-auto mr-4 rounded-full">
        &nbsp;
      </div>
    </header>
  );
};
export default Header;
