# Category Color Mapping for projects.json

Use these category values in your projects.json file to automatically apply the correct three-tier color system to category tags on network tiles.

## Three-Tier Color System

The categories are divided into three equal groups with distinct color schemes:

### First Third: Light Blue with Blue Text
| Category | CSS Class | Background | Text Color | Border Color |
|----------|-----------|------------|------------|--------------|
| Art | `Art` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Beauty | `Beauty` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Business | `Business` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Computer Science | `Computer-Science` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Consulting | `Consulting` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Crafts/Handmade Goods | `Crafts---Handmade-Goods` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Data | `Data` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Design | `Design` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Engineering | `Engineering` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Entrepreneurship | `Entrepreneurship` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Environment | `Environment` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |
| Graphic Design | `Graphic-Design` | rgba(173, 216, 230, 0.15) | #4682b4 | rgba(173, 216, 230, 0.3) |

### Second Third: Light Pink with Black Text
| Category | CSS Class | Background | Text Color | Border Color |
|----------|-----------|------------|------------|--------------|
| Event Planning | `Event-Planning` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Finance | `Finance` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Film | `Film` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Food + Drink | `Food---Drink` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Hairstyling + Barber | `Hairstyling---Barber` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Health | `Health` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Human Resources | `Human-Resources` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Landscaping | `Landscaping` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Law | `Law` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Literature | `Literature` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |
| Marketing | `Marketing` | rgba(255, 192, 203, 0.4) | #000000 | rgba(255, 105, 180, 0.5) |

### Third Third: Light Yellow with Black Text
| Category | CSS Class | Background | Text Color | Border Color |
|----------|-----------|------------|------------|--------------|
| Operations | `Operations` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| Performing Arts | `Performing-Arts` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| Photography | `Photography` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| Political Science | `Political-Science` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| Product Design | `Product-Design` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| Psychology | `Psychology` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| Sales | `Sales` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| STEM | `STEM` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| Technology | `Technology` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| Tutoring + Education | `Tutoring-+-Education` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |
| Writing | `Writing` | rgba(255, 255, 153, 0.4) | #000000 | rgba(255, 193, 7, 0.6) |

## Submission Type Tag Colors

| Type | CSS Class | Background | Text Color | Border Color |
|------|-----------|------------|------------|--------------|
| Small Business | `small-biz` | #ffffff | #000000 | #e0e0e0 |
| Startup | `startup` | #ffffff | #000000 | #e0e0e0 |
| Business | `business` | #ffffff | #000000 | #e0e0e0 |
| Personal Profile | `Personal-Profile` | #000000 | #ffffff | #000000 |

## Usage in projects.json

When adding projects to your projects.json file, use the exact category names from the "Category" column above. The CSS will automatically apply the correct colors based on the category value.

Example:
```json
{
  "title": "My Tech Startup",
  "category": "Technology",
  "type": "startup",
  "description": "Building the future..."
}
```

The category "Technology" will automatically get the light blue pastel styling, and the type "startup" will get white background with black text.
