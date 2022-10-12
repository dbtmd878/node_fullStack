import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/postCard";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  return (
    <AppLayout post={singlePost}>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta
          name="og:title"
          content={`${singlePost.User.nickname}의 게시글`}
        />
        <meta name="og:description" content={singlePost.content} />

        <meta
          name="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : "http://localhost:3000/favicon.ico"
          }
        />
        <link rel="shrtcut icon" href="/favicon.ico" />
        <meta name="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, res }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.cookie = "";
      if (cookie) {
        axios.defaults.headers.cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POST_REQUEST,
        data: query.id,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Post;
