import Room from "../model/room";
export async function  generateUsername(unversityname,n){
    //const room = Room.find({collegename: unversityname});
    //if(!room){
      //  return "";
    //}
    let username = "";
    const size = unversityname.length;
    let itr = "";
    for(let i=0;i<size;i++){
       if(unversityname[i]===' ' && itr !== ""){
           username += itr[0];
           itr = "";
       }
       else{
           itr += unversityname[i].toLowerCase();
       }
    }
    if(itr!==" ") username += itr[0];
    username += "cd" + n;
    return username;
}
//console.log(generateUsername("Graphic Era University",9));