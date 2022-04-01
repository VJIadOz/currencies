import './History.css'
import HistoryPoint from '../HistoryPoint/HistoryPoint.js';

function History(props) {
    return(
        <div className={`history ${props.desiredValute ? "historyVisible" : "historyNotVisible"}`}>
          <div className='topField'>
            <div className='arrowLeft' onClick={()=>props.setDesiredValute("")}><p>🠔</p></div>
            <p className='code'>{props.desiredValute}</p>
          </div>
          
          {props.desiredValute &&
            Object.entries(props.history[props.desiredValute]).map((value)=>
              <HistoryPoint value={value}/>
            )
          }
          <div className='buttonDisplayMore' onClick={()=>props.loadMore()}><p>Отобразить ещё</p></div>
        </div>
    );
}

export default History;
