import type { NextPage } from "next";
import { useForm, FormProvider } from "react-hook-form";
import styles from "../../styles/Home.module.css";
import SeoHead from "../SeoHead";
import PlayerCreateForm from "../PlayerCreateForm";
import Footer from "../Footer";

const PlayerCreatePage: NextPage = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div className={`${styles.container} background`}>
        <SeoHead />
        <PlayerCreateForm />
        <Footer />
      </div>
    </FormProvider>
  );
};

export default PlayerCreatePage;
