import { Fragment } from "react";
import { Header } from "../Header";
import { Main } from "../Main";
import { Footer } from "../Footer";
import { QuestionContainer } from "../QuestionContainer";

import "./app.scss";

export default function App() {
  return (
    <Fragment>
      <Header />
      <Main>
        <QuestionContainer />
      </Main>
      <Footer />
    </Fragment>
  );
}
