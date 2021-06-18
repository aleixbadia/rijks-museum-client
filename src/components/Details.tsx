import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import rijksService from "../services/rijks.service";
import { Image, Typography } from "antd";
import DetailsSkeleton from "../skeletons/Details-skeleton";
import { artObjDetInt } from "../interfaces/ArtObj.interface";

const { Title } = Typography;

function Details(): JSX.Element {
  const [artObject, setArtObject] = useState<artObjDetInt | null>(null);

  useEffect(() => {
    rijksService.getByObjectNumber(params.objectNumber).then((response) => {
      if (response) {
        console.log(response);
        setArtObject(response);
      }
    });
  });

  const params: { objectNumber: string } = useParams();
  return (
    <Fragment>
      {artObject ? (
        <>
          <Title>{artObject.title}</Title>
          <Title level={2}>by {artObject.principalMaker}</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            <Image
              style={{ minWidth: "150px", maxWidth: "300px" }}
              src={artObject.webImage.url}
            />
            <div style={{ width: "50%", marginLeft: "5%" }}>
              <h4>{artObject.description}</h4>
            </div>
          </div>
        </>
      ) : (
        <DetailsSkeleton />
      )}
    </Fragment>
  );
}

export default Details;
