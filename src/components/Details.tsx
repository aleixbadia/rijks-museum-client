import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import rijksService from "../services/rijks.service";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import { Image, Typography, Button } from "antd";
import DetailsSkeleton from "../skeletons/Details-skeleton";
import { artObjDetInt } from "../interfaces/ArtObj.interface";

const { Title, Text } = Typography;

function Details(): JSX.Element {
  const [artObject, setArtObject] = useState<artObjDetInt | null>(null);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    rijksService.getByObjectNumber(params.objectNumber).then((response) => {
      if (response) {
        setArtObject(response);
      }
    });
  }, []);

  const handleAddClick = () => {
    if (artObject) {
      authService.me().then((response) => {
        if (response) {
          userService.addToFavs(artObject.objectNumber).then(() => {
            setIsAdded(true);
          });
        }
      });
    }
  };

  const params: { objectNumber: string } = useParams();
  return (
    <Fragment>
      {artObject ? (
        <>
          <Title>{artObject.title}</Title>
          <Title level={2}>by {artObject.principalOrFirstMaker}</Title>
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
              <div
                style={{
                  display: "flex",
                }}
              >
                <Button onClick={handleAddClick}>Add to favourites</Button>
                {isAdded ? (
                  <Text type="success" style={{ marginLeft: "40px" }}>Art object added to your list</Text>
                ) : (
                  <></>
                )}
              </div>
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
