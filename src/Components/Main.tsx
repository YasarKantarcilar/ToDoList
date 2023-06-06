import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Main() {
  const [todos, settodos] = useState([]);
  const [todoValue, settodoValue] = useState("");

  const handleClick = () => {
    const colRef = collection(db, "todos");

    setDoc(doc(colRef), {
      todo: todoValue,
      uid: auth.currentUser.uid,
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const colRef = collection(db, "todos");
        const stateQuery = query(colRef, where("uid", "==", user.uid));
        const todoList: any[] = [];
        getDocs(stateQuery).then((querySnapshot) => {
          querySnapshot.forEach((doc: any) => {
            todoList.push(doc.data());
          });
          settodos(todoList);
        });
      } else {
        navigate("/Login");
      }
    });
    return unsubscribe();
  }, [auth]);
  const navigate = useNavigate();
  const colRef = collection(db, "users");
  useEffect(() => {}, []);
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Button
        onClick={() => {
          signOut(auth).then(() => {
            navigate("/Login");
          });
        }}
        sx={{
          position: "absolute",
          top: "50px",
          left: "-100px",
          marginTop: "25px",
          width: "200px",
          height: "45px",
          backgroundColor: "#373737",
          "&:hover": {
            backgroundColor: "white",
            color: "#373737",
            border: "2px solid #373737",
          },
        }}
        variant="contained"
      >
        ÇIKIŞ YAP
      </Button>
      <TextField
        sx={{ width: "200px", height: "45px" }}
        id="outlined-basic"
        label="TODO EKLE"
        variant="outlined"
        onChange={(e) => {
          settodoValue(e.target.value);
        }}
      />
      <Button
        onClick={handleClick}
        sx={{
          marginTop: "25px",
          width: "200px",
          height: "45px",
          backgroundColor: "#373737",
          "&:hover": {
            backgroundColor: "white",
            color: "#373737",
            border: "2px solid #373737",
          },
        }}
        variant="contained"
      >
        EKLE
      </Button>
      <Box
        sx={{
          marginTop: "50px",
          width: "50vw",
          height: "80vh",
          gap: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {todos.map((todo, idx) => (
          <Box
            key={idx}
            sx={{
              width: "100%",
              border: "2px solid black",
              borderRadius: "15",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ width: "70%" }}>{todo.todo}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Main;
