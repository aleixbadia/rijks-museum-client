import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rijksService from "../services/rijks-service";
import { Card, Row, Col, Input, Tooltip } from "antd";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";

const R = require("ramda");
const { Meta } = Card;

interface artObjInt {
  links: {
    self: string;
    web: string;
  };
  id: string;
  objectNumber: string;
  title: string;
  hasImage: boolean;
  principalOrFirstMaker: string;
  longTitle: string;
  showImage: boolean;
  permitDownload: boolean;
  webImage: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  headerImage: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  productionPlaces: string[];
}

function Home(): JSX.Element {
  const [artObjects, setArtObjects] = useState<artObjInt[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<artObjInt[]>([]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

  useEffect(() => {
    rijksService.getAll().then((response) => {
      if (response) setArtObjects(response.artObjects);
    });
  });

  return (
    <div style={{ zIndex: -10 }}>
      <Input
        placeholder="Search by title or maker"
        style={{
          color: "rgb(35, 32, 96)",
          border: "1px solid rgb(35, 32, 96)",
          width: "50%",
          position: "fixed",
          left: "20%",
          top: 70,
          zIndex: 5
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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {searchResults.map((artObj: artObjInt): JSX.Element => {
          return (
            <Link to={`/details/${artObj.objectNumber}`}>
              <Card
                hoverable
                style={{ width: 240, margin: 10 }}
                cover={<img alt={artObj.title} src={artObj.webImage.url} />}
              >
                <Meta
                  title={artObj.title}
                  description={`by: ${artObj.principalOrFirstMaker}`}
                />
              </Card>
            </Link>
          );
        })}
      </div>
      {/* {R.splitEvery(
        4,
        searchResults.map((artObj: artObjInt): JSX.Element => {
          return (
            <Link to={`/details/${artObj.objectNumber}`}>
              <Card
                hoverable
                style={{ width: 240, margin: 10 }}
                cover={<img alt={artObj.title} src={artObj.webImage.url} />}
              >
                <Meta title={artObj.title} description={`by: ${artObj.principalOrFirstMaker}`} />
              </Card>
            </Link>
          );
        })
      ).map((row: artObjInt[]): JSX.Element => {
        return (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {row.map((artObjCard): JSX.Element => {
              return (
                <Col className="gutter-row" span={6}>
                  {artObjCard}
                </Col>
              );
            })}
          </Row>
        );
      })} */}
    </div>
  );
}

export default Home;
