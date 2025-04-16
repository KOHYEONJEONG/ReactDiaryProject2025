import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-image.js"; //이미지를 불러오는 코드를 별도의 모듈로 관리

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
	//감정 이미지 렌더링된 화면 보여주기

	return (
		<div
			onClick={onClick} //props로 넘어온 onClick을 실행하지 않으면 아무런 이벤트로 발생하지 않는다.(확인: 개발자도구> componenst > Editor 클릭 > hooks 확인 > emotionId의 value 값이 변경됨.)
			// 선택한 버튼이면 class 추가하여 식별 ex)EmotionItem_on_1
			className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ""}`}
		>
			<img className="emotion_img" src={getEmotionImage(emotionId)} />
			<div className="emotion_name">{emotionName}</div>
		</div>
	);
};
export default EmotionItem;
