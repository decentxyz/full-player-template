import { AiFillCheckCircle } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import Spinner from "../Spinner";

const loadingStates = [
  {
    key: 0,
    status: (
      <p className="flex items-center text-white">
        <BsCircle style={{ height: 16, width: 16 }} />
      </p>
    ),
  },
  {
    key: 1,
    status: <Spinner height={16} width={16} color="text-blue-light" />,
  },
  {
    key: 2,
    status: (
      <p className="text-green flex items-center">
        <AiFillCheckCircle style={{ height: 20, width: 20 }} />
      </p>
    ),
  },
];

const loadingMessages = [
  { key: 0, status: <p className="text-white text-xs pt-2">Queued</p> },
  {
    key: 1,
    status: (
      <p className="text-white text-xs pt-2 whitespace-nowrap">In Progress</p>
    ),
  },
  {
    key: 2,
    status: <p className="text-green text-xs font-medium pt-2">Completed</p>,
  },
];

const PlayerDeployProgressModal = (props: any) => {
  const { step, hideUpload = false } = props;

  const uploaded = hideUpload || step > 1;
  const signed = hideUpload ? step > 1 : step > 2;
  const confirmed = hideUpload ? step > 2 : step > 3;
  return (
    <div className="bg-background bg-opacity-10 backdrop-blur-lg z-20 drop-shadow-lg rounded max-w-sm min-w-fit mx-auto p-4 space-y-4">
      {!hideUpload && (
        <div className="w-full justify-between gap-2 flex">
          <div>
            <div className="flex gap-3">
              {uploaded ? loadingStates[2].status : loadingStates[1].status}
              <p className="text-lg text-white font-medium flex">Upload</p>
            </div>
            <p className="text-white text-xs pl-8 pt-1 font-thin">
              Contract details
            </p>
            <p className="text-white text-xs pl-8 pt-1 font-thin">Metadata</p>
          </div>
          <div>
            {uploaded ? loadingMessages[2].status : loadingMessages[1].status}
            {uploaded ? (
              <p className="text-green pt-2 flex justify-end">
                <AiFillCheckCircle style={{ height: 12, width: 12 }} />
              </p>
            ) : (
              <p className="text-white pt-2 flex justify-end">
                <BsCircle style={{ height: 10, width: 10 }} />
              </p>
            )}
            {uploaded ? (
              <p className="text-green pt-2 flex justify-end">
                <AiFillCheckCircle style={{ height: 12, width: 12 }} />
              </p>
            ) : (
              <p className="text-white pt-2 flex justify-end">
                <BsCircle style={{ height: 10, width: 10 }} />
              </p>
            )}
          </div>
        </div>
      )}

      <div className="w-full justify-between gap-2 flex justify-end">
        <div>
          <div className="flex gap-3">
            {!uploaded
              ? loadingStates[0].status
              : signed
              ? loadingStates[2].status
              : loadingStates[1].status}
            <p className="text-lg text-white font-medium flex">
              Sign the transaction
            </p>
          </div>
          <p className="text-white text-xs pl-8 pt-1 font-thin">
            Open wallet and sign
          </p>
        </div>
        <div>
          {!uploaded
            ? loadingMessages[0].status
            : signed
            ? loadingMessages[2].status
            : loadingMessages[1].status}
          {signed ? (
            <p className="text-green pt-2 flex justify-end">
              <AiFillCheckCircle style={{ height: 12, width: 12 }} />
            </p>
          ) : (
            <p className="text-white pt-2 flex justify-end">
              <BsCircle style={{ height: 10, width: 10 }} />
            </p>
          )}
        </div>
      </div>

      <div className="w-full justify-between gap-2 flex justify-end">
        <div>
          <div className="flex gap-3">
            {!signed
              ? loadingStates[0].status
              : confirmed
              ? loadingStates[2].status
              : loadingStates[1].status}
            <p className="text-lg text-white font-medium flex">Finalizing</p>
          </div>
          <p className="text-white text-xs pl-8 pt-1 font-thin">
            Confirming transaction
          </p>
          <p className="text-white text-xs pl-8 pt-1 font-thin">
            {props.chain
              ? `Confirmed on ${props.chain}`
              : "Please reconnect wallet"}
          </p>
        </div>
        <div>
          {!signed
            ? loadingMessages[0].status
            : confirmed
            ? loadingMessages[2].status
            : loadingMessages[1].status}
          {confirmed ? (
            <p className="text-green pt-2 flex justify-end">
              <AiFillCheckCircle style={{ height: 12, width: 12 }} />
            </p>
          ) : (
            <p className="text-white pt-2 flex justify-end">
              <BsCircle style={{ height: 10, width: 10 }} />
            </p>
          )}
          {confirmed ? (
            <p className="text-green pt-2 flex justify-end">
              <AiFillCheckCircle style={{ height: 10, width: 10 }} />
            </p>
          ) : (
            <p className="text-white pt-2 flex justify-end">
              <BsCircle style={{ height: 10, width: 10 }} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDeployProgressModal;
