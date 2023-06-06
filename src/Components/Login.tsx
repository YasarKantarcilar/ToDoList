import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    //
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //USERIN GIRIŞ YAPIP YAPMADIĞINI KONTROL EDIYORUZ, EĞER GİRİŞ YAPİLİ İSE ANA MENÜYE YÖNLENDİRİYORUZ, EĞER GİRİŞ YAPİLİ DEĞİL İSE LOGİN İŞLEMİNİ SAĞLİYORUZ
      if (user) {
        navigate("/");
      }
    });
    return unsubscribe();
  }, [auth]);

  const handleClick = () => {
    // SIGNINWITHEMAILANDPASSWORD FONKSIYONU ILE ILK PARAMETREYE FIREBASEDEN CEKTIĞIMIZ auth DEĞERINI DİĞER PARAMETRELERE MAİL VE ŞİFRE DEĞERİNİ GİREREK ÇALİŞTİRİYORUZ
    signInWithEmailAndPassword(auth, mail, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Box sx={{ width: "100%" }}>
            <Link
              style={{
                textDecoration: "none",
                color: "orange",
                fontSize: "18px",
                fontWeight: "700",
              }}
              to={"/Register"}
            >
              Kayıt Ol
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
            GIRIS YAP
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
