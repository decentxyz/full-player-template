import { useCallback, useState } from "react";
import CountUp from "react-countup";

const DataPoint = (props: any) => {
  const { value, label, toggle } = props;
  const [active, setActive] = useState(false);

  const format = useCallback((end: number) => {
    return end >= 1000 ? `${(end / 1000).toFixed(1)}K` : end.toString();
  }, []);

  const handleHover = () => {
    toggle(label);
    setActive(!active);
  };

  return (
    <div
      className={`transition font-mono text-9xl font-black hover:bg-[#B22222] rounded-lg px-5 text-center ${
        active && "bg-[#B22222]"
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <CountUp end={value} duration={1.75} formattingFn={format} />
      {active && <div className="text-xs">{label}</div>}
    </div>
  );
};

export default DataPoint;
