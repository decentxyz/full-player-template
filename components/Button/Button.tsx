const Button = ({ text, onClick, disabled = false }: any) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-black text-white py-2 px-8 rounded-full hover:bg-opacity-80"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
