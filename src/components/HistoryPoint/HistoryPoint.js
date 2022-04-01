import './HistoryPoint.css'

function HistoryPoint(props) {
    let diff = Math.round((props.value[1].current - props.value[1].previous) * 1000) / 1000

    return(
        <div className = 'historyPoint'>
            <div className='dateField'>
                <p>{props.value[0]}</p>
            </div>
            <div className='valueField'>
                <p>{props.value[1].current}</p>
            </div>
            <div className='indexField'>
                <p>{diff < 0 ? diff : '+'+diff}</p>
                <p className={`${diff < 0 ? "arrowDown" : "arrowUp"}`}>{diff < 0 ? '▼' : '▲'}</p>
            </div>
        </div>
  );
}

export default HistoryPoint;
