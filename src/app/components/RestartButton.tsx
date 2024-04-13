import { CiRedo } from "react-icons/ci";

type Props = {
  handleClick: () => void;
};

export default function ActionButton({ handleClick }: Props) {
  return (
    <button onClick={handleClick} style={{ width: "40px", height: "40px" }}>
      <CiRedo size={40} />
    </button>
  );
}
