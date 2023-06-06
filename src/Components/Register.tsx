import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { auth, db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const navigate = useNavigate();
  const colRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        console.log("LOGGED OUT");
      }
    });
    return unsubscribe();
  }, [auth]);

  const handleClick = () => {
    if (password === password2 && mail !== "") {
      createUserWithEmailAndPassword(auth, mail, password)
        .then((res) => {
          setDoc(doc(colRef, res.user.uid), {
            mail: res.user.email,
            uid: res.user.uid,
            userTodos: [],
            createDate: new Date(),
          })
            .then(() => {
              navigate("/");
            })
            .catch((error) => console.error("Error writing document: ", error));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "350px",
          height: "450px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: "2px solid black",
          borderRadius: "20px",
          gap: "50px",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>Giriş Yap</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "35px",
          }}
        >
          <TextField
            sx={{ width: "200px", height: "45px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setmail(e.target.value);
            }}
          />
          <TextField
            sx={{ width: "200px", height: "45px" }}
            id="outlined-basic"
            label="Sifre"
            variant="outlined"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <TextField
            sx={{ width: "200px", height: "45px" }}
            id="outlined-basic"
            label="Sifre Tekrarı"
            variant="outlined"
            onChange={(e) => {
              setpassword2(e.target.value);
            }}
          />
          <Box sx={{ width: "100%" }}>
            <Link
              style={{
                textDecoration: "none",
                color: "orange",
                fontSize: "18px",
                fontWeight: "700",
              }}
              to={"/Login"}
            >
              Giris Yap
            </Link>
          </Box>
          <Button
            onClick={handleClick}
            sx={{
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
            Kayıt Ol
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
