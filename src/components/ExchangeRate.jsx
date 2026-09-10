import { useFetch } from '../hooks/useFetch';
import { fetchUsdKrw } from '../api/exchange'

// function ExchangeRate() {
//   const [rate, setRate] = useState(null); // null은 나중에 바꿔끼울 자리의 값없음 의미
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // reloadKey - useEffect() 의 결과를 담을 변수의 상태를 만들어주고 
//   const [reloadKey, setReloadKey] = useState(0);
  

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     // fetch는 data를 API를 호출해서 가져오는 JS의 비동기 함수
//     fetch("https://open.er-api.com/v6/latㅇㅇㅇest/USD")
//       .then((res) => {
//         if (!res.ok) throw new Error("응답 오류 " + res.status);
//         return res.json();
//       })
//       .then((data) => setRate(data.rates.KRW))
//       .catch((e) => {setError(e.message); console.log('😒 실패 상태', e)}) // 예외(에러의 경우 처리 동작)  1. 에러를 콘솔에 찍습니다.
//       .finally(() => {setLoading(false); console.log('🙌 성공했든 실패했든 언제나 동작')}); // 성공하든 실패하든 이거는 하고 끝내세요 2. finally는 어떻게 동작하는데 콘솔에 찍고, 정상/실패의 경우를 모두 확인해 보세요.
//   }, [reloadKey]); // reloadKey - 해당 변수로 결과를 넘기세요. api를 3번 이상 호출해도 답이 없으면 예외처리 

//   if (loading) return <p className="muted">환율을 불러오는 중...</p>;
//   if (error) return (<>
//                     <p className="muted">환율을 못 불러왔습니다</p>
//                     {/* reloadKey - useEffect의 결과를 넘깁니다. */}
//                     <button onClick={() => setReloadKey((key) => key + 1)}>다시 시도 {reloadKey} </button>
//                     </>);
//   return <p>1달러 = {Math.round(rate).toLocaleString("ko-KR")}원</p>;
// }

function ExchangeRate() {
  const { data: rate, loading, error, reload } = useFetch(fetchUsdKrw); // 함수 안에서 불러서 사용하는 함수를 CallBack

  if (loading) {
    return (
      <div className="exchange-card exchange-card-loading" aria-busy="true">
        <span className="exchange-label">USD / KRW</span>
        <p className="exchange-loading-text">환율을 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="exchange-card exchange-card-error" role="alert">
        <div>
          <span className="exchange-label">USD / KRW</span>
          <p className="exchange-error-text">환율을 불러오지 못했어요.</p>
        </div>
        <button className="exchange-retry" onClick={reload}>다시 시도</button>
      </div>
    )
  }

  return (
    <div className="exchange-card">
      <div className="exchange-card-header">
        <span className="exchange-label">USD / KRW</span>
        <span className="exchange-status">기준 환율</span>
      </div>
      <div className="exchange-value-row">
        <strong className="exchange-value">{Math.round(rate).toLocaleString("ko-KR")}</strong>
        <span className="exchange-unit">원</span>
      </div>
      <p className="exchange-caption">1 USD 기준 · 미국 달러</p>
    </div>
  )
}

export default ExchangeRate;