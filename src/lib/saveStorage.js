import AV from './leancloud'


export default function(data,objId){
    data = JSON.stringify(data);
    var ac1 = new AV.ACL();
    ac1.setReadAccess(AV.User.current(),true);
    ac1.setWriteAccess(AV.User.current(),true);
    if (!objId){      
        let Post = AV.Object.extend('Resume');
        let post = new Post();
        post.setACL(ac1);
        post.set('resume',data);
        
        return post.save();
    } else {
        let post = AV.Object.createWithoutData('Resume',objId);
        post.set('resume',data);
        post.setACL(ac1);
        return post.save();
    }
    
}