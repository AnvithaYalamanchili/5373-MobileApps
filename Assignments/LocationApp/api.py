from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from mongomanager import MongoManager

app = FastAPI()

MONGODB_URI = "mongodb://localhost:27017"
DATABASE_NAME = "candydb"

class RegistrationData(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    mobile: str

class UserData(BaseModel):
    first_name: str
    password: str

def connect_to_mongodb():
    return MongoManager(MONGODB_URI, DATABASE_NAME)

@app.post("/register/")
async def register_user(registration_data: RegistrationData):
    try:
        db = connect_to_mongodb()
        users_collection = db["users"]
        result = users_collection.insert_one(registration_data.dict())
        if result:
            return {"message": "User registered successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to register user")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.post("/login/")
async def login_user(user_data: UserData):
    try:
        db = connect_to_mongodb()
        users_collection = db["users"]
        user = users_collection.find_one({"first_name": user_data.first_name, "password": user_data.password})
        if user:
            return {"message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Invalid username or password")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@app.get("/user/{user_id}")
async def get_user(user_id: str):
    try:
        db = connect_to_mongodb()
        users_collection = db["users"]
        user = users_collection.find_one({"id": user_id}) 
        if user:
            return {"first_name": user["first_name"], "last_name": user["last_name"]}
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.get("/")
async def root():
    return {"message": "Welcome to API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="137.184.121.175", port=8085)
