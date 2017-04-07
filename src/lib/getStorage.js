import AV from './leancloud'

export default function(){
    let query = new AV.Query('Resume');
    return query.find().then((data)=>{ 
        data = data[0];
        if (data){
            let content = JSON.parse(data.attributes.resume);      
            let objId = data.id;
            return {content,objId};
        } else {
            reject();
        }
    },(err)=>{
        console.log('something wrong in reading:',err);
    })
}