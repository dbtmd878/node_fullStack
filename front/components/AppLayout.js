import React, { useCallback } from "react";
import propTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import styled from "styled-components/dist/styled-components";

import UserProfile from "./userProfile";
import LoginForm from "./loginForm";
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components/dist/styled-components";
import useInput from "../hooks/useInput";
import Router from "next/router";

const Global = createGlobalStyle`
  .ant-row{
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .ant-col:first-child{
    padding-left: 0 ip !important;
  }
  .ant-col:last-child{
    padding-right: 0 !important;
  }
`;

const InputSearchStyled = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput();
  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="nodebird">
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
        <Menu.Item key="button">
          <InputSearchStyled
            placeholder="Basic usage"
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://9uk-e.tistory.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            뒤죽박죽 공책
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;
