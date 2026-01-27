from pydantic import BaseModel, Field
from typing import Optional, List
from bson import ObjectId

class DataItem(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    end_year: Optional[str] = ""
    intensity: Optional[int] = 0
    sector: Optional[str] = ""
    topic: Optional[str] = ""
    insight: Optional[str] = ""
    url: Optional[str] = ""
    region: Optional[str] = ""
    start_year: Optional[str] = ""
    impact: Optional[str] = ""
    added: Optional[str] = ""
    published: Optional[str] = ""
    country: Optional[str] = ""
    relevance: Optional[int] = 0
    pestle: Optional[str] = ""
    source: Optional[str] = ""
    title: Optional[str] = ""
    likelihood: Optional[int] = 0
    swot: Optional[str] = ""
    city: Optional[str] = ""

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
