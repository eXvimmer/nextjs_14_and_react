import { useState } from "react";
import MainHeader from "./components/MainHeader";
import Posts from "./components/Posts";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal() {
    setIsModalVisible(true);
  }

  function hideModal() {
    setIsModalVisible(false);
  }

  return (
    <>
      <MainHeader onCreatePost={showModal} />
      <main>
        <Posts showModal={isModalVisible} closeModal={hideModal} />
      </main>
    </>
  );
}

export default App;
