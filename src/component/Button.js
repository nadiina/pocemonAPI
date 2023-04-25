import React from "react";
import "./style/_button.scss";
import "./style/_pocList.scss"

export default function Button({ gotoNextPage }) {
  return (
    <div>
      {gotoNextPage && <button className="button" onClick={gotoNextPage}>Load more</button>}
    </div>
  );
}
