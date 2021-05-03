import "./index.scss";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../../components/NavBar/NavBar";
import { Container} from "@material-ui/core";
import img from "../../assets/empresarios.png";


const useStyles = makeStyles((theme) => ({
  imagem: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    marginTop: "60px",
    backgroundSize: "450px"
  }
}));

export default function AboutUs() {
    const classes = useStyles();

    return(
    <>
        <NavBar />
      
        <Container>
       
            <h2>Sobre Nós</h2>
            <p>Numa época pandêmica, um dos problemas, principalmente no Rio de Janeiro são as praias.
Elas estão sempre cheias, e não há nenhuma fiscalização no entorno disso.
Sabemos que uma das formas de controlar isso é fechando as mesmas, mas como isso não ocorre já tem tempo, a idéia do site é realizar agendamento de lugares nas praias, respeitando o distanciamento social entre esses lugares, de modo a evitar que as pessoas que lá estejam possam se tornar vetores de transmissão do COVID-19

               </p> 
        <div className={classes.imagem}/>
               
               </Container>
               </>    
     

    )
}