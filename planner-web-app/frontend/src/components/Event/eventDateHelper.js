

export function changeUTCLOCAL(date){
    var tryDate = new Date(date);
    var dateString = tryDate.toLocaleDateString();
    var timeString = tryDate.toLocaleTimeString('it-IT');
    var splitStart = dateString.split("/")
    if(splitStart[1].length === 1 && splitStart[0].length === 1){
        var final = splitStart[2]+'-'+'0'+splitStart[0]+'-'+'0'+splitStart[1]+'T'+timeString.substring(0,5);
    }
    else if(splitStart[0].length === 1){
        var final = splitStart[2]+'-'+'0'+splitStart[0]+'-'+splitStart[1]+'T'+timeString.substring(0,5);
    }
    else if(splitStart[1].length === 1){
        var final = splitStart[2]+'-'+splitStart[0]+'-'+'0'+splitStart[1]+'T'+timeString.substring(0,5);
    }
    else{
        var final = splitStart[2]+'-'+splitStart[0]+'-'+splitStart[1]+'T'+timeString.substring(0,5);
    }
    console.log(final);
    return final;
}

export default changeUTCLOCAL