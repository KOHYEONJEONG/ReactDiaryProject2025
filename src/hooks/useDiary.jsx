import {useContext, useState, useEffect} from "react";
import {DiaryStateContext} from "../App.jsx";
import {useNavigate} from "react-router-dom";

/*커스텀 hook 
*  -  일기(Item) 반환
* */
const useDiary = (id) => {
    //(컴포넌트 호출일때는 undefined 상태이며 이후 렌더링 이후면 값이 생긴다.)
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();

    useEffect(() => {
        
        const currentDiaryItem = data.find((item)=>
            String(item.id) === String(id)
        );
        
        if(!currentDiaryItem){
            //존재하지 않은 일기장이면
            window.alert("존재하지 않는 일기입니다.");
            nav("/" , {replace:true}); // Home 페이지로 이동 뒤 뒤로가기 클릭 막기
        }
        
        //상태변수에 값 저장하기
        setCurDiaryItem(currentDiaryItem);
        
    }, [id]);//컴포넌트 호출 상태일때는 currentDiaryItem 에 값은 undefined 이다, 렌더링 이후에 값이 할당된다.

    return curDiaryItem; //상태변수
}

export default useDiary;//커스텀 HOOK 내보내기