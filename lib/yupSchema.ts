import * as yup from "yup";

const yupSchema = yup.object().shape({
    collectionName: yup.string().required("Name your collection."),
    symbol: yup.string().required("Give your collection a symbol."),
    tokenPrice: yup
      .number()
      .typeError(
        "Must set price for token. Please set to 0 if you wish for your NFTs to be free."
      ),
    editionSize: yup
      .number()
      .min(1, "Edition size must be greater than 0")
      .typeError("Please enter the number of NFTs included in this collection."),
    maxTokenPurchase: yup.lazy((value) => {
      return value === ""
        ? yup.string()
        : yup
            .number()
            .typeError(
              "Cap must be a valid number. Please set to 0 if you do not wish to set a cap."
            );
    }),
    royalty: yup.lazy((value) => {
      return value === ""
        ? yup.string()
        : yup
            .number()
            .typeError(
              "Royalty must be a valid number. Please set to 0 if you do not wish to set a royalty."
            );
    }),
    nftImage: yup.mixed().test("file", "Upload your NFT art.", (value) => {
      return value?.length > 0;
    }),
});

export default yupSchema