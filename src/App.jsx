import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const dataStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(dataStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    document.title = "grocery budget tracker";
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    if (!name) {
      // alert
      showAlert(true, "empty text", "danger");
    } else if (isEditing && name) {
      // edit
      showAlert(true, "edited successfully", "success");
      setList((prev) => {
        let newList = prev.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              title: name,
            };
          } else {
            return item;
          }
        });
        return newList;
      });
      setEditID(null);
      setIsEditing(false);
      setName("");
    } else {
      let newNote = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newNote]);
      setName("");
    }
  };

  const showAlert = (status = false, msg = "", type = "") => {
    setAlert({
      msg,
      status,
      type,
    });
  };

  const removeItem = (id) => {
    let newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "item deleted", "danger");
  };

  const clearList = () => {
    setList([]);
    showAlert(true, "empty list", "danger");
  };

  const editItem = (id) => {
    setIsEditing(true);
    setEditID(id);
    let editingItem = list.find((item) => item.id === id);
    setName(editingItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <main className="flex justify-center items-center mt-32">
      <section className="p-6 w-[90vw] space-y-4">
        {alert && <Alert {...alert} showAlert={showAlert} list={list} />}
        <header className="capitalize text-lg text-center font-mono font-bold leading-relaxed tracking-wide">
          <h1 className="py-4">grocery budget tracker</h1>
        </header>
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-2 text-lg bg-green-50"
            placeholder="eg. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="text-lg p-2 bg-green-400 font-mono font-semibold text-white rounded-lg"
          >
            {isEditing ? `edit` : "submit"}
          </button>
        </form>
        {list.length > 0 && (
          <div className="flex flex-col space-y-5">
            <List list={list} removeItem={removeItem} editItem={editItem} />
            <button
              className="text-center font-mono font-semibold text-white bg-red-400 w-full p-3"
              onClick={() => clearList()}
            >
              clear item
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
