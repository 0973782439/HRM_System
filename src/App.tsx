import { Route } from "react-router";
import { Routes } from "react-router-dom";
import "./App.css";
import { routersPublic } from "./routers/Router";

function App() {
  return (
    <Routes>
      {routersPublic.map((router, indx) => {
        return (
          <Route
            key={indx}
            path={router.path}
            element={router.element}
            children={router.children?.map((children, ind) => {
              return (
                <Route
                  key={ind}
                  path={children.path}
                  element={children.element}
                />
              );
            })}
          ></Route>
        );
      })}
    </Routes>
  );
}

export default App;
