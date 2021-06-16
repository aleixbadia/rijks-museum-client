import React from "react";
import { Skeleton } from "antd";

function GallerySkeleton(): JSX.Element {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {[...Array(8)].map((e, i) => (
        <div key={i} style={{ margin: 10 }}>
          <Skeleton.Image style={{ width: 240, height: 300 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
      ))}
    </div>
  );
}
export default GallerySkeleton;
