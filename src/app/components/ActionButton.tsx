import { CiPlay1, CiPause1 } from "react-icons/ci";

type Props = {
  handleClick: () => void;
  isPlaying: boolean;
};

export default function ActionButton({ handleClick, isPlaying }: Props) {
  return (
    <button onClick={handleClick} style={{ width: "40px", height: "40px" }}>
      {isPlaying ? <CiPause1 size={40} /> : <CiPlay1 size={40} />}
    </button>
  );
}
