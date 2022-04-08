import { Provider } from "react-redux";
import { useStore } from "../store";
// add bootstrap css

export default function Home({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
