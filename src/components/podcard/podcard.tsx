interface Props {
  collectionName: string;
  description: string;
  image: string;
  artist: string;
  onClick?: () => void;
}
const Podcard = ({
  collectionName,
  description,
  image,
  artist,
  onClick,
}: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <>
      <div className="p-4 border-b-2 w-[90%] border-gray-100 flex items-center justify-center">
        <img
          className={`${onClick ? "hover:cursor-pointer" : ""}`}
          width={150}
          height={150}
          src={image}
          onClick={handleClick}
        />
      </div>
      <div className="mx-3 py-4 border-b-2 border-gray-100 flex w-[90%] flex-col">
        <div
          className={`text-start font-bold ${onClick ? "hover:cursor-pointer" : ""}`}
          onClick={handleClick}
        >
          {collectionName}
        </div>
        {artist && <i className="text-start">by {artist}</i>}
      </div>
      <div className="w-[90%] flex mx-3 flex-col py-3">
        <h3 className="flex justify-normal text-start mb-2">Description:</h3>
        <i className="w-full h-[70px] text-start overflow-x-hidden overflow-y-scroll">
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </i>
      </div>
    </>
  );
};

export default Podcard;
