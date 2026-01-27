from fastapi import APIRouter, Query
from typing import Optional
from app.database import get_database

router = APIRouter()

def build_filter_query(end_year=None, topic=None, sector=None, region=None, pestle=None, source=None, swot=None, country=None, city=None):
    query = {}
    if end_year: query["end_year"] = end_year
    if topic: query["topic"] = topic
    if sector: query["sector"] = sector
    if region: query["region"] = region
    if pestle: query["pestle"] = pestle
    if source: query["source"] = source
    if swot: query["swot"] = swot
    if country: query["country"] = country
    if city: query["city"] = city
    return query

@router.get("/data")
async def get_all_data(
    end_year: Optional[str] = Query(None),
    topic: Optional[str] = Query(None),
    sector: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    pestle: Optional[str] = Query(None),
    source: Optional[str] = Query(None),
    swot: Optional[str] = Query(None),
    country: Optional[str] = Query(None),
    city: Optional[str] = Query(None),
    limit: int = Query(1000, ge=1, le=10000),
    skip: int = Query(0, ge=0)
):
    db = get_database()
    query = build_filter_query(end_year, topic, sector, region, pestle, source, swot, country, city)
    cursor = db.insights.find(query).skip(skip).limit(limit)
    data = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        data.append(document)
    return {"data": data, "count": len(data)}

@router.get("/filters")
async def get_filter_options():
    db = get_database()
    filter_options = {
        "end_years": [], "topics": [], "sectors": [], "regions": [],
        "pestles": [], "sources": [], "swots": [], "countries": [], "cities": []
    }
    fields = [
        ("end_year", "end_years"), ("topic", "topics"), ("sector", "sectors"),
        ("region", "regions"), ("pestle", "pestles"), ("source", "sources"),
        ("swot", "swots"), ("country", "countries"), ("city", "cities")
    ]
    for field, key in fields:
        values = await db.insights.distinct(field)
        filter_options[key] = sorted([str(v) for v in values if v and str(v).strip()])
    return filter_options

