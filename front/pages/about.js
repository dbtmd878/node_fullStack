import { Avatar, Card } from "antd";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../components/AppLayout";
import { LOAD_USER_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              짹짹
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              짹짹
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ req }) => {
      store.dispatch({ type: LOAD_USER_REQUEST, data: 1 });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default About;
