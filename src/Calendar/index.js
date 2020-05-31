import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import * as theme from "../theme"
import { Row, Col } from "antd"
import { useForm } from "react-hook-form"
import axios from "axios"

import { URL } from "../components/URL"
import { Card } from "../components/Card"

const Main = styled.div`
  background-color: ${theme.colors.back};
  font-family: ${theme.textFonts};
  min-height: 100vh;
  padding: 80px;
`

const Header = styled.div`
  font-family: ${theme.headerFonts};
  color: #f0f3f6;
  font-weight: 700;
  font-size: 72px;
  line-height: 1.3;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1920;
  padding-left: 40px;
  padding-right: 40px;
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  margin-top: 100px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 380px);
  grid-gap: 2rem;
`

const Option = styled.option`
  white-space: pre;
  min-height: 1.2em;
  padding: 0px 2px 1px;
`

const Select = styled.select`
  width: 160px;
  border-radius: 4px;
  padding: 6px 10px;
  margin-bottom: 10px;
  font-size: 18px;
  margin-right: 20px;
`

const Line = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  font-family: ${theme.headerFonts};
  font-size: 24px;
  color: ${theme.headerColor};
  margin-bottom: 5px;
`

const Rowee = styled.div`
  display: flex;
  flex-direction: row;
`

const Inp = styled.input`
  display: flex;
  border-radius: 4px;
  transition: 0.3s all;
  cursor: pointer;
  color: white;
  width: 200px;
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
  height: 50px;
  align-self: center;
`

const Months = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px;
`

// const Month = styled.div`
//   display: flex;
//   font-size: 24px;
//   font-family: ${theme.headerFonts};
//   color: ${theme.headerColor};
// `

const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")


export const Calendar = (props) => {
  const [matches, setMatches] = useState([])
  const [hosts, setHosts] = useState([])
  const [disciplines, setDisciplines] = useState([])
  const [teams, setTeams] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get("filter/hosts").then((response) => setHosts(["", ...response.data]))
    axios.get("matches/filter?take=25&page=1").then((response) => {
      setMatches(response.data)
    })
    axios.get("filter/disciplines").then((response) => setDisciplines(["", ...response.data]))
    axios.get("filter/teams").then((response) => setTeams(["", ...response.data]))
    axios.get("filter/events").then((response) => setEvents(["", ...response.data]))
  }, [])

  const filterBy = useCallback((data) => {
    console.log(data)
    axios.post("matches/filter?take=25&page=1", { params: data }).then((response)=>{
      console.log(999, response)
    })
  }, [])

  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => console.log(data)
  console.log(errors)
  return (
    <Main>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Header>Maincast calendar</Header>
          <Months>
            {months.map((month, idx) => {
              if (idx === 3) {
                return <URL active={true} text={month}></URL>
              }
            return <URL text={month}></URL>
            })}
          </Months>
          <form onSubmit={handleSubmit(filterBy)}>
            <Rowee>
              <Line>
                <Label>Hosts:</Label>
                <Select name="hostId" ref={register({ required: false })}>
                  {hosts.map((host) => {
                    return <Option value={host.id}>{host.name}</Option>
                  })}
                </Select>
              </Line>
              <Line>
                <Label>Disciplines:</Label>
                <Select name="disciplineId" ref={register}>
                  {disciplines.map((discipline) => {
                    return <Option value={discipline.id}>{discipline.name}</Option>
                  })}
                </Select>
              </Line>
              <Line>
                <Label>Teams:</Label>
                <Select name="teamIds" ref={register}>
                  {teams.map((team) => {
                    return <Option value={team.id}>{team.name}</Option>
                  })}
                </Select>
              </Line>
              <Line>
                <Label>Events:</Label>
                <Select name="eventIds" ref={register}>
                  {events.map((event) => {
                    return <Option value={event.id}>{event.name}</Option>
                  })}
                </Select>
              </Line>

              <Inp type="submit" />
            </Rowee>
          </form>
          <Grid>
            {matches.map((match) => {
              return (
                <Card
                  hosts={match.hosts}
                  key={match.id}
                  discipline={match.discipline.name}
                  event={match.event}
                  format={match.format}
                  leftTeam={match.leftTeam.name}
                  rightTeam={match.rightTeam.name}
                  startTime={match.startTime}
                />
              )
            })}
          </Grid>
        </Col>
      </Row>
    </Main>
  )
}

// <Main>
//   <Content>
//     <Sidebar>
//       <URL url={""} text={"Home"} />
//     </Sidebar>
//     <Grid>
//       {" "}
//       <Header>Maincast Calendar</Header>
//     </Grid>
//   </Content>
// </Main>
