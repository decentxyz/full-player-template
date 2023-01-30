import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import LaunchPage from "../LaunchPage";
import DashboardPage from "../DashboardPage/DashboardPage";

const Home: NextPage = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div className={`${styles.container} background`}>
      {entered ? (
        <DashboardPage />
      ) : (
        <LaunchPage onClick={() => setEntered(true)} />
      )}
    </div>
  );
};

export default Home;
