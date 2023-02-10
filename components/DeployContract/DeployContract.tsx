import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DecentSDK, edition } from "@decent.xyz/sdk";
import { useSigner, useNetwork } from "wagmi";
import { ethers } from "ethers";
import InfoField from "../InfoField";
import { yupResolver } from "@hookform/resolvers/yup";
import { NFTStorage, Blob } from "nft.storage";
import { useRouter } from "next/router";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import yupSchema from "../../lib/yupSchema";

type FormData = {
  collectionName: string;
  symbol: string;
  description: string;
  nftImage: any;
  audioFile: any;
  editionSize: number;
  tokenPrice: string;
  maxTokenPurchase: number;
  royalty: number;
};

const DeployContract = ({ metadata, setDeploymentStep }: any) => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const router = useRouter();
  const { openConnectModal } = useConnectModal();

  const methods = useForm<FormData>({
    resolver: yupResolver(yupSchema),
  });
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;
  const onSubmit = handleSubmit((data) => console.log(data));

  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [isHovering3, setIsHovering3] = useState(false);

  useEffect(() => {
    if (!metadata?.name) return;
    setValue("collectionName", metadata.name);
    setValue("symbol", metadata.artist);
    setValue("editionSize", 11);
    setValue("tokenPrice", "0.0111");
  }, [metadata]);

  const deployFunction = async () => {
    try {
      if (!signer) {
        console.error("Please connect wallet.");
        openConnectModal?.();
      } else if (chain) {
        // create metadata
        const finalMetadata = {
          description: getValues("description"),
          image: metadata.image,
          name: getValues("collectionName"),
          animation_url: metadata.animation_url,
        };

        // build metadata json file
        const data = JSON.stringify(finalMetadata, null, 1);
        const bytes = new TextEncoder().encode(data);
        const blob = new Blob([bytes], {
          type: "application/json;charset=utf-8",
        });

        // send metadata file to ipfs
        setDeploymentStep(1);
        const client = new NFTStorage({
          token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN || "",
        });
        const ipfs = await client.storeBlob(blob);

        const sdk = new DecentSDK(chain.id, signer);
        let nft;

        try {
          setDeploymentStep(2);
          nft = await edition.deploy(
            sdk,
            getValues("collectionName"), // name
            getValues("symbol"), // symbol
            false, // hasAdjustableCap
            getValues("editionSize"), // maxTokens
            ethers.utils.parseEther(getValues("tokenPrice")), // tokenPrice
            getValues("maxTokenPurchase") || 0, // maxTokensPurchase
            null, //presaleMerkleRoot
            0, // presaleStart
            0, // presaleEnd
            0, // saleStart
            Math.floor(new Date().getTime() / 1000 + 60 * 60 * 24 * 365), // saleEnd = 1 year
            getValues("royalty") * 100, // royaltyBPS
            `ipfs://${ipfs}?`, // contractURI
            `ipfs://${ipfs}?`, // metadataURI
            null, // metadataRendererInit
            null, // tokenGateConfig
            () => {
              setDeploymentStep(3);
            },
            () => {
              setDeploymentStep(4);
            }
          );
        } catch (error) {
          console.error(error);
          setDeploymentStep(0);
        } finally {
          if (nft?.address) {
            router.push(
              `https://hq.decent.xyz/${chain.id}/Editions/${nft.address}`
            );
          }
        }
      }
      return;
    } catch (error: any) {
      if (error.code === "INSUFFICIENT FUNDS") {
        console.error("get more $$, fren");
      }
    }
  };

  const inputClass = "border border-black text-black rounded-lg p-3";
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="gap-4">
          <div className="flex flex-wrap items-center gap-12">
            <div>
              <p className="font-header">Collection Name</p>
              <input
                className={inputClass}
                {...register("collectionName", {
                  required: "Name your collection",
                })}
              />
              <p className="text-red-600 text-sm">
                <ErrorMessage errors={errors} name="collectionName" />
              </p>
            </div>

            <div>
              <div className="pb-2 flex gap-1 items-center">
                <p className="font-header">Edition Size</p>
                <InfoField
                  isHovering={isHovering1}
                  setIsHovering={setIsHovering1}
                  xDirection={"right"}
                  yDirection={"bottom"}
                  infoText={"Number of NFTs available in the collection."}
                />
              </div>
              <input className={inputClass} {...register("editionSize")} />
            </div>

            <div>
              <div className="pb-2 flex gap-1 items-center">
                <p className="font-header">Purchase Count (Optional)</p>
                <InfoField
                  isHovering={isHovering2}
                  setIsHovering={setIsHovering2}
                  xDirection={"right"}
                  yDirection={"bottom"}
                  infoText={
                    "Enter the number of NFTs each user can mint at one time.."
                  }
                />
              </div>
              <input className={inputClass} {...register("maxTokenPurchase")} />
            </div>

            <div>
              <p className="font-header">Symbol</p>
              <input
                className={inputClass}
                {...register("symbol", {
                  required: "Give your collection a symbol",
                })}
              />
              <p className="text-red-600 text-sm">
                <ErrorMessage errors={errors} name="symbol" />
              </p>
            </div>

            <div>
              <p className="font-header">Token Price</p>
              <input
                className={inputClass}
                {...register("tokenPrice", {
                  required:
                    "Must set price for token.  Please set to 0 if you wish for your NFTs to be free.",
                })}
              />
              <p className="text-red-600 text-sm">
                <ErrorMessage errors={errors} name="tokenPrice" />
              </p>
            </div>

            {/* Decent contracts support EIP 2981 */}
            <div>
              <div className="pb-2 flex gap-1">
                <p>Creator Royalty (Optional)</p>
                <InfoField
                  isHovering={isHovering3}
                  setIsHovering={setIsHovering3}
                  xDirection={"left"}
                  yDirection={"bottom"}
                  infoText={
                    "Please enter a percentage that you would like to receive from the value of every sale.  We use EIP 2981."
                  }
                />
              </div>
              <div className="flex items-center w-fit text-black relative">
                <input className={inputClass} {...register("royalty")} />
                <p className="text-sm absolute right-3">%</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-header">Description</p>
            <textarea
              className={`${inputClass} w-1/2`}
              {...register("description", {
                required: "Please enter a description.",
              })}
            />
            <p className="text-red-600 text-sm">
              <ErrorMessage errors={errors} name="description" />
            </p>
          </div>

          <button
            className="pt-8 flex gap-4 items-center"
            type="button"
            onClick={() => deployFunction()}
          >
            <input
              type="submit"
              className="cursor-pointer bg-black text-white px-8 py-2 rounded-full hover:bg-opacity-80"
            />
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default DeployContract;
