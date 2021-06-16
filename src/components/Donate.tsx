import React from "react";
import { Image, Typography, Collapse } from "antd";
import profilePic from "../images/circle-cropped.png";
import meme from "../images/meme.jpg";

const { Title } = Typography;
const { Panel } = Collapse;

function Donate() {
  return (
    <div>
      <Title>Aleix Badia</Title>
      <Title level={2}> Donate a job to this motivated candidate 😄</Title>
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
          src={profilePic}
        />
        <div style={{ width: "50%", marginLeft: "5%" }}>
          <Title level={3}> What does this dude offer besides coding?</Title>
          <Collapse>
            <Panel header="Cooking" key="1">
              <p>
                One of my biggest passions is cooking and having people home
                with whom to enjoy it with a good glass of wine.
              </p>
            </Panel>
            <Panel header="Videogames" key="2">
              <p>
                Since a very young age I have always been playing videogames on
                my free time. I'm currently playing the new TBC expansion of WOW classic.
              </p>
            </Panel>
            <Panel header="Laughter" key="3">
              <Image src={meme} />
            </Panel>
            <Panel header="Adventures" key="4">
              <p>
                I have always been into adventures and adrenaline-rush
                activities. Surf trips with a motorhome, skydiving or just
                riding my motorbike on a sunny Sunday are some of my favourite
                ones.
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Donate;
