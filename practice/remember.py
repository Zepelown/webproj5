


#문자열 포맷
print("나는 %s살 입니다" %27)
print("나는 %s색과 %s색을 좋아한다" %("파란","빨간"))
print("나는 {}색과 {}색을 좋아한다" .format("파란","빨간"))
age =20
color = "빨간"
print(f"나는 {age}살이고, {color}색을 좋아한다")

# 랜덤 난수 생성
from random import *

# print(int(random()*45)+1)
# # 1~45이하의 값 생성

# print(randrange(1,46))
# print(randint(1,45))
# # 1~45이하의 값 생성

# 문자열처리함수
# python = "Python is Amazing"
# print(len(python)) #길이
# print(python.replace("Python", "Java")) #대체

# print(python.index("n"))    #n찾기
# print(python.find("n"))

# print(python.count("n")) #n이 몇번

url = "http://naver.com"

# pw1 = url.replace("http://","")
# print(pw1)

# pw2 = pw1[:pw1.index(".")]
# print(pw2)

# pw3 = pw2[:3] + str(len(pw2)) + str(pw2.count("e")) +"!"
# print("생선된 비밀번호 : " + pw3)

#리스트 [] - 순서를 따지는 객체의 집합
# subway = ["유재석", "조세호", "박명수"]
# print(subway.index("조세호"))

# subway.append("하하")   # 맨뒤에 추가
# print(subway)

# subway.insert(1, "정형돈")  # 사이에 추가
# print(subway)

# subway.pop()    # 맨뒤에서 한명 뺌
# print(subway)

# # 정렬
# num_list = [5,2,4,3,1]
# num_list.sort()
# print(num_list)

# # 순서뒤집기 - .reverse()
# # 모두 지우기 -  .clear()

# # 리스트 확장 (합치기)
# subway.extend(num_list)
# print(subway)

# 리스트[], 세트{}, 튜플()

# from random import *
# # ID = [1,2,3,4,5,6,7,8,9,10,
# # 11,12,13,14,15,16,17,18,19,20]
# ID = range(1,21)
# ID = list(ID)
# print(ID)
# shuffle(ID)
# winners = sample(ID, 4)
# print("-- 당첨자 발표 --")
# print(f"치킨 당첨자 : {winners[0]}" )
# print(f"커피 당첨자 : {winners[1:]}")
# print("-- 축하합니다 --")
