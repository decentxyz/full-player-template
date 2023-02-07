const Button = ({ text, onClick, disabled = false }: any) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white text-[#3b1675] font-bold py-2 px-4 rounded-full hover:bg-[#3b1675] hover:text-white"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
