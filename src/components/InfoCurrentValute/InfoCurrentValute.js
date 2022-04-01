import './InfoCurrentValute.css'
import getCurrencies from '../../functions/fetch.js'

function InfoValue(props) {
    const diff = Math.round((props.info.value - props.info.previous) * 1000) / 1000
    const valueValute = Math.round((props.info.value/props.info.nominal) * 1000) / 1000

    function getDesiredCurrencies(){
        let mas = Object.assign({}, props.history)
        let code = props.info.code
        if(mas[code]){props.setDesiredValute(code); console.log("end"); return }
        let url = props.info.prevURL
        let promise = getCurrencies(url, mas, false)
        promise.then((data)=>{
            props.setHistory(data[1])
            props.setPrevURL(data[0])
            props.setDesiredValute(code)
        })
    }

    return(
        <div className='infoValue' title={props.info.name} onClick={getDesiredCurrencies}>
            <div className='codeValute'>
                <p>{props.info.code}</p>
                <p className='name'>{props.info.name}</p>
            </div>
            
            <div className='valueValute'>
                <p>{valueValute}</p>
            </div>
            <div className='indexValute'>
                <p>{diff < 0 ? diff : '+'+diff}</p> 
                <p className={`${diff < 0 ? "arrowDown" : "arrowUp"}`}>{`${diff < 0 ? '▼' : '▲'}`}</p>
            </div>
        </div>
  );
}

export default InfoValue;
