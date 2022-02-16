import { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  fetchData,
  incrementId,
  decrementId,
  enterId,
  clearData,
} from "./features/dataSlice";

//Mapping state values to React props for ConnectAPI
const mapStateToProps = (state) => ({
  objectId: state.data.objectId,
});

function App() {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  //Re-rendering with useEffect after each change
  useEffect(() => {
    dispatch(fetchData());
  }, [data.objectId, dispatch]);

  //Renders the image from the API fetch
  const artData = () => {
    if (data.apiData) {
      return (
        <img
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "scale-down",
          }}
          src={data.apiData.primaryImage}
          alt={data.apiData.title}
        />
      );
    } else {
      return <h1>Image Not Found</h1>;
    }
  };

  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            dispatch(fetchData());
          }}
        >
          Trigger Thunk
        </button>
        <button
          onClick={() => {
            dispatch(clearData());
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            dispatch(incrementId());
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            dispatch(decrementId());
          }}
        >
          Back
        </button>
      </div>
      <input
        type="number"
        value={data.objectId}
        onChange={(e) => {
          dispatch(enterId(e.target.value));
        }}
      />
      <div>{data.apiData.title}</div>
      <div>Date: {data.apiData.objectDate}</div>
      <div>{data.apiData.creditLine}</div>
      <div>{data.apiData.repository}</div>

      {artData()}
    </div>
  );
}

export default connect(mapStateToProps)(App);
