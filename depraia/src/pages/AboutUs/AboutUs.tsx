import "./index.scss";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavBar from "../../components/NavBar/NavBar";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      }
    }
  })
);

export default function AboutUs() {
    const classes = useStyles();

    return(
        <>
        <NavBar />
        <div className="container">
            <img src="../../assets/empresarios.png"/>
            <h2>Sobre Nos</h2>
            <p>Mussum Ipsum, cacilds vidis litro abertis. Mé faiz elementum girarzis, nisi eros vermeio. Manduma pindureta quium dia nois paga. Paisis, filhis, espiritis santis. Pra lá , depois divoltis porris, paradis.

Suco de cevadiss deixa as pessoas mais interessantis. A ordem dos tratores não altera o pão duris. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Quem num gosta di mim que vai caçá sua turmis!

Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Cevadis im ampola pa arma uma pindureta. Leite de capivaris, leite de mula manquis sem cabeça. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        </div>
        </>
    )
}