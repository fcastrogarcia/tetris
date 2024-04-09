import { ShapeTypes } from "../shapes/types";
import Bar from "./bar";
import J from "./j";
import L from "./l";
import S from "./s";
import Square from "./square";
import Z from "./z";

export default function Preview(shapeType: ShapeTypes) {
  switch (shapeType) {
    case ShapeTypes.L: {
      return <L />;
    }
    case ShapeTypes.Bar: {
      return <Bar />;
    }
    case ShapeTypes.J: {
      return <J />;
    }
    case ShapeTypes.Square: {
      return <Square />;
    }
    case ShapeTypes.S: {
      return <S />;
    }
    case ShapeTypes.Z: {
      return <Z />;
    }
    default:
      return null;
  }
}
