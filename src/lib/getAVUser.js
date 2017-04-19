import AV from './leancloud'

export default function(){
    let current = AV.User.current()
    if (current) {
        let {id,attributes:{username}} = current;
        return {id,username}
    } else {
        return false;
    }
}