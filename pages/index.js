import Head from "next/head";
import { Fragment, useEffect} from "react";
import { useSelector } from "react-redux";
import TodoIntroduction from "../components/Todo/TodoIntroduction/TodoIntroduction";
import { useRouter } from "next/router";

function IntroductionHomePage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const route = useRouter();
  const { userId } = useSelector((state) =>
    state.auth.accountData ? state.auth.accountData : ""
  );
  useEffect(() => {
    isLoggedIn && route.replace(userId);
  }, [route, isLoggedIn, userId]);
  return (
    <Fragment>
      <Head>
        <title>Shawn T project</title>
        <meta name="Todo List" content="Create todo list" />
      </Head>
      <TodoIntroduction />
    </Fragment>
  );
}

export default IntroductionHomePage;
