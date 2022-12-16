import './App.css';
import axios from "axios";
import {useState} from "react";
import {API_URL} from "./shared/const";

function App() {

    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [image, setImage] = useState("")
    const obj = {
        container:'form-container'
    }
    const getData = async () => {

       await axios.post(API_URL+"generate_classic_qr_code", {
            name,
           url
        },{maxContentLength:Infinity,maxBodyLength:Infinity,responseType:"blob",} ).then(
            (response) => {
                let image = URL.createObjectURL(response.data);
               setImage(image)
            }
        )

    }

    return (
        <div className="App">
            <div className={obj.container}>
                <label className="label">
                    Name:
                    <input type={"text"} onChange={(e)=> {
                        setName(e.target.value)
                    }}/>
                </label>
                <label className="label">
                    Url:
                    <input type={"text"}
                           onChange={(e)=> {setUrl(e.target.value)}}
                           onKeyPress={(e)=>e.key==='Enter'?getData():null}
                    />
                </label>

                <button className="validate-button" onClick={getData}>Créer son QR-CODE</button>
            </div>
           <div className="image">
               <img src={image} alt={"qr-code"}/>
           </div>
        </div>
    );
}

export default App;
