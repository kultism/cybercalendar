import React, { useState, useCallback } from "react"
import styled from "styled-components"
import * as theme from "../theme"
import { URL } from "./URL"
import moment from "moment"
import def from "../images/maincast-default.jpeg"
import { useSpring, animated } from "react-spring"

const Preview = styled.div`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  width: 100%;
  height: 215px;
  background-image: url(${def});
  background-repeat: no-repeat;
  background-size: cover;
`

const Description = styled.div`
  flex-direction: column;
  min-height: 150px;
  transition: all 0.2s linear;
  min-width: 380px;
  background-color: ${theme.colors.buttonBlue};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 10px;
`

const CardContainer = styled(animated.div)`
  display: flex;
  transition: all 0.2s ease;
  flex-direction: column;
  min-width: 380px;
  background: ${theme.colors.buttonBlue};
  min-height: 375px;
  border-radius: 12px;
  /* box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2); */
  box-shadow: 0 0 5px 0 #000;

  &:hover {
    transform: scale(1.1);
  }
`

const Details = styled(animated.div)`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  min-width: 380px;
  min-height: 375px;
  background: ${theme.colors.buttonBlue};
  opacity: 0;
  border: 1px solid ${theme.colors.lightPink};
`

// discipline: {id: 2, name: "CS:GO"}
// endTime: null
// event: "RIO NA"
// format: "BO3"
// id: 239
// leftTeam: {id: 38, name: "Gen.G"}
// matchUp: null
// rightTeam: {id: 16, name: "Cloud9"}
// startTime: "2020-04-30T23:00:00"

const Game = styled.div`
  color: ${theme.headerColor};
  font: ${theme.headerFonts};
  font-size: 28px;
`

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.lightPink};
`

const Event = styled.div`
  color: ${theme.colors.lightPink};
  font: ${theme.textFonts};
  font-size: 18px;
  display: flex;
  align-items: flex-end;
`

const Teams = styled.div`
  display: flex;
  flex-direction: row;
  width: 375px;
  justify-content: space-around;
`

const TeamName = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  color: ${theme.headerColor};
  font: ${theme.headerFonts};
  font-size: 36px;
  align-items: center;
`

const Vs = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  color: ${theme.headerColor};
  font: ${theme.headerFonts};
  font-size: 24px;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const RowLeft = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-top: 10px;
  margin-right: 25px;
  border-bottom: 1px solid ${theme.colors.lightPink};
`

const HeaderText = styled.div`
  color: ${theme.headerColor};
  font: ${theme.headerFonts};
  font-size: 24px;
`

const PrimaryButton = styled.button`
  display: flex;
  border-radius: 4px;
  transition: 0.3s all;
  cursor: pointer;
  color: white;
  width: 300px;
  font-size: 16px;
  font-weight: 400;
  /* margin: 20px 0; */
  margin-top: -5px;
  -webkit-appearance: none;
  line-height: 1;
  display: inline-block;
  padding: 16px 10px;
  box-sizing: border-box;
  background: ${theme.colors.primary};
  border: 1px solid ${theme.colors.lightBlue};
`

const Last = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const Card = ({
  discipline = "DOTA 2",
  event = "RIO NA",
  format = "BO3",
  leftTeam = "Gen.G",
  rightTeam = "Cloud 9",
  hosts,
  matchUp,
  startTime = "2020-04-30T23:00:00",
}) => {
  const hostsParsed = hosts.map(host => host.name)
  const [showDetails, setShowDetails] = useState(false)
  const animDetails = useSpring({ opacity: showDetails ? 1 : 0 })
  return (
    <CardContainer
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {showDetails ? (
        <Details style={animDetails}>
          <Teams>
            <TeamName>{leftTeam}</TeamName> <Vs>vs</Vs> <TeamName>{rightTeam}</TeamName>
          </Teams>
          <RowLeft>
            <HeaderText>Game: {discipline}</HeaderText>
          </RowLeft>
          <RowLeft>
            <HeaderText>event: {event}</HeaderText>
          </RowLeft>
          <RowLeft>
            <HeaderText>format: {format}</HeaderText>
          </RowLeft>
          <RowLeft>
            <HeaderText>Hosts: {hostsParsed.join('&')}</HeaderText>
          </RowLeft>
          <Last>
            <PrimaryButton>{moment().to(startTime)}</PrimaryButton>
          </Last>
        </Details>
      ) : (
        <React.Fragment>
          <Preview />
          <Description>
            <HeaderRow>
              <Game>{discipline}</Game>
              <Event>{event}</Event>
            </HeaderRow>
            <Teams>
              <TeamName>{leftTeam}</TeamName> <Vs>vs</Vs> <TeamName>{rightTeam}</TeamName>
            </Teams>
            <Row>
              <PrimaryButton>{moment().to(startTime)}</PrimaryButton>
            </Row>
          </Description>
        </React.Fragment>
      )}
    </CardContainer>
  )
}
