import axios from "axios";
import { useEffect, useState } from "react";
import DataPoint from "../DataPoint";

const Developers = (props: any) => {
  const { toggle } = props;
  const DEV_TITLE = "Active Developers";
  const [collaborators, setCollaborators] = useState([]);

  const getCollaborators = async (username: string, repo: string) => {
    try {
      const response = await axios.get(`/api/getCollaborators`, {
        params: {
          username,
          repo,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCollaborators = async () => {
    const usernames = [
      "decentxyz",
      "decentxyz",
      "decentxyz",
      "decentxyz",
      "decentxyz",
    ];
    const repos = [
      "airdrop-starter",
      "DecentSDK-protocol",
      "minting-studio",
      "DecentSDK-npm",
      "ux-components",
    ];
    let newCollaborators = [] as any;
    for (let i = 0; i < usernames.length; i++) {
      let response = await getCollaborators(usernames[i], repos[i]);
      newCollaborators = [...newCollaborators, ...response];
    }
    const uniqueItems = newCollaborators.filter(
      (item: any, index: any) =>
        newCollaborators.findIndex((i: any) => i.id === item.id) === index
    );
    setCollaborators(uniqueItems);
  };

  useEffect(() => {
    getAllCollaborators();
  }, []);

  return (
    <DataPoint value={collaborators.length} label={DEV_TITLE} toggle={toggle} />
  );
};

export default Developers;
