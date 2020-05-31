import React from "react"
import styled from "styled-components"
import * as theme from "../theme"

const Link = styled.a`
  font-family: ${theme.headerFonts};
  line-height: 28px;
  font-size: 24px;
  height: 30px;
  text-decoration: none;
  transition: 200ms ease-in-out;
  color: ${(props) => (props.active ? theme.colors.lightPink : theme.headerColor)};
  margin-right: 8px;
  border-bottom: ${(props) => (props.active ? `1px solid ${theme.colors.lightPink}` : 0)};
  &:hover {
    color: #787878;
  }

  &:visited: {
    color: inherit;
  }
`

export const URL = ({ url, text, active }) => {
  return <Link active={active} href={url}>{text}</Link>
}
