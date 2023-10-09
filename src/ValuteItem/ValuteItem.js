
import './ValuteItem.css'


export default function ValuteItem(props){
    return(
        <div className='currency'  onClick={(e)=>props.getHistory(e, false)}>
            <div className='currency-code_wrapper'>
                <span>{props.infoValute.Name}</span>
                <span>{props.infoValute.CharCode}</span>
            </div>
            <div className='currency-value_wrapper'>
                <span>Прошлый курс: {props.infoValute.Previous.toFixed(2)}</span>
                <div>
                    {props.infoValute.Value > props.infoValute.Previous 
                    ? 
                    <span style={{color:"red"}}>▲</span>
                :
                    <span style={{color:"green"}}>▼</span>
                    }
                    <span>{props.infoValute.Value.toFixed(2)}</span>
                </div>
                <span>Номинал: {props.infoValute.Nominal}</span>
            </div>
        </div>
    )
    
}
