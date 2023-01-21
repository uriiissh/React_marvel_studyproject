
import img from "./829.gif"

const Errormessage = () =>{
    return(
        // <img src={process.env.PUBLIC_URL + '/e'} alt=""/>
        <img  alt="" style={{display:'block' , width:'250px' , height: ' 250px' , objectFit:'contain' , margin:'0 auto' }} src={img}/>
    )
}
export default Errormessage;