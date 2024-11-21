// const isVerified = true;

// if(isVerified == true ){
//     console.log("user is verified");
// }else{
//     console.log("user is not verified");
    
// }


function getTimeString(time){
    const hour = parseInt(time/ 3600);
    let  remainingSecond= parseInt(time % 3600);
    const minutes = parseInt(remainingSecond / 60);
    remainingSecond = parseInt(remainingSecond % 60);
    return `${hour} hour ${minutes} minutes ${remainingSecond} ago`
}


console.log(getTimeString(7260004));
