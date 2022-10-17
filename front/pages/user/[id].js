import { Avatar, Card } from "antd";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/postCard";
import { LOAD_USER_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadUserPostsLoading } = useSelector(
    (state) => state.post
  );
  const { userInfo } = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadUserPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId:
              mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id]);
  return (
    <AppLayout>
      <Head>
        {userInfo ? (
          <>
            <title>{userInfo.nickname}님의 글</title>
            <meta name="description" content={userInfo.nickname} />
            <meta name="og:title" content={`${userInfo.nickname}의 게시글`} />
            <meta name="og:description" content={userInfo.nick} />
            <meta name="og:image" content="http://localhost:3000/favicon.ico" />
            <link rel="shrtcut icon" href="/favicon.ico" />
            <meta
              name="og:url"
              content={`https://nodebird.com/user/${id}`}
            />{" "}
          </>
        ) : (
          <>
            <title>Node Bird</title>
            <meta charSet="utf-8" />
          </>
        )}
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
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map((v) => (
        <PostCard key={v.id} post={v} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.cookie = "";
      if (cookie) {
        axios.defaults.headers.cookie = cookie;
      }
      store.dispatch({
        type: LOAD_USER_REQUEST,
        data: params.id,
      });
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: params.id,
      });

      store.dispatch(END);

      await store.sagaTask.toPromise();
    }
);

export default User;
