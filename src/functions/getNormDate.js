export default function getNormDate(date){
    const normDate = new Date(date)
    let day = normDate.getDate()
    if(day<10) day = '0'+day
    let month = normDate.getMonth()
    if(month<10) month='0'+(month+1)
    let year = normDate.getFullYear()
    return year+'-'+month+'-'+day
  }