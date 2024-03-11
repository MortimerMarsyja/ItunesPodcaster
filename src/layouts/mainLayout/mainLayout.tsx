import { Link } from "@tanstack/react-router";
import Header from "../../components/header";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full">
      <Header>
        <Link to="/">Podcaster</Link>
      </Header>
      {children}
    </div>
  );
};

export default MainLayout;
