import React, { Fragment, useState, useEffect } from "react";
import rijksService from "../services/rijks-service";
import { Button, Card, Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";

const R = require("ramda");
const { Meta } = Card;
const style = { background: "#0092ff", padding: "8px 0" };

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
  const [artObjects, setArtObjects] = useState<[]>([]);

  useEffect(() => {
    rijksService.getAll().then((response) => {
      if (response) setArtObjects(response.artObjects);
    });
  });

  return (
    <Fragment>
      {R.splitEvery(
        4,
        artObjects.map((artObj: artObjInt): JSX.Element => {
          return (
            <Link to={`/details/${artObj.objectNumber}`}>
              <Card
                hoverable
                style={{ width: 240, margin: 10 }}
                cover={<img alt={artObj.title} src={artObj.webImage.url} />}
              >
                <Meta title={artObj.title} description={artObj.longTitle} />
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
      })}
    </Fragment>
  );
}

export default Home;
