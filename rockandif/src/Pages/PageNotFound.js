import React from 'react';
import Header from '../Components/Header';
import './PageNotFound.css';

function PageNotFound() {
    return (
        <div>
            <div>
                <Header titre="404 Page not found" />
            </div>
            <div id="contener">
                <div className="instructions">
                <text className="instruction">Page not found</text>
                    {/* <text className="instruction">Tape un lien qui existe, s'il-te-plaît, gros débile</text>
                    <text className="instruction">اكتب في رابط موجود، من فضلك، أيها الأحمق</text>
                    <text className="instruction">Type in a link that exists, please, you big moron</text>
                    <text className="instruction">Tippe bitte einen existierenden Link ein, du großer Dummkopf</text>
                    <text className="instruction">Γράψε έναν σύνδεσμο που υπάρχει, σε παρακαλώ, μεγάλε ηλίθιε.</text>
                    <text className="instruction">Inserisci un link che esiste, per favore, grande idiota.</text>
                    <text className="instruction">Scrie un link care există, te rog, mare dobitocule</text>
                    <text className="instruction">Escribe un enlace que exista, por favor, gran imbécil.</text>
                    <text className="instruction">存在するリンクを入力してください、お願いします、この大バカ者</text>
                    <text className="instruction">Digite um link que existe, por favor, seu grande idiota</text>
                    <text className="instruction">Wpisz link, który istnieje, proszę, ty wielki kretynie.</text> */}
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;