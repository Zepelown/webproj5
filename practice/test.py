import requests
import json

url = 'http://apis.data.go.kr/6260000/BusanCnstrWorkInfoService/getCnstrWorkInfo'
params = {
    'serviceKey': 'muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb+Pm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq+hRA==',
    'pageNo': '1',
    'numOfRows': '10',
    'resultType': 'json'
}

cnstrcNms = ['학교 분류식하수관로 연결공사(서부지원청 일원)',
             '학교 분류식하수관로 연결사업(북부, 동래지원청 일원)',
             '학교 분류식하수관로 연결사업(남부, 해운대지원청 일원)',
             '하수관로 신설공사[남부처리구역(광안, 남천동 일원)]',
             '하수관로 신설(확충)공사 (대저처리분구 일원)',
             '만덕~센텀 도시고속화도로 건설',
             '하수관로 신설(확장)공사[수영처리구역(양정동 제척지 일원)]',
             '하수관로 신설(확충)공사 (북구제척지 일원)',
             '하수관로 신설(확충)공사 (사상구제척지 일원)',
             '정관산업단지 연결도로 [예림교차로~농공단지] 확장',
             '하수관로 신설(확충)공사 (신평동 일원)',
             '분뇨처리시설 현대화사업',
             '노후하수관로정비사업3-1단계(신시가처리분구 일원)',
             '사상역 광역환승센터 건설공사',
             '동김해IC~식만JCT간 광역도로 건설',
             '부산복합혁신센터 건립공사',
             '수영처리구역(수영강) 오수관로 정비사업',
             '수영처리구역(온천천) 오수관로 정비사업 4차',
             '동부산하수처리구역 오수관로 설치공사',
             '양정동 일원 하수관로 신설(확충)']

for cnstrcNm in cnstrcNms:
    params['cnstrcNm'] = cnstrcNm

    response = requests.get(url, params=params)
    data = json.loads(response.content)  # JSON 데이터를 파싱하여 Python 객체로 변환

    items = data['getCnstrWorkInfo']['body']['items']['item']  # item 리스트 추출

    for item in items:
        lac = item['markerX']  # 위도(markerX) 추출
        lng = item['markerY']  # 경도(markerY) 추출
        cnstrcNm = item['cnstrcNm']
        enddate = item['endde']
        print("공사명:", cnstrcNm)
        print("끝나는 날:", enddate)
        print("위도:", lac)
        print("경도:", lng)
        print()  # 각 지역의 위도와 경도 출력 후 개행