@router.get("/aggregated")
async def get_aggregated_data(
    end_year: Optional[str] = Query(None), topic: Optional[str] = Query(None),
    sector: Optional[str] = Query(None), region: Optional[str] = Query(None),
    pestle: Optional[str] = Query(None), source: Optional[str] = Query(None),
    swot: Optional[str] = Query(None), country: Optional[str] = Query(None),
    city: Optional[str] = Query(None)
):
    db = get_database()
    match_query = build_filter_query(end_year, topic, sector, region, pestle, source, swot, country, city)
    result = {}
    
    # Intensity by Sector
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"sector": {"$ne": ""}, "intensity": {"$gt": 0}}},
                {"$group": {"_id": "$sector", "avg": {"$avg": "$intensity"}}},
                {"$sort": {"avg": -1}}, {"$limit": 10}]
    result["intensity_by_sector"] = {doc["_id"]: round(doc["avg"], 2) async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # Likelihood by Region
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"region": {"$ne": ""}, "likelihood": {"$gt": 0}}},
                {"$group": {"_id": "$region", "avg": {"$avg": "$likelihood"}}},
                {"$sort": {"avg": -1}}, {"$limit": 10}]
    result["likelihood_by_region"] = {doc["_id"]: round(doc["avg"], 2) async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # Relevance by Topic
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"topic": {"$ne": ""}, "relevance": {"$gt": 0}}},
                {"$group": {"_id": "$topic", "avg": {"$avg": "$relevance"}}},
                {"$sort": {"avg": -1}}, {"$limit": 15}]
    result["relevance_by_topic"] = {doc["_id"]: round(doc["avg"], 2) async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # Year Distribution
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"end_year": {"$ne": ""}}},
                {"$group": {"_id": "$end_year", "count": {"$sum": 1}}},
                {"$sort": {"_id": 1}}]
    result["year_distribution"] = {str(doc["_id"]): doc["count"] async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # Country Distribution
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"country": {"$ne": ""}}},
                {"$group": {"_id": "$country", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}}, {"$limit": 15}]
    result["country_distribution"] = {doc["_id"]: doc["count"] async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # Topic Distribution
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"topic": {"$ne": ""}}},
                {"$group": {"_id": "$topic", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}}, {"$limit": 10}]
    result["topic_distribution"] = {doc["_id"]: doc["count"] async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # Region Distribution
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"region": {"$ne": ""}}},
                {"$group": {"_id": "$region", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}}]
    result["region_distribution"] = {doc["_id"]: doc["count"] async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # PESTLE Distribution
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"pestle": {"$ne": ""}}},
                {"$group": {"_id": "$pestle", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}}]
    result["pestle_distribution"] = {doc["_id"]: doc["count"] async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # Sector Distribution
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"sector": {"$ne": ""}}},
                {"$group": {"_id": "$sector", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}}, {"$limit": 10}]
    result["sector_distribution"] = {doc["_id"]: doc["count"] async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # SWOT Distribution
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"swot": {"$ne": ""}}},
                {"$group": {"_id": "$swot", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}}]
    result["swot_distribution"] = {doc["_id"]: doc["count"] async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    # Source Distribution
    pipeline = [{"$match": match_query} if match_query else {"$match": {}},
                {"$match": {"source": {"$ne": ""}}},
                {"$group": {"_id": "$source", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}}, {"$limit": 10}]
    result["source_distribution"] = {doc["_id"]: doc["count"] async for doc in db.insights.aggregate(pipeline) if doc["_id"]}
    
    return result

@router.get("/stats")
async def get_stats(
    end_year: Optional[str] = Query(None), topic: Optional[str] = Query(None),
    sector: Optional[str] = Query(None), region: Optional[str] = Query(None),
    pestle: Optional[str] = Query(None), source: Optional[str] = Query(None),
    swot: Optional[str] = Query(None), country: Optional[str] = Query(None),
    city: Optional[str] = Query(None)
):
    db = get_database()
    query = build_filter_query(end_year, topic, sector, region, pestle, source, swot, country, city)
    total_count = await db.insights.count_documents(query if query else {})
    
    pipeline = [{"$match": query} if query else {"$match": {}},
                {"$group": {"_id": None,
                           "avg_intensity": {"$avg": "$intensity"},
                           "avg_likelihood": {"$avg": "$likelihood"},
                           "avg_relevance": {"$avg": "$relevance"},
                           "max_intensity": {"$max": "$intensity"},
                           "max_likelihood": {"$max": "$likelihood"},
                           "max_relevance": {"$max": "$relevance"}}}]
    
    stats = {"total_records": total_count, "avg_intensity": 0, "avg_likelihood": 0, "avg_relevance": 0,
             "max_intensity": 0, "max_likelihood": 0, "max_relevance": 0}
    async for doc in db.insights.aggregate(pipeline):
        stats.update({
            "avg_intensity": round(doc.get("avg_intensity", 0) or 0, 2),
            "avg_likelihood": round(doc.get("avg_likelihood", 0) or 0, 2),
            "avg_relevance": round(doc.get("avg_relevance", 0) or 0, 2),
            "max_intensity": doc.get("max_intensity", 0) or 0,
            "max_likelihood": doc.get("max_likelihood", 0) or 0,
            "max_relevance": doc.get("max_relevance", 0) or 0
        })
    
    stats["unique_topics"] = len(await db.insights.distinct("topic", query if query else {}))
    stats["unique_countries"] = len(await db.insights.distinct("country", query if query else {}))
    stats["unique_sectors"] = len(await db.insights.distinct("sector", query if query else {}))
    stats["unique_regions"] = len(await db.insights.distinct("region", query if query else {}))
    stats["unique_sources"] = len(await db.insights.distinct("source", query if query else {}))
    
    return stats

@router.get("/table-data")
async def get_table_data(
    end_year: Optional[str] = Query(None), topic: Optional[str] = Query(None),
    sector: Optional[str] = Query(None), region: Optional[str] = Query(None),
    pestle: Optional[str] = Query(None), source: Optional[str] = Query(None),
    swot: Optional[str] = Query(None), country: Optional[str] = Query(None),
    city: Optional[str] = Query(None), page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100), search: Optional[str] = Query(None)
):
    db = get_database()
    query = build_filter_query(end_year, topic, sector, region, pestle, source, swot, country, city)
    
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"topic": {"$regex": search, "$options": "i"}},
            {"insight": {"$regex": search, "$options": "i"}},
            {"country": {"$regex": search, "$options": "i"}}
        ]
    
    skip = (page - 1) * limit
    total = await db.insights.count_documents(query if query else {})
    
    cursor = db.insights.find(query if query else {}).skip(skip).limit(limit).sort("_id", -1)
    data = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        data.append(doc)
    
    return {
        "data": data,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit
    }

@router.get("/intensity-likelihood-relevance")
async def get_ilr(
    end_year: Optional[str] = Query(None), topic: Optional[str] = Query(None),
    sector: Optional[str] = Query(None), region: Optional[str] = Query(None),
    pestle: Optional[str] = Query(None), source: Optional[str] = Query(None),
    swot: Optional[str] = Query(None), country: Optional[str] = Query(None),
    city: Optional[str] = Query(None)
):
    db = get_database()
    query = build_filter_query(end_year, topic, sector, region, pestle, source, swot, country, city)
    query["intensity"] = {"$gt": 0}
    query["likelihood"] = {"$gt": 0}
    query["relevance"] = {"$gt": 0}
    
    cursor = db.insights.find(query, {"intensity": 1, "likelihood": 1, "relevance": 1, "topic": 1, "country": 1, "sector": 1}).limit(500)
    return [{"intensity": doc.get("intensity", 0), "likelihood": doc.get("likelihood", 0),
             "relevance": doc.get("relevance", 0), "topic": doc.get("topic", ""),
             "country": doc.get("country", ""), "sector": doc.get("sector", "")} async for doc in cursor]
