import "./App.css";
import "./index.css";
import React, { useReducer, useRef, createContext } from "react";
import { Routes, Route } from "react-router-dom"; //Link 컴포넌트 = a태그
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";
import Notfound from "./pages/Notfound";

const mockData = [
	//임시 데이터
	{
		id: 1,
		createdDate: new Date("2025-03-31").getTime(),
		emotionId: 1,
		content: "1번 일기",
	},
	{
		id: 2,
		createdDate: new Date("2025-03-30").getTime(),
		emotionId: 2,
		content: "2번 일기",
	},
	{
		id: 3,
		createdDate: new Date("2025-01-28").getTime(),
		emotionId: 3,
		content: "3번 일기",
	},
];

function reducer(state, action) {
	switch (
		action.type //명심! type
	) {
		case "CREATE":
			return [action.data, ...state];
		case "UPDATE":
			// map : 배열 안의 각 원소를 변환할 때 사용되며, 이 과정에서 새로운 배열 생성
			//혹시 모를 상황을 대비해 String으로 형변환
			return state.map((item) =>
				String(item.id) === String(action.data.id)
				? action.data
				: item
			);
		case "DELETE":
			//filter : 조건에 만족하면 새로운 배열 생성
			//혹시 모를 상황을 대비해 String으로 형변환
			return state.filter((item) => String(item.id) !== String(action.data.id));
		default:
			return state;
	}
}

//일기 데이터 공급할 context
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
	const [data, dispatch] = useReducer(reducer, mockData); //네트워크 탭 > App 컴포넌트 클릭 > Reducer 에서 확인 가능.
	const idRef = useRef(3);

	const onCreate = (createdDate, emotionId, content) => {
		//새로운 일기를 추가하는 기능.
		dispatch({
			type: "CREATE",
			data: {
				id: idRef.current++,
				createdDate,
				emotionId,
				content,
			},
		});
	};

	const onUpdate = (id, createdDate, emotionId, content) => {
		console.log(id, createdDate, emotionId, content)
		dispatch({
			type: "UPDATE",
			data: {
				id: id,
				createdDate,
				emotionId,
				content,
			},
		});
	};

	const onDelete = (id) => {
		dispatch({
			type: "DELETE",
			data: {
				id: id,
			},
		});
	};

	return (
		<>
			{/* 전역으로 보일게 아니면 Routes 컴포넌트 외부에 배치는 적절하지 않다. */}
			{/*  Routes 컴포넌트 안에는 Route 컴포넌트만 적을 수 있다.
			path가 들어오면 아래 적힌
			Route컴포넌트를 위에서부터 아래로 찾는다. */}

			{/*⏬ 개발자도구 > Components 탭에서 확인 가능*/}
			<DiaryStateContext.Provider value={data}>
				<DiaryDispatchContext.Provider
					value={{
						onCreate,
						onUpdate,
						onDelete,
					}}
				>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/new" element={<New />} />
						{/*⏬URL Parameter를 사용하기 위해 ':id' 지정*/}
						<Route path="/diary/:id" element={<Diary />} />
						<Route path="/edit/:id" element={<Edit />} />
						{/* ⏬와일드카드 : 위에 경로와 일치하지 않으면 Notfound 컴포넌트를 페이지 렌더링하게된다. */}
						<Route path="*" element={<Notfound />} />
					</Routes>
				</DiaryDispatchContext.Provider>
			</DiaryStateContext.Provider>
		</>
	);
}

export default App;
