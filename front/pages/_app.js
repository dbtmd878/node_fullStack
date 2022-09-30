import React from "react";
import Head from "next/head";
import "antd/dist/antd.css";
import propTypes from "prop-types";
import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>Node Bird</title>
        <meta charSet="utf-8" />
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: propTypes.elementType.isRequired,
};

export default wrapper.withRedux(App)
