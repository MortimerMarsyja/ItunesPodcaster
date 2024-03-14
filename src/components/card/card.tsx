import { useNavigate } from "@tanstack/react-router";

interface Props {
  title: string;
  author: string;
  imgData: {
    url: string;
    alt: string;
  };
  link: string;
}

const Card = ({ title, author, imgData, link }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate({
          to: link,
        })
      }
      className={`
      cursor-pointer
      h-[180px] 
      w-[320px] 
      flex 
      flex-col 
      items-center 
      justify-center
      shadow-md
      relative`}
    >
      <img
        className="rounded-full absolute top-[-60px] cursor-pointer"
        height={120}
        width={120}
        src={imgData.url}
        alt={imgData.alt}
      />
      <h3
        className={`
          text-2xl
          font-bold
          text-center
          flex
          mt-4
          px-4
          max-w-60
          h-[34px]
          overflow-hidden
          overflow-ellipsis
      `}
      >
        {title}
      </h3>
      <p
        className={`
          h-[34px]
          overflow-hidden
          overflow-ellipsis
      `}
      >
        {author}
      </p>
    </div>
  );
};

export default Card;
