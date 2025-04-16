export const getStringedDate = (targetDate) => {
    // yyyy-mm-dd 표현식
    // 사용위치 : 변경해야 name="createdDate" input 필드에 표시된다.
    // 사용위치 : Header 컴포넌트의 title
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    if (month < 10) {
        month = `0${month}`;
    }

    if (date < 10) {
        date = `0${date}`;
    }

    return `${year}-${month}-${date}`;
};