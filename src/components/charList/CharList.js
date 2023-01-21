import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import {Component} from "react";
import MarvelService from "../../services/MarvelSrvices";
import Errormessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component  {


   state = {
       charList : [],
       loading: true,
       error:false,
       newItemLoading:false,
       offset:210,
       charEnded:false
   }
   marvelService = new MarvelService();

   componentDidMount() {
       this.marvelService
           .getAllCharacters()
           .then(this.onCharListLoaded)
           .catch(this.onError)
   }

   onCharListLoaded = (newCharList) => {

       let ended = false;
       if (newCharList.length < 9) {
           ended = true;
       }
       this.setState(({offset,charList}) => ({
           charList:[...charList, ...newCharList],
           loading:false,
           newItemLoading:false,
           offset:offset + 9,
           charEnded:ended
       }))
   }
   onError = () =>{
       this.setState({
           error:true,
           loading: false
       })
   }
    onRequest = ( offset) => {
       this.onCharListLoading()
       this.marvelService
           .getAllCharacters(offset)
           .then(this.onCharListLoaded)
           .catch(this.onError)
}
    onCharListLoading = () =>{
       this.setState({
           newItemLoading: true
       })
    }
   renderItems = (arr) =>{
       const items = arr.map((item) =>{
           let imgStyle = {'objectFit' : 'cover'};
           if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
               imgStyle = {'objectFit' : 'unset'};
           }
           return (
               <li className="char__item"
               key={item.id}
               onClick={() => this.props.onCharSelected(item.id)}>
                   <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                   <div className="char__name"> {item.name}</div>

               </li>
           )
       })
       return (
           <ul className="char__grid">
               {items}
           </ul>
       )
   }

    render(){
       const {error,loading,charList,offset,newItemLoading,charEnded} = this.state;
       const items = this.renderItems(charList)
        const errormessage = error ? <Errormessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errormessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={ ( ) => this.onRequest(offset)}
                    style = {{'display': charEnded ? 'none' : 'block'}}
                >
                    <div className="inner" >load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;