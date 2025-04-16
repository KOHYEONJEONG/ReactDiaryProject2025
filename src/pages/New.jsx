import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App.jsx";

const New = () => {
	// const [params, setParams] = useSearchParams();
	// console.log(params.get("value")); //http://localhost:5173/new?value=1

	const nav = useNavigate();

	const { onCreate } = useContext(DiaryDispatchContext);

	const onSubmit = (input) => {
		console.log("새 일기 date = ", input.createdDate.getTime());
		//새일기 등록
		onCreate(
			input.createdDate.getTime(), //등록시에는 타임스탬프 형태로 변경,
			input.emotionId,
			input.content
		);

		//Home 페이지로 이동 - / , 뒤로가기 방지 - replace: true
		nav("/", { replace: true });
	};

	return (
		<div>
			<Header
				title={"새 일기 쓰기"}
				// nav(-1)은 뒤로가기
				leftChild={
					<Button
						text={"< 뒤로 가기"}
						onClick={() => {
							nav(-1);
						}}
					/>
				}
			/>
			<Editor onSubmit={onSubmit} />
		</div>
	);
};
export default New;
