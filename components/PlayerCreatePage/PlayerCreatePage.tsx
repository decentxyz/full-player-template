import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import SeoHead from "../SeoHead";
import PlayerCreateForm from "../PlayerCreateForm";
import Footer from "../Footer";
import { useState } from "react";
import MintingForm from "../MintingForm";

const PlayerCreatePage: NextPage = () => {
  const [metadata, setMetadata] = useState();

  return (
    <div className={`${styles.container} background`}>
      <SeoHead />
      {metadata ? (
        <MintingForm metadata={metadata} />
      ) : (
        <PlayerCreateForm setMetadata={setMetadata} />
      )}
      <Footer />
    </div>
  );
};

export default PlayerCreatePage;
