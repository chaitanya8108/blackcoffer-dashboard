from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class FilterParams(BaseModel):
    end_year: Optional[str] = None
    topic: Optional[str] = None
    sector: Optional[str] = None
    region: Optional[str] = None
    pestle: Optional[str] = None
    source: Optional[str] = None
    swot: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
