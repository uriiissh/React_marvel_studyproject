



class MarvelService{

    _apiBase = `https://gateway.marvel.com:443/v1/public/`
    _apikey = `apikey=b99a7c1ee45937929f84ef132bc8ec77`;
    _baseOffset = 210;
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}  , status : ${res.status}`);
        }
            return await res.json();

    }
    getAllCharacters = async (offset = this._baseOffset) =>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apikey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) =>{
        const res = await this.getResource(`${this._apiBase}characters/${id}?limit=9&offset=${this._baseOffset}&${this._apikey}`);
        return this._transformCharacter(res.data.results[0]);
    }


    _transformCharacter = (char) =>{
        return {
            id:char.id,
            name: char.name,
            description: char.name,
            thumbnail:char.thumbnail.path + "." + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics:char.comics.items
        }
    }
}

export default MarvelService;