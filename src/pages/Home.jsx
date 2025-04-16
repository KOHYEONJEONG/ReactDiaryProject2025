import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App.jsx"; //export 해줬기에 가능

//필터링

const getMonthlyData = (pivotDate, data) => {
	//이번달에 시작점과 끝이되는 시간을 비교

	//이번달에 시작일
	const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();

	//이번달에 종료일
	const endTime = new Date(
		pivotDate.getFullYear(),
		pivotDate.getMonth() + 1,
		0,
		23,
		59,
		59
	).getTime();

	return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime);
};

//인덱스 페이지
const Home = () => {
	//props: 임시 데이터를 불러와 날짜 필터링 (개발자도구 > Components 탭 > App 컴포넌트 클릭 > hooks에서  data 확인
	const data = useContext(DiaryStateContext);// 일기 데이터 배열
	//날짜를 보관하는 pivotDate (이번달에 해당하는 date에 일기만 보여지게 하기 위함)
	const [pivotDate, setPivotDate] = useState(new Date());

	//한달전으로 표시
	const onIncreaseMonth = () => {
		setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
	};

	//다음달로 표시
	const onDecreaseMonth = () => {
		setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
	};

	const monthlyData = getMonthlyData(pivotDate, data);

	return (
		<div>
			{/*양쪽 버튼을 클릭 시 월단위로 이동*/}
			<Header
				title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`} //템플릿 리터럴로 표시 $
				leftChild={<Button text={"<"} onClick={onDecreaseMonth} />} // 한달전으로
				rightChild={<Button text={">"} onClick={onIncreaseMonth} />} //다음달로
			/>

			<DiaryList data={monthlyData} />
		</div>
	);
};

export default Home;
