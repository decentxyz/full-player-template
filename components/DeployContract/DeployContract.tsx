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
import SaleDates from "./SaleDates";
import handleTxError from "../../lib/handleTxError";

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

const DeployContract = ({ metadata, setMetadata, setDeploymentStep }: any) => {
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
  const [isHovering4, setIsHovering4] = useState(false);
  const [isHovering5, setIsHovering5] = useState(false);
  const [saleStart, setSaleStart] = useState(0);
  const [saleEnd, setSaleEnd] = useState(0);
  const [size, setSize] = useState("open" as string);

  useEffect(() => {
    console.log("checking...");
    if (!metadata?.name) return;
    console.log("metadata", metadata);
    setValue("collectionName", metadata.name);
    setValue("symbol", metadata.symbol || metadata.artist);
    setValue("editionSize", metadata.editionSize || 11);
    setValue("tokenPrice", metadata.tokenPrice || "0.0111");
    setSaleStart(metadata.saleStart);
    setSaleEnd(metadata.saleEnd);
    setValue("royalty", metadata.royalty);
    setValue("maxTokenPurchase", metadata.maxTokenPurchase);
    setValue("description", metadata.description);
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

        setMetadata({
          ...metadata,
          editionSize: getValues("editionSize"),
          tokenPrice: getValues("tokenPrice"),
          maxTokenPurchase: getValues("maxTokenPurchase"),
          saleStart,
          saleEnd,
          royalty: getValues("royalty"),
          description: getValues("description"),
          name: getValues("collectionName"),
          symbol: getValues("symbol"),
        });

        const dateToEpochTime = (date: Date) =>
          Math.floor(date.getTime() / 1000);
        const UINT64_MAX = "18446744073709551615";
        const UINT64_MINUS_ONE = ethers.BigNumber.from(UINT64_MAX)
          .sub(1)
          .toString();

        const formattedStartDate = saleStart
          ? dateToEpochTime(new Date(saleStart))
          : 0;

        console.log("saleEnd", saleEnd);

        const formattedEndDate =
          saleEnd > 0
            ? dateToEpochTime(new Date(saleEnd))
            : ethers.BigNumber.from(UINT64_MINUS_ONE);

        console.log("formattedStartDate", formattedStartDate);
        console.log("formattedEndDate", formattedEndDate);
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
            formattedStartDate, // presaleStart
            formattedEndDate, // presaleEnd
            formattedStartDate, // saleStart
            formattedEndDate, // saleEnd
            getValues("royalty") * 100 || 0, // royaltyBPS
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
          handleTxError(error);
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

  function handleChange(e: any) {
    let value = e.target.value;
    console.log("value", value);
    setSize(value);
  }

  const inputClass = "border border-black text-black rounded-lg p-3";
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="gap-4 lg:mx-24 sm:mx-16">
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
              <div className="pb-2 flex items-center">
                <label>Edition Size</label>
                <InfoField
                  xDirection={"left"}
                  yDirection={"bottom"}
                  infoText={
                    "Fixed Editions limit the supply of NFTs to whatever value you enter - enter 1 for a 1 of 1 release.  Fixed editions promote scarcity value and are best for rare assets with high financial or cultural value. If you would like unlimited editions, please use Crescendo."
                  }
                />
              </div>
              <div className="flex items-center w-full relative gap-4">
                <select
                  onChange={(e) => handleChange(e)}
                  className="px-3 py-2 rounded-full border border-[#E4E3E7] cursor-pointer text-black"
                  name="editionSize"
                  value={size}
                  id="size"
                >
                  <option value="fixed">Fixed</option>
                  <option value="open">Open</option>
                </select>

                <input
                  disabled={size === ("open" as any)}
                  className={inputClass}
                  {...register("editionSize")}
                />

                <p className="text-sm absolute right-3">Editions</p>
              </div>
              <p className="error-text">
                <ErrorMessage errors={errors} name="editionSize" />
              </p>
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

            <SaleDates
              hovers={{
                isHovering4,
                isHovering5,
                setIsHovering4,
                setIsHovering5,
              }}
              saleStart={saleStart}
              saleEnd={saleEnd}
              setSaleStart={setSaleStart}
              setSaleEnd={setSaleEnd}
            />
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
              className="cursor-pointer bg-white text-black px-4 py-1 rounded-full"
            />
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default DeployContract;
