import {Message} from 'element-ui'

function checkNull(){
    
    for(var i=0;i<arguments.length;i++){
        if(arguments[i].length<=0){
            Message({
                message:'字段不完整',
                type:'error'
            })
            return false
        }
    }
    return true
}

export {checkNull}