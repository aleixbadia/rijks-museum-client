import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import rijksService from "../services/rijks.service";
import userService from "../services/user.service";
import { Card, Input, Tooltip, Pagination, Button } from "antd";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import GallerySkeleton from "../skeletons/Gallery-skeleton";
import { artObjInt } from "../interfaces/ArtObj.interface";

const { Meta } = Card;

interface GalleryProps {
  isFavourites: boolean;
}

const Gallery: React.FunctionComponent<GalleryProps> = ({ isFavourites }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [artObjects, setArtObjects] = useState<artObjInt[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<artObjInt[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [artObjPerPage] = useState<number>(8);

  useEffect(() => {
    setLoading(true);
    if (isFavourites) {
      rijksService.getAllFavs().then((response) => {
        console.log("response :>> ", response);
        if (response) {
          setArtObjects(response);
          setSearchResults(response);
          setLoading(false);
        }
      });
    } else {
      rijksService.getAll().then((response) => {
        if (response) {
          setArtObjects(response);
          setSearchResults(response);
          setLoading(false);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    if (e.target.value !== "") {
      const filteredArtObjects: artObjInt[] = artObjects.filter(
        (artObj: artObjInt) => {
          const data = `${artObj.title} ${artObj.principalOrFirstMaker}`;
          return data.toLowerCase().includes(searchTerm.toLowerCase());
        }
      );
      setSearchResults(filteredArtObjects);
    } else {
      setSearchResults(artObjects);
    }
  };

  const indOfLastArtObj: number = currentPage * artObjPerPage;
  const indOfFirstArtObj: number = indOfLastArtObj - artObjPerPage;
  const artObjsToDisplay = searchResults.slice(
    indOfFirstArtObj,
    indOfLastArtObj
  );

  const handleDeleteClick = (artObject: artObjInt) => {
    if (artObjects) {
      userService.deleteFromFavs(artObject.objectNumber).then(() => {
        setSearchResults(
          searchResults.filter(
            (artObj) => artObj.objectNumber !== artObject.objectNumber
          )
        );
      });
    }
  };

  return (
    <div style={{ zIndex: -10 }}>
      <Input
        placeholder="Search by title or maker"
        style={{
          color: "rgb(35, 32, 96)",
          border: "1px solid rgb(35, 32, 96)",
          width: "77%",
          position: "fixed",
          left: 210,
          top: 70,
          zIndex: 5,
        }}
        prefix={<SearchOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Here you will be able to search any art object of the museum by typing the title or the name of the maker">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
        value={searchTerm}
        onChange={searchHandler}
      />
      {!loading ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {artObjsToDisplay.map((artObj: artObjInt): JSX.Element => {
            return (
              <div
                key={artObj.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Link to={`/details/${artObj.objectNumber}`}>
                  <Card
                    hoverable
                    style={{ width: 240, height: 360, margin: 10 }}
                    cover={
                      <img
                        alt={artObj.title}
                        src={artObj.webImage.url}
                        style={{ height: 250, objectFit: "cover" }}
                      />
                    }
                  >
                    <Meta
                      title={artObj.title}
                      description={`by: ${artObj.principalOrFirstMaker}`}
                    />
                  </Card>
                </Link>
                {isFavourites ? (
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      handleDeleteClick(artObj);
                    }}
                  >
                    Delete from favourites
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <GallerySkeleton />
      )}
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        total={Math.ceil(searchResults.length / artObjPerPage) * 10}
        style={{ marginLeft: "35%" }}
        onChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default Gallery;
