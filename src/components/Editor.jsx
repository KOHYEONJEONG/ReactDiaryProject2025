import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constansts";
import { getStringedDate } from "../util/get-stringed-date";
const Editor = ({ onSubmit, initData }) => {
	const nav = useNavigate();

	useEffect(() => {
		if (initData) {
			setInput({
				...initData,
				createdDate: new Date(Number(initData.createdDate)),
			});
		}
	}, [initData]);



	const onChangeInput = (e) => {
		// console.log(e.target.name);
		console.log(e.target.value);

		let name = e.target.name;
		let value = e.target.value;

		if (name === "createdDate") {
			// date 객체를 변환하여 value값 설정
			value = new Date(value);
		}

		setInput({
			...input,
			[name]: value,
		});
	};

	const [input, setInput] = useState({
		//하나의 state에 보관할 수 있음
		createdDate: new Date(),
		emotionId: 3,
		content: "",
	});

	const onSubmitButtonClick = () => {
		//onSubmit은 등록 또는 수정 페이지로 들어온 이벤트핸들러를 통해 기능이 달라지므로 props로 받는다.
		onSubmit(input); //사용자 입력 값 넘겨주기.
	};

	return (
		<div className="Editor">
			{/*네개의 section 태그 (div태그와 이름만 다를뿐 기능은 같다)*/}

			<section className="date_section">
				<h4>오늘의 날짜</h4>
				<input
					type="date"
					name="createdDate"
					value={getStringedDate(input.createdDate)}
					onChange={onChangeInput}
				/>
			</section>

			<section className="emotion_section">
				<h4>오늘의 감정</h4>
				<div className="emotion_list_wrapper">
					{emotionList.map((item) => (
						<EmotionItem
							key={item.emotionId}
							{...item}
							isSelected={item.emotionId === input.emotionId} //현재 클릭한 emotionId와 같으면 true 넘기기(클릭한 현재 위치가 비교값의 의해 변경됨.)
							onClick={() =>
								onChangeInput({
									//화살표 함수를 통해 이벤트 핸들러 강제 실행
									target: {
										//이벤드 객체를 강제로 생성
										name: "emotionId",
										value: item.emotionId,
									},
								})
							}
						/>
					))}
				</div>
			</section>

			<section className="content_section">
				<h4>오늘의 일기</h4>
				<textarea
					name="content"
					value={input.content}
					onChange={onChangeInput}
					placeholder="오늘은 어땠나요?"
				/>
			</section>

			<section className="button_section">
				<Button text={"취소하기"} onClick={() => nav(-1)} />

				{/* Editor 페이지는 등록 및 수정 화면이기에 props를 통해 button의 이벤트 핸들러의 기능이 달라야 함. */}
				<Button text={"작성완료"} type={"POSITIVE"} onClick={onSubmitButtonClick} />
			</section>
		</div>
	);
};

export default Editor;
