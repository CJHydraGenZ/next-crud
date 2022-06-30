import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "firebaseConfig";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Home = () => {
  const databaseRef = collection(database, "CRUD Data");
  const router = useRouter();
  const [ID, setID] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) getData();
    if (!token) router.push("/register");
  }, []);

  const addData = async () => {
    try {
      await addDoc(databaseRef, {
        name,
        age: Number(age),
      });
      alert("Data Sent");
      getData();
      setName("");
      setAge("");
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    const response = await getDocs(databaseRef);
    setData(
      await response.docs.map((data) => {
        return { ...data.data(), id: data.id };
      })
    );
  };

  const getID = async (id, name, age) => {
    setID(id);
    setName(name);
    setAge(age);
    setIsUpdate(true);
  };
  const updateFields = async () => {
    try {
      // setIsUpdate(true);
      let fieldEdit = await doc(database, "CRUD Data", ID);
      await updateDoc(fieldEdit, {
        name: name,
        age: Number(age),
      });
      await alert("Data Update");
      getData();
      setName("");
      setAge("");
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDocument = async (id) => {
    try {
      let fieldEdit = await doc(database, "CRUD Data", id);
      await deleteDoc(fieldEdit);
      await alert("Data Delete");
      getData();
    } catch (error) {
      console.log(error);
      alert("Connot Delete that field");
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("Token");
    router.push("/register");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button onClick={logOut}>Log Out</button>
      <h1>Home</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
        value={age}
      />
      {isUpdate ? (
        <button
          className="flex justify-center bg-blue-500 px-5 py-2 rounded-md text-white"
          onClick={updateFields}
        >
          UPDATE
        </button>
      ) : (
        <button
          className="flex justify-center bg-blue-500 px-5 py-2 rounded-md text-white"
          onClick={addData}
        >
          ADD
        </button>
      )}

      <div>
        {data.map((d) => {
          return (
            <div className="flex items-center gap-6 p-2" key={d.id}>
              <h1 className="text-black font-semibold text-lg">
                Name: {d.name}
              </h1>
              <h1 className="text-black font-semibold text-lg">Age: {d.age}</h1>
              <button
                className="flex justify-center bg-green-400 px-5 py-2 rounded-md text-white"
                onClick={() => getID(d.id, d.name, d.age)}
              >
                Update
              </button>
              <button
                className="flex justify-center bg-red-400 px-5 py-2 rounded-md text-white"
                onClick={() => deleteDocument(d.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
