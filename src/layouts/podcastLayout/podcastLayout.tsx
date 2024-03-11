interface Props {
  leftSide: React.ReactNode;
  rightSide: React.ReactNode;
}

const PodcastLayout = ({ leftSide, rightSide }: Props) => {
  return (
    <div className="flex gap-3">
      <div className="h-[400px] w-1/4 flex shadow-md items-center flex-col">
        {leftSide}
      </div>
      <div className="w-3/4 min-h-[400px]">{rightSide}</div>
    </div>
  );
};

export default PodcastLayout;
