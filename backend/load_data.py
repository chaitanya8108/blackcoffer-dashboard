import json
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "blackcoffer_db")

def load_json_to_mongodb(json_file_path):
    print(f"Connecting to MongoDB at {MONGODB_URL}...")
    client = MongoClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    if "insights" in db.list_collection_names():
        db.insights.drop()
        print("Dropped existing 'insights' collection")
    
    print(f"Reading JSON file: {json_file_path}")
    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    print(f"Found {len(data)} records")
    
    processed_data = []
    for item in data:
        processed_item = {
            "end_year": str(item.get("end_year", "")) if item.get("end_year") else "",
            "intensity": int(item.get("intensity", 0)) if item.get("intensity") else 0,
            "sector": str(item.get("sector", "")) if item.get("sector") else "",
            "topic": str(item.get("topic", "")) if item.get("topic") else "",
            "insight": str(item.get("insight", "")) if item.get("insight") else "",
            "url": str(item.get("url", "")) if item.get("url") else "",
            "region": str(item.get("region", "")) if item.get("region") else "",
            "start_year": str(item.get("start_year", "")) if item.get("start_year") else "",
            "impact": str(item.get("impact", "")) if item.get("impact") else "",
            "added": str(item.get("added", "")) if item.get("added") else "",
            "published": str(item.get("published", "")) if item.get("published") else "",
            "country": str(item.get("country", "")) if item.get("country") else "",
            "relevance": int(item.get("relevance", 0)) if item.get("relevance") else 0,
            "pestle": str(item.get("pestle", "")) if item.get("pestle") else "",
            "source": str(item.get("source", "")) if item.get("source") else "",
            "title": str(item.get("title", "")) if item.get("title") else "",
            "likelihood": int(item.get("likelihood", 0)) if item.get("likelihood") else 0,
            "swot": str(item.get("swot", "")) if item.get("swot") else "",
            "city": str(item.get("city", "")) if item.get("city") else ""
        }
        processed_data.append(processed_item)
    
    result = db.insights.insert_many(processed_data)
    print(f"Inserted {len(result.inserted_ids)} documents")
    
    db.insights.create_index("end_year")
    db.insights.create_index("topic")
    db.insights.create_index("sector")
    db.insights.create_index("region")
    db.insights.create_index("pestle")
    db.insights.create_index("country")
    db.insights.create_index([("title", "text"), ("insight", "text")])
    print("Created indexes")
    
    client.close()
    print("Data loading complete!")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        json_file = sys.argv[1]
    else:
        json_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), "jsondata.json")
    load_json_to_mongodb(json_file)
