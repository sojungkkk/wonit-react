// src/hooks/useFetch.js
import { useState, useEffect } from "react";

// 외부에서 데이터를 불러올때 성공,실패,로딩중 화면을 만드는 작업을 하기 위함
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;               // 정리용 flag
    setLoading(true);
    setError(null);

    // asynchros: 비동기로 특정함수를 실행하기 위한 키워드
    async function load() {
      try {
        const result = await fetcher();
        if (alive) setData(result);
      } catch (e) {
        if (alive) setError(e.message);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();

    return () => { alive = false; };
  }, [reloadKey, ...deps]); // dependency: 해당 state가 변경될 때마다 새로 컴포넌트가 엘리먼트를 찍어내도록 걸어둔 

  const reload = () => setReloadKey((k) => k + 1);
  return { data, loading, error, reload };
}