import { Link } from "@tanstack/react-router";
import Header from "../../components/header";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  return (
    <div className="w-full h-full">
      <Header isLoading={!isMounted}>
        <Link to="/">Podcaster</Link>
      </Header>
      {children}
    </div>
  );
};

export default MainLayout;
