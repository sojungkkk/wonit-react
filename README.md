# Won Banking Mini

## 1. 소개

Won Banking Mini는 여러 계좌의 잔액과 거래내역을 한 화면에서 확인하고, 입금과 이체를 직접 실행해볼 수 있도록 만든 React 기반 미니 뱅킹 서비스입니다. 계좌번호와 금액 숨기기, 거래내역 필터, 현재 시각, 실시간 USD/KRW 환율 확인 기능을 제공합니다.

배포 주소: `배포 후 주소를 입력하세요`

## 2. 화면

현재 저장소에 스크린샷 파일이 없어 아래 경로는 화면 캡처 후 교체할 자리입니다.

![메인 화면](./screenshots/main.png)

![거래내역과 이체 화면](./screenshots/transactions.png)

![환율 화면](./screenshots/exchange-rate.png)

## 3. 실행 방법

```bash
git clone 저장소 주소
cd won-banking-mini
npm install
npm run dev
```

테스트 실행:

```bash
npm test
```

## 4. 폴더 구조

```text
won-banking-mini/
├─ public/                  # 정적 파일
├─ src/
│  ├─ api/                  # 환율 API 호출
│  ├─ assets/               # 애플리케이션 리소스
│  ├─ components/           # 화면을 구성하는 React 컴포넌트와 컴포넌트 테스트
│  ├─ contexts/             # 사용자 및 계좌 Context
│  ├─ data/                 # 목업 계좌·거래 데이터
│  ├─ hooks/                # 재사용 가능한 커스텀 훅
│  ├─ utils/                # 금액·계좌번호 포맷 변환 함수와 테스트
│  ├─ App.jsx               # 전체 화면 구성과 계좌·거래 상태 관리
│  ├─ App.css               # 앱 컴포넌트 스타일
│  ├─ index.css             # 전역 스타일
│  ├─ main.jsx              # React 앱 시작점
│  └─ setupTests.js         # 테스트 환경 설정
├─ index.html               # HTML 진입점
├─ package.json             # 실행 및 테스트 스크립트와 의존성
├─ vite.config.js           # 개발·빌드 설정
└─ eslint.config.js         # ESLint 설정
```

## 5. 사용한 React 개념

### 컴포넌트

`src/components/`의 `AccountCard.jsx`, `Header.jsx`, `TransactionList.jsx`, `TransferForm.jsx`, `ExchangeRate.jsx`처럼 화면을 기능 단위로 나누어 구성했습니다. `App.jsx`가 이 컴포넌트들을 조합해 전체 화면을 만듭니다.

### props

`App.jsx`에서 `AccountCard.jsx`로 `accountNo`, `accountType`, `balance`, `showFullNo`, `hideAmount`를 전달합니다. `TransferForm.jsx`에는 `fromAccount`과 `onTransfer`를 전달해 부모의 계좌 상태를 변경하도록 했습니다.

### state와 useState

`App.jsx`의 `accounts`, `transactions`, `showFullNo`, `hideAmount`와 `TransferForm.jsx`의 입력값은 `useState`로 관리합니다. 입금·이체·금액 숨기기 같은 사용자 동작이 state를 변경하면 화면이 다시 렌더링됩니다.

### useEffect

`Clock.jsx`에서는 `useEffect`와 `setInterval`로 1초마다 현재 시간을 갱신하고, 컴포넌트가 사라질 때 interval을 정리합니다. `hooks/useFetch.js`에서는 데이터 요청, 로딩·오류 상태 처리, 재시도 동작을 `useEffect`로 관리합니다.

### useContext

`contexts/UserContext.jsx`의 `UserProvider`가 사용자 정보를 제공하고 `useUser`가 이를 읽습니다. `StatusBadge.jsx`는 `useUser`로 현재 계좌 상태를 가져와 상태 배지를 표시합니다. `contexts/AccountContext.jsx`에는 계좌 상태를 위한 `AccountProvider`와 `useAccount`가 정의되어 있습니다.

### 커스텀 훅

`hooks/useFetch.js`의 `useFetch`는 비동기 요청의 `data`, `loading`, `error` 상태와 `reload` 함수를 재사용 가능한 형태로 묶습니다. `ExchangeRate.jsx`는 이 훅을 사용해 환율을 불러오고 로딩·오류·성공 화면을 나눠 표시합니다.

## 6. 테스트

```bash
npm test
```

현재 테스트는 다음 동작을 검사합니다.

- `AccountCard.test.jsx`: 계좌번호가 기본 상태에서 마스킹되어 표시되는지 확인합니다.
- `utils/format.test.js`: 금액을 `1,523,000원` 형식으로 변환하는지, 계좌번호 마스킹 함수가 예상 결과를 반환하는지 확인합니다.

## 7. 앞으로 할 것

- 실제 로그인과 사용자별 계좌 데이터를 연결하기
- 계좌와 거래내역을 서버에 저장하고 새로고침 후에도 유지하기
- 입금·이체 거래에 대한 추가 테스트 작성하기
- 환율 API 오류와 네트워크 지연 상황을 더 세밀하게 처리하기
- 월별 지출 통계와 거래내역 검색 기능 추가하기
- 모바일 화면에서의 뱅킹 사용성 개선하기
