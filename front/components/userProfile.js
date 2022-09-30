import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import styled from "styled-components/dist/styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const CardStyle = styled(Card)`
  margin: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();

  const { me, logOutLoading } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <CardStyle
      style={{ width: 300 }}
      actions={[
        <div key="">
          게시글
          <br />
          {me.Posts.length}
        </div>,
        <div key="">
          팔로우
          <br />
          {me.Followings.length}
        </div>,
        <div key="">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
        description="상태 메세지"
      />
      <Button onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </CardStyle>
  );
};

export default UserProfile;
