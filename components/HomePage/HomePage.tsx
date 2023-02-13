import type { NextPage } from "next";
import { useState } from "react";
import LaunchPage from "../LaunchPage";
import PlayerCreatePage from "../PlayerCreatePage";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { create } = router.query;
  const entered = create !== undefined;

  return (
    <div>
      {entered ? (
        <PlayerCreatePage />
      ) : (
        <LaunchPage onClick={() => router.push(router.asPath + "?create")} />
      )}
    </div>
  );
};

export default Home;
