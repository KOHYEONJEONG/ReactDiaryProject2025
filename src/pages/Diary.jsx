import { useParams, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header.jsx";
import Viewer from "../components/Viewer.jsx";
import useDiary from "../hooks/useDiary.jsx";
import { getStringedDate } from "../util/get-stringed-date";
const Diary = () => {
	const params = useParams();
	const nav = useNavigate();
	const curDiaryItem = useDiary(params.id);//커스텀 hook
	
	
	if(!curDiaryItem){
		//(컴포넌트 호출일때는 undefined 상태이며 이후 렌더링 이후면 값이 생긴다.)
		return <div>데이터 로딩중...!</div>
	}


	const {createdDate, emotionId, content} = curDiaryItem;
	const title = getStringedDate(new Date(createdDate));// yyyy-mm-dd

	return (
		<div>
			<Header
				title={`${title} 기록`}
				leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
				rightChild={<Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />}
			></Header>

			{/* 상세화면 */}
			<Viewer emotionId={emotionId} content={content}></Viewer>
		</div>
	);
};

export default Diary;
