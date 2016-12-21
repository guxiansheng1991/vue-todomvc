/**
 * Created by shen on 2016/12/6.
 *公共方法库
 */
//将数据存储到localstorage中
function saveTodosTolocal(todos){
    window.localStorage.setItem('todos',JSON.stringify(todos));
}

//将数据从localstorage中取出
function getTodosFromLocal(){
    if(!window.localStorage){
        alert('不支持localStorage!!!请更换高版本浏览器查看本网页');
    }
    if(window.localStorage.getItem('todos')==null){  //新建todos
    	let tem=[];
		window.localStorage.setItem('todos',JSON.stringify(tem));
        return [];
    }else{   //返回得到的todos
    	return JSON.parse(window.localStorage.getItem('todos'));
    }
}

//导出一个对象
module.exports={
    saveTodosTolocal:saveTodosTolocal,
    getTodosFromLocal:getTodosFromLocal
}
