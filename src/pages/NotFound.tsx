
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import GradientButton from "@/components/GradientButton";
import AnimatedTransition from "@/components/AnimatedTransition";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <AnimatedTransition animation="fade">
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">404</h1>
            <p className="text-xl text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
            <GradientButton
              onClick={() => navigate("/")}
            >
              Return to Home
            </GradientButton>
          </div>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default NotFound;
