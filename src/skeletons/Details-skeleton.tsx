import React from "react";
import { Skeleton } from "antd";

function DetailsSkeleton(): JSX.Element {
  return (
    <div>
      <Skeleton active paragraph={{ rows: 0 }} />
      <br />
      <Skeleton active paragraph={{ rows: 0 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Skeleton.Image style={{ width: "25vw", height: "25vh" }} />
        <div style={{ width: "50%", marginLeft: "5%" }}>
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    </div>
  );
}

export default DetailsSkeleton;
