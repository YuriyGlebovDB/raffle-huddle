import { Button, Col, Divider, Input, Row, Space } from "antd";
import styled from "styled-components";
import Avatar from "antd/lib/avatar/avatar";
import { useState } from "react";

const PaddedContent = styled.div`
  padding: 2rem;
  background: #fff;
`;

const RowSpaced = styled(Row)`
  margin-bottom: 1rem;
`;

const AvatarColor = styled(Avatar)`
  background-color: ${(props) => stringToColor(props.username)};
`;

const AvatarActive = styled(AvatarColor)`
  box-shadow: 0px 0px 10px blue;
`;
const AvatarNextWeek = styled(AvatarColor)`
  box-shadow: 0px 0px 10px green;
`;

export function Raffle() {
  const [users, setUsers] = useState([]);
  const [nextWeek, setNextWeek] = useState([]);
  const [user, setUser] = useState("");
  const [active, setActive] = useState(-1);
  const onKeyPressed = (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      setUsers([...users, evt.target.value]);
      setUser("");
    }
  };

  function rafflerizer(ppl, duration, setActive) {
    const durationRand = (Math.random() * duration) / 2 + duration / 2; //random duration between duration and duration/2
    const steps = ppl * getRevolutions() + getRandom(ppl); // amount of ticks we're going to make
    const winner = steps % ppl; //winner index
    const step = 1 / steps; //step for easing function (between 0 and 1)
    for (let pos = 0; pos <= steps; pos++) {
      setTimeout(() => {
        setActive(pos % ppl);
      }, easeOutCubic(step * pos) * durationRand * 1000); //each step of the raffle
    }
    //In the end
    setTimeout(() => {
      setNextWeek([...nextWeek, users[winner]]);
      setUsers(users.filter((_, i) => i !== winner));
      setActive(-1);
    }, durationRand * 1000 + 4000); //Wait 3 seonds for drammatic effect
  }

  const removeUser = (userToRemove) =>
    setUsers(users.filter((user) => user !== userToRemove));

  const onBtnClick = () => rafflerizer(users.length, 10, setActive);
  return (
    <PaddedContent>
      <RowSpaced gutter={[8, 16]}>
        <Col className="gutter-row" span={24}>
          <Input
            value={user}
            placeholder="Add participant"
            onChange={(evt) => setUser(evt.target.value)}
            onKeyPress={onKeyPressed}
          />
        </Col>
      </RowSpaced>
      <RowSpaced gutter={[8, 16]}>
        <Col className="gutter-row" span={24}>
          <Space wrap>
            {users.map((user, i) =>
              i === active ? (
                <AvatarActive size={80} key={user} username={user}>
                  {user}
                </AvatarActive>
              ) : (
                <AvatarColor
                  username={user}
                  size={80}
                  key={user}
                  onClick={() => removeUser(user)}
                >
                  {user}
                </AvatarColor>
              )
            )}
          </Space>
        </Col>
      </RowSpaced>
      <RowSpaced gutter={[8, 16]}>
        <Col className="gutter-row" span={24}>
          <Button type="primary" onClick={onBtnClick}>
            Raffle!
          </Button>
        </Col>
      </RowSpaced>
      {nextWeek.length ? (
        <>
          <Divider orientation="left">Next Week's speakers:</Divider>
          <RowSpaced gutter={[8, 16]}>
            <Col className="gutter-row" span={24}>
              <Space>
                {nextWeek.map((user) => (
                  <AvatarNextWeek username={user} size={80} key={user}>
                    {user}
                  </AvatarNextWeek>
                ))}
              </Space>
            </Col>
          </RowSpaced>
        </>
      ) : null}
    </PaddedContent>
  );
}

function getRevolutions() {
  return 7 + Math.round(Math.random() * 3);
}

function getRandom(ppl) {
  return Math.floor(Math.random() * ppl);
}

function easeOutCubic(x) {
  return x * x * x;
}

function stringToColor(str) {
  var hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (let i = 0; i < 3; i++) {
    var value = (0xff - (hash >> (i * 8))) & 0xff; //Otherwise it's awefully brown
    colour += ("00" + value.toString(16)).substr(-2);
  }
  console.log(colour);
  return colour;
}
