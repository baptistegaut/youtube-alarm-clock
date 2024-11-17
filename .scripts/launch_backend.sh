cd .. 


cd backendPokerReg
source .env 

cd src/
uvicorn main:app --port 8000 --host 0.0.0.0 --reload 