import "./Button.css";

const Button = ({ text, type, onClick }) => {//PROPS는 객체이기에 객체 구조분해로 가져오기.
    //부모로부터 받은 PROPS 를 가지고 다른 버튼을 만들어 보자.
    return (
        <button
            onClick={onClick}
            className={`Button Button_${type}`}
        >
            {text}
        </button>
    );
};

export default Button;