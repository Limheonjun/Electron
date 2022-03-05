# Main Process(Node.js)
## 백앤드 코드가 돌아가는 프로세스
- 

# Renderer Process(Chromium)
## 프론트앤드 코드가 돌아가는 프로세스
- 크롬 디버깅모드에서 디버깅 가능

# electron
- 일렉트론 문서에서 각 api가 어떤 프로세스와 연동될 수 있도록 되어있는지 작성되어있음
- Browser Window, App, WebContents별로 이벤트가 각각 존재
- WebContents는 Browser Window의 프로퍼티

# 앱 이벤트들
- before-quitting이벤트는 앱이 종료되기 전 발생하는 이벤트, e.preventDefault를 사용함으로써 바로 종료되는걸 막을 수 있음
- browser-window-blur : 앱에서 아웃포커싱 될때 발생
- browser-window-focus : 앱에 다시 인포커싱 될때 발생

# 앱의 인스턴스 메소드들
- app.quit : 앱을 종료시키는 메소드
- app.getPath : 사용자의 파일 시스템에 접근하여 경로를 가져올 수 있도록 하는 메소드

# 앱 실행 시 약간의 화면 로딩시간을 없애기
- ready-to-show이벤트
> graceful method
> 앱을 띄울때 약간의 시간이 걸림
> browser window가 보여줄 준비가 될때까지 윈도우 창을 숨김(윈도우 창이 뜨면서 발생하는 약간의 화면 공백을 막기 위함)
- 앱에 backgroundColor 주기

# 부모, 자식 윈도우
- 새로운 BrowserWindow객체를 생성하여 독립적인 프로세스를 2개 띄울 수 있음
- BrowserWindow 생성 시 파라미터로 parent를 주어 부모 프로세스를 선택할 수 있으며, 이때 부모가 종료되면 자식도 종료됨
- BrowserWindow 생성 시 파라미터로 modal : true를 주면 해당 윈도우가 제일 위에 있으며, 종료하기 전까지는 다른 윈도우를 건드릴 수 없음

# 프레임이 없는 윈도우
- BrowserWindow 생성 시 파라미터로 frame : false옵션을 주면 프레임이 없는 윈도우가 생성됨
- 창의 모든 텍스트를 드래깅 못하게 하려면 <body style="user-select:none;"> 를 넣어주면 됨
- 기본적으로 frame : false를 주면 창을 옮길 수 없지만 <body style="webkit-app-region:drag;">를 넣어주면 body부분을 잡고 창을 옮길 수 있음
- body내의 특정 엘리먼트와 상호작용을 하고 싶을때 해당 엘리먼트에만 style="-webkit-app-region:no-drag;" 를 넣어주면 됨

# Properties(BrowserWindow의 옵션지정), Methods, Events
- minWidth, minHeight, maxWidth, maxHeight : 창의 최소, 최대 크기 지정
- Browser Events(focus) : 창이 포커스 되는 경우 실행,  app.on('browser-window-focus', ... )를 통해 브라우저가 포커싱 될때마다 콜백실행 가능
- BrowserWindow의 static 메소드를 사용하여 유틸처럼 다룰 수 있음
- BrowserWindow의 메소드는 app 인스턴스의 메소드와 유사하지만, 윈도우 인스턴스에만 해당함

# Window State
- 'electron-window-state' 모듈을 통해 윈도우의 상태를 기억할 수 있음
- windowStateKeeper객체를 만들고 이를 메인 윈도우에 적용하면 됨

# Web Contents
- Browser Window의 웹 컨텐츠 정보를 가져오는 역할
- webContents.getAllWebContents() : 모든 브라우저 윈도우의 정보를 가져옴(static)
- dom-ready 이벤트 : 모든 HTML이 준비 되면 동작
- did-finish-load 이벤트 : 이미지 컨텐츠가 로드 되면 동작
- new-window : a태그의 target="_blank"와 같이 새롭게 창이 생성되는 경우 동작
    - e.preventDefault를 사용하면 새롭게 창이 생성되진 않음
- before-input-event : 키보드를 누르고 뗄때 발생하는 keyDown과 keyUp 이벤트를 잡아냄
- did-navigate : 탐색이 완료되면 발생하는 이벤트
- login : webContnents가 기본 인증을 수행하길 원할 때 발생되는 이벤트
- media-paused, media-started-playing : 비디오 멈춤, 재생 시 동작하는 이벤트
- context-menu : 마우스 우클릭 시 발생하는 이벤트, params를 통해 여러가지 속성을 가져올 수 있음

