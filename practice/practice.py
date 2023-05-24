import talib
import numpy as np

# 랜덤 데이터 생성
close_prices = np.random.random(100)
high_prices = np.random.random(100)
low_prices = np.random.random(100)
volume = np.random.random(100)

# 이동평균 계산
sma = talib.SMA(close_prices, timeperiod=20)  # 20일간의 단순 이동평균

# 볼린저 밴드 계산
upper, middle, lower = talib.BBANDS(close_prices, timeperiod=20)  # 20일간의 볼린저 밴드

# RSI(상대강도지수) 계산
rsi = talib.RSI(close_prices, timeperiod=14)  # 14일간의 RSI

# 이동평균수렴확산(MACD) 계산
macd, macdsignal, macdhist = talib.MACD(close_prices, fastperiod=12, slowperiod=26, signalperiod=9)  # MACD, MACD 신호선, MACD 히스토그램

# 볼륨 가중 이동평균(VWAP) 계산
# vwap = talib.VWAP(high_prices, low_prices, close_prices, volume)  # VWAP 계산

# 계산된 결과 출력
print("SMA:", sma)
print("Upper Bollinger Band:", upper)
print("Middle Bollinger Band:", middle)
print("Lower Bollinger Band:", lower)
print("RSI:", rsi)
print("MACD:", macd)
print("MACD Signal:", macdsignal)
print("MACD Histogram:", macdhist)
# print("VWAP:", vwap)
