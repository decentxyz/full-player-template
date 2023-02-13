import InfoField from "../InfoField";
import Calendar from "./Calendar";

const SaleDates = ({
  saleStart,
  setSaleStart,
  saleEnd,
  setSaleEnd,
  size,
  hovers,
}: any) => {
  return (
    <div className=" flex items-center gap-7">
      {/* sale start */}
      <div>
        <div className="pb-2 flex items-center">
          <label>Sale Start Date (Optional)</label>
          <InfoField
            xDirection={"left"}
            yDirection={"bottom"}
            infoText={
              "Please select the date you would like sales to start.  If left blank, you can manually activate the ability to mint on the collection admin page."
            }
            setIsHovering={hovers.setIsHovering4}
            isHovering={hovers.isHovering4}
          />
        </div>
        <Calendar date={saleStart} setDate={setSaleStart} placeholder="Now" />
      </div>

      {/* sale end */}
      <div>
        <div className="pb-2 flex items-center">
          <label>{`Sale End Date ${
            size === "open" ? "*" : "(optional)"
          }`}</label>
          <InfoField
            xDirection={"left"}
            yDirection={"bottom"}
            infoText={
              "Please select the date you would like to sales to end. Minting period will continue until collection is sold out if left blank."
            }
            setIsHovering={hovers.setIsHovering5}
            isHovering={hovers.isHovering5}
          />
        </div>
        <Calendar date={saleEnd} setDate={setSaleEnd} placeholder="Never" />
      </div>
    </div>
  );
};

export default SaleDates;
