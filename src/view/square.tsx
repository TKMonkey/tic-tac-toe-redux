import React from "react";
import { Player } from "../domain";

export function Square(props: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  value?: Player;
}) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
