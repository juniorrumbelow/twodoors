export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<properties>

  <property reference="692778d6-40f8-4760-b6e8-8729d19cf5c1">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£450,000</price_text>
    <numeric_price>450000.0000</numeric_price>
    <bedrooms>4</bedrooms>
    <receptions>2</receptions>
    <bathrooms>2</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Detached</property_style>
    <advert_heading>Impressive 4 bed detached family home in sought-after Eaton</advert_heading>
    <main_advert>A substantial four bedroom detached family home situated in a quiet cul-de-sac in the highly desirable NR4 area. The property boasts a generous rear garden, double garage, and has been extended to provide excellent family living space throughout. Close to top-rated schools and Eaton Park.</main_advert>
    <advert2>A substantial four bedroom detached family home situated in a quiet cul-de-sac in the highly desirable NR4 area.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>12</house_number>
    <street>Avenues Road</street>
    <district>Eaton</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR4 6QR</postcode>
    <country>UK</country>
    <area>Norwich South</area>
    <tenure>Freehold</tenure>
    <bullet1>4 Double Bedrooms</bullet1>
    <bullet2>Master Ensuite</bullet2>
    <bullet3>Open Plan Kitchen/Diner</bullet3>
    <bullet4>Double Garage</bullet4>
    <bullet5>Large Rear Garden</bullet5>
    <bullet6>Gas Central Heating</bullet6>
    <bullet7>Quiet Cul-de-Sac</bullet7>
    <bullet8>Close to Eaton Park</bullet8>
    <rooms>
      <room name="Entrance Hall">
        <measurement_text>14' 2'' x 6' 8'' (4.32m x 2.03m)</measurement_text>
        <description>Tiled flooring, radiator, stairs to first floor, doors to principal rooms.</description>
      </room>
      <room name="Lounge">
        <measurement_text>18' 4'' x 13' 2'' (5.59m x 4.01m)</measurement_text>
        <description>Bay window to front, gas fireplace with surround, two radiators, coving to ceiling.</description>
      </room>
      <room name="Kitchen/Diner">
        <measurement_text>22' 6'' x 12' 3'' (6.86m x 3.73m)</measurement_text>
        <description>Range of fitted wall and base units, granite worktops, integrated appliances, French doors to rear garden, underfloor heating.</description>
      </room>
      <room name="Master Bedroom">
        <measurement_text>15' 8'' x 12' 4'' (4.78m x 3.76m)</measurement_text>
        <description>Window to rear, fitted wardrobes, radiator, door to ensuite.</description>
      </room>
      <room name="Ensuite">
        <measurement_text>8' 2'' x 5' 6'' (2.49m x 1.68m)</measurement_text>
        <description>Walk-in shower, WC, vanity wash basin, heated towel rail, tiled throughout.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>13' 6'' x 11' 2'' (4.11m x 3.40m)</measurement_text>
        <description>Window to front, radiator, fitted wardrobe.</description>
      </room>
      <room name="Bedroom 3">
        <measurement_text>11' 8'' x 10' 4'' (3.56m x 3.15m)</measurement_text>
        <description>Window to rear, radiator.</description>
      </room>
      <room name="Bedroom 4">
        <measurement_text>10' 2'' x 9' 6'' (3.10m x 2.90m)</measurement_text>
        <description>Window to front, radiator, currently used as home office.</description>
      </room>
      <room name="Family Bathroom">
        <measurement_text>9' 4'' x 7' 2'' (2.84m x 2.18m)</measurement_text>
        <description>Bath with shower over, WC, wash basin, heated towel rail, tiled walls and floor.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Front Exterior">
        <filename>https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Master Bedroom">
        <filename>https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Garden">
        <filename>https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Ground Floor">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6105</latitude>
      <longitude>1.2762</longitude>
    </location>
  </property>

  <property reference="b2c3d4e5-f6a7-4b5c-c7d8-e9f0a1b2c3d4">
    <department>Residential Sales</department>
    <propertyofweek>Yes</propertyofweek>
    <price_text>£285,000</price_text>
    <numeric_price>285000.0000</numeric_price>
    <bedrooms>3</bedrooms>
    <receptions>1</receptions>
    <bathrooms>1</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Semi-Detached</property_style>
    <advert_heading>Well-presented 3 bed semi in popular Hellesdon village</advert_heading>
    <main_advert>A well-presented three bedroom semi-detached house located in the ever-popular village of Hellesdon. The property benefits from a modern fitted kitchen, updated bathroom, enclosed rear garden and driveway parking. Within easy reach of Norwich city centre and excellent local schools.</main_advert>
    <advert2>A well-presented three bedroom semi-detached house in the ever-popular village of Hellesdon.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>7</house_number>
    <street>Cromwell Road</street>
    <district>Hellesdon</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR6 5QT</postcode>
    <country>UK</country>
    <area>Norwich North West</area>
    <tenure>Freehold</tenure>
    <bullet1>3 Bedrooms</bullet1>
    <bullet2>Modern Fitted Kitchen</bullet2>
    <bullet3>Updated Bathroom</bullet3>
    <bullet4>Enclosed Rear Garden</bullet4>
    <bullet5>Driveway Parking</bullet5>
    <bullet6>uPVC Double Glazing</bullet6>
    <bullet7>Gas Central Heating</bullet7>
    <bullet8>No Onward Chain</bullet8>
    <rooms>
      <room name="Lounge">
        <measurement_text>14' 6'' x 11' 8'' (4.42m x 3.56m)</measurement_text>
        <description>Window to front, radiator, laminate flooring, TV point.</description>
      </room>
      <room name="Kitchen/Diner">
        <measurement_text>16' 2'' x 9' 4'' (4.93m x 2.84m)</measurement_text>
        <description>Fitted wall and base units, integrated oven and hob, space for washing machine, door to rear garden.</description>
      </room>
      <room name="Bedroom 1">
        <measurement_text>13' 2'' x 11' 0'' (4.01m x 3.35m)</measurement_text>
        <description>Window to front, radiator, fitted wardrobes.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>11' 4'' x 9' 8'' (3.45m x 2.95m)</measurement_text>
        <description>Window to rear, radiator.</description>
      </room>
      <room name="Bedroom 3">
        <measurement_text>8' 6'' x 7' 4'' (2.59m x 2.24m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Bathroom">
        <measurement_text>7' 8'' x 5' 6'' (2.34m x 1.68m)</measurement_text>
        <description>Panel bath with shower over, WC, wash basin, heated towel rail, part-tiled walls.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Front Exterior">
        <filename>https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Bedroom">
        <filename>https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6452</latitude>
      <longitude>1.2643</longitude>
    </location>
  </property>

  <property reference="c3d4e5f6-a7b8-4c5d-d8e9-f0a1b2c3d4e5">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£175,000</price_text>
    <numeric_price>175000.0000</numeric_price>
    <bedrooms>2</bedrooms>
    <receptions>1</receptions>
    <bathrooms>1</bathrooms>
    <priority>On Market</priority>
    <property_type>Flat</property_type>
    <property_style>Purpose Built</property_style>
    <advert_heading>Superb 2 bed city centre apartment with parking</advert_heading>
    <main_advert>A superb two bedroom purpose-built apartment located in the heart of Norwich city centre. The property is presented in excellent decorative order throughout and benefits from an allocated parking space, secure entry system, and is ideally placed for the city's shops, restaurants and transport links.</main_advert>
    <advert2>A superb two bedroom purpose-built apartment in the heart of Norwich city centre with allocated parking.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>14</house_number>
    <street>Riverside Road</street>
    <district>City Centre</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR1 1EQ</postcode>
    <country>UK</country>
    <area>Norwich City Centre</area>
    <tenure>Leasehold</tenure>
    <bullet1>2 Bedrooms</bullet1>
    <bullet2>City Centre Location</bullet2>
    <bullet3>Allocated Parking</bullet3>
    <bullet4>Secure Entry System</bullet4>
    <bullet5>Modern Throughout</bullet5>
    <bullet6>Close to Train Station</bullet6>
    <bullet7>Long Lease Remaining</bullet7>
    <rooms>
      <room name="Lounge/Diner">
        <measurement_text>17' 4'' x 12' 2'' (5.28m x 3.71m)</measurement_text>
        <description>Windows to front, radiator, wood-effect flooring, open plan to kitchen area.</description>
      </room>
      <room name="Kitchen">
        <measurement_text>9' 6'' x 7' 8'' (2.90m x 2.34m)</measurement_text>
        <description>Fitted units, integrated appliances including fridge/freezer, dishwasher and washing machine.</description>
      </room>
      <room name="Bedroom 1">
        <measurement_text>13' 0'' x 10' 4'' (3.96m x 3.15m)</measurement_text>
        <description>Window to rear, radiator, built-in wardrobe.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>10' 2'' x 9' 0'' (3.10m x 2.74m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Bathroom">
        <measurement_text>7' 4'' x 5' 8'' (2.24m x 1.73m)</measurement_text>
        <description>Bath with shower over, WC, wash basin, fully tiled.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Exterior">
        <filename>https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Bedroom">
        <filename>https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6265</latitude>
      <longitude>1.3045</longitude>
    </location>
  </property>

  <property reference="d4e5f6a7-b8c9-4d5e-e9f0-a1b2c3d4e5f6">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£650,000</price_text>
    <numeric_price>650000.0000</numeric_price>
    <bedrooms>5</bedrooms>
    <receptions>3</receptions>
    <bathrooms>3</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Detached</property_style>
    <advert_heading>Exceptional 5 bed executive home in the Golden Triangle</advert_heading>
    <main_advert>An exceptional five bedroom executive detached home occupying a prime position in Norwich's prestigious Golden Triangle conservation area. The property has been meticulously maintained and extended by the current owners to provide luxurious family accommodation over three floors. Features include a stunning open-plan kitchen, three reception rooms, three bathrooms and beautifully landscaped gardens.</main_advert>
    <advert2>An exceptional five bedroom executive detached home in Norwich's prestigious Golden Triangle conservation area.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>3</house_number>
    <street>Unthank Road</street>
    <district>Golden Triangle</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR2 2PA</postcode>
    <country>UK</country>
    <area>Norwich Golden Triangle</area>
    <tenure>Freehold</tenure>
    <bullet1>5 Bedrooms</bullet1>
    <bullet2>3 Bathrooms (2 Ensuites)</bullet2>
    <bullet3>3 Reception Rooms</bullet3>
    <bullet4>Stunning Open Plan Kitchen</bullet4>
    <bullet5>Landscaped Gardens</bullet5>
    <bullet6>Conservation Area</bullet6>
    <bullet7>Off-Road Parking</bullet7>
    <bullet8>Cellar</bullet8>
    <bullet9>Excellent School Catchment</bullet9>
    <rooms>
      <room name="Drawing Room">
        <measurement_text>22' 4'' x 16' 8'' (6.81m x 5.08m)</measurement_text>
        <description>Large bay window to front, original fireplace with wood burner, cornicing, picture rail, two radiators.</description>
      </room>
      <room name="Dining Room">
        <measurement_text>16' 2'' x 13' 4'' (4.93m x 4.06m)</measurement_text>
        <description>Bay window to side, original fireplace, cornicing, radiator.</description>
      </room>
      <room name="Kitchen/Family Room">
        <measurement_text>28' 6'' x 18' 2'' (8.69m x 5.54m)</measurement_text>
        <description>Bespoke shaker-style units, quartz worktops, range cooker, bifold doors to garden, underfloor heating, roof lantern.</description>
      </room>
      <room name="Study">
        <measurement_text>11' 4'' x 9' 8'' (3.45m x 2.95m)</measurement_text>
        <description>Window to front, radiator, built-in shelving.</description>
      </room>
      <room name="Master Bedroom">
        <measurement_text>18' 6'' x 14' 2'' (5.64m x 4.32m)</measurement_text>
        <description>Windows to front and side, original fireplace, dressing area, door to ensuite.</description>
      </room>
      <room name="Master Ensuite">
        <measurement_text>11' 0'' x 8' 4'' (3.35m x 2.54m)</measurement_text>
        <description>Freestanding bath, walk-in shower, double vanity, WC, underfloor heating, fully tiled.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>15' 8'' x 13' 6'' (4.78m x 4.11m)</measurement_text>
        <description>Window to rear, radiator, fitted wardrobes, door to ensuite shower room.</description>
      </room>
      <room name="Bedroom 3">
        <measurement_text>13' 4'' x 11' 8'' (4.06m x 3.56m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Bedroom 4">
        <measurement_text>11' 6'' x 10' 2'' (3.51m x 3.10m)</measurement_text>
        <description>Window to rear, radiator, built-in wardrobe.</description>
      </room>
      <room name="Bedroom 5">
        <measurement_text>10' 4'' x 9' 0'' (3.15m x 2.74m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Front Exterior">
        <filename>https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Drawing Room">
        <filename>https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Master Bedroom">
        <filename>https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Garden">
        <filename>https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Ground Floor">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6218</latitude>
      <longitude>1.2815</longitude>
    </location>
  </property>

  <property reference="e5f6a7b8-c9d0-4e5f-f0a1-b2c3d4e5f6a7">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£220,000</price_text>
    <numeric_price>220000.0000</numeric_price>
    <bedrooms>3</bedrooms>
    <receptions>1</receptions>
    <bathrooms>1</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Terraced</property_style>
    <advert_heading>Charming 3 bed Victorian terrace in Old Catton</advert_heading>
    <main_advert>A charming three bedroom mid-terraced Victorian property situated in Old Catton, one of Norwich's most sought-after villages. The property retains many original features including fireplaces and high ceilings, while benefiting from a modern kitchen extension and updated bathroom. South-facing rear garden.</main_advert>
    <advert2>A charming three bedroom mid-terraced Victorian property in Old Catton with south-facing garden.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>42</house_number>
    <street>St Faiths Road</street>
    <district>Old Catton</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR6 7AB</postcode>
    <country>UK</country>
    <area>Norwich North</area>
    <tenure>Freehold</tenure>
    <bullet1>3 Bedrooms</bullet1>
    <bullet2>Original Victorian Features</bullet2>
    <bullet3>Modern Kitchen Extension</bullet3>
    <bullet4>South-Facing Garden</bullet4>
    <bullet5>Updated Bathroom</bullet5>
    <bullet6>High Ceilings</bullet6>
    <bullet7>Popular Village Location</bullet7>
    <rooms>
      <room name="Lounge">
        <measurement_text>14' 8'' x 12' 6'' (4.47m x 3.81m)</measurement_text>
        <description>Bay window to front, original Victorian fireplace, high ceiling with coving, radiator.</description>
      </room>
      <room name="Kitchen/Diner">
        <measurement_text>18' 4'' x 10' 8'' (5.59m x 3.25m)</measurement_text>
        <description>Extended kitchen with roof light, range of fitted units, freestanding range cooker, door to rear garden.</description>
      </room>
      <room name="Bedroom 1">
        <measurement_text>14' 2'' x 12' 4'' (4.32m x 3.76m)</measurement_text>
        <description>Window to front, original fireplace, high ceiling, radiator.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>11' 8'' x 10' 6'' (3.56m x 3.20m)</measurement_text>
        <description>Window to rear, radiator.</description>
      </room>
      <room name="Bedroom 3">
        <measurement_text>9' 4'' x 8' 2'' (2.84m x 2.49m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Bathroom">
        <measurement_text>8' 6'' x 6' 4'' (2.59m x 1.93m)</measurement_text>
        <description>Freestanding bath, separate shower cubicle, WC, pedestal wash basin, heated towel rail.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Front Exterior">
        <filename>https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6471</latitude>
      <longitude>1.2898</longitude>
    </location>
  </property>

  <property reference="f6a7b8c9-d0e1-4f5a-a1b2-c3d4e5f6a7b8">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£195,000</price_text>
    <numeric_price>195000.0000</numeric_price>
    <bedrooms>2</bedrooms>
    <receptions>1</receptions>
    <bathrooms>1</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Semi-Detached</property_style>
    <advert_heading>Ideal starter home — 2 bed semi in Bowthorpe</advert_heading>
    <main_advert>An ideal first-time buyer property or investment opportunity. This two bedroom semi-detached house is well-presented throughout and benefits from a fitted kitchen, updated shower room, enclosed rear garden and parking. Situated in the popular Bowthorpe area with easy access to the NDR and city centre.</main_advert>
    <advert2>An ideal first-time buyer or investment property in the popular Bowthorpe area.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>19</house_number>
    <street>Chapel Break Road</street>
    <district>Bowthorpe</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR5 9HA</postcode>
    <country>UK</country>
    <area>Norwich West</area>
    <tenure>Freehold</tenure>
    <bullet1>2 Bedrooms</bullet1>
    <bullet2>Fitted Kitchen</bullet2>
    <bullet3>Updated Shower Room</bullet3>
    <bullet4>Enclosed Rear Garden</bullet4>
    <bullet5>Driveway Parking</bullet5>
    <bullet6>No Onward Chain</bullet6>
    <bullet7>Close to NDR</bullet7>
    <rooms>
      <room name="Lounge/Diner">
        <measurement_text>16' 4'' x 10' 6'' (4.98m x 3.20m)</measurement_text>
        <description>Window to front, radiator, laminate flooring.</description>
      </room>
      <room name="Kitchen">
        <measurement_text>10' 2'' x 8' 4'' (3.10m x 2.54m)</measurement_text>
        <description>Range of fitted units, integrated oven and hob, door to rear garden.</description>
      </room>
      <room name="Bedroom 1">
        <measurement_text>12' 6'' x 10' 2'' (3.81m x 3.10m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>9' 8'' x 8' 6'' (2.95m x 2.59m)</measurement_text>
        <description>Window to rear, radiator.</description>
      </room>
      <room name="Shower Room">
        <measurement_text>6' 8'' x 5' 4'' (2.03m x 1.63m)</measurement_text>
        <description>Walk-in shower, WC, wash basin, heated towel rail, tiled.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Exterior">
        <filename>https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6198</latitude>
      <longitude>1.2378</longitude>
    </location>
  </property>

  <property reference="a7b8c9d0-e1f2-4a5b-b2c3-d4e5f6a7b8c9">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£395,000</price_text>
    <numeric_price>395000.0000</numeric_price>
    <bedrooms>4</bedrooms>
    <receptions>2</receptions>
    <bathrooms>2</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Detached</property_style>
    <advert_heading>Spacious 4 bed detached in desirable Thorpe St Andrew</advert_heading>
    <main_advert>A spacious and well-appointed four bedroom detached family home situated in the highly desirable area of Thorpe St Andrew. The property benefits from a large lounge, separate dining room, modern kitchen, family bathroom, ensuite to master, double garage and an excellent sized rear garden. Early viewing is highly recommended.</main_advert>
    <advert2>A spacious four bedroom detached home in the highly desirable Thorpe St Andrew area.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>56</house_number>
    <street>Yarmouth Road</street>
    <district>Thorpe St Andrew</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR7 0EF</postcode>
    <country>UK</country>
    <area>Norwich East</area>
    <tenure>Freehold</tenure>
    <bullet1>4 Bedrooms</bullet1>
    <bullet2>Master Ensuite</bullet2>
    <bullet3>2 Reception Rooms</bullet3>
    <bullet4>Modern Kitchen</bullet4>
    <bullet5>Double Garage</bullet5>
    <bullet6>Large Rear Garden</bullet6>
    <bullet7>Popular School Catchment</bullet7>
    <bullet8>Easy City Access</bullet8>
    <rooms>
      <room name="Lounge">
        <measurement_text>19' 6'' x 13' 4'' (5.94m x 4.06m)</measurement_text>
        <description>Window to front, feature fireplace, two radiators, TV point, carpeted.</description>
      </room>
      <room name="Dining Room">
        <measurement_text>13' 2'' x 11' 6'' (4.01m x 3.51m)</measurement_text>
        <description>Window to rear overlooking garden, radiator, door to kitchen.</description>
      </room>
      <room name="Kitchen">
        <measurement_text>14' 8'' x 10' 4'' (4.47m x 3.15m)</measurement_text>
        <description>Fitted kitchen with integrated appliances, breakfast bar, window to side, door to utility.</description>
      </room>
      <room name="Utility Room">
        <measurement_text>7' 6'' x 5' 8'' (2.29m x 1.73m)</measurement_text>
        <description>Plumbing for washing machine, door to garage.</description>
      </room>
      <room name="Master Bedroom">
        <measurement_text>16' 2'' x 12' 8'' (4.93m x 3.86m)</measurement_text>
        <description>Window to front, fitted wardrobes, radiator, door to ensuite.</description>
      </room>
      <room name="Ensuite">
        <measurement_text>8' 4'' x 5' 6'' (2.54m x 1.68m)</measurement_text>
        <description>Walk-in shower, WC, wash basin, heated towel rail.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>13' 6'' x 11' 4'' (4.11m x 3.45m)</measurement_text>
        <description>Window to rear, radiator.</description>
      </room>
      <room name="Bedroom 3">
        <measurement_text>11' 2'' x 10' 0'' (3.40m x 3.05m)</measurement_text>
        <description>Window to front, radiator, fitted wardrobe.</description>
      </room>
      <room name="Bedroom 4">
        <measurement_text>9' 8'' x 8' 6'' (2.95m x 2.59m)</measurement_text>
        <description>Window to rear, radiator.</description>
      </room>
      <room name="Family Bathroom">
        <measurement_text>9' 0'' x 7' 4'' (2.74m x 2.24m)</measurement_text>
        <description>Bath, separate shower, WC, wash basin, heated towel rail, fully tiled.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Front Exterior">
        <filename>https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Master Bedroom">
        <filename>https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Garden">
        <filename>https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6284</latitude>
      <longitude>1.3352</longitude>
    </location>
  </property>

  <property reference="b8c9d0e1-f2a3-4b5c-c3d4-e5f6a7b8c9d0">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£130,000</price_text>
    <numeric_price>130000.0000</numeric_price>
    <bedrooms>1</bedrooms>
    <receptions>1</receptions>
    <bathrooms>1</bathrooms>
    <priority>On Market</priority>
    <property_type>Flat</property_type>
    <property_style>Purpose Built</property_style>
    <advert_heading>Bright 1 bed ground floor apartment — NR1</advert_heading>
    <main_advert>A bright and well-presented one bedroom ground floor apartment situated within a small purpose-built block close to Norwich city centre. The property benefits from its own private entrance, a modern kitchen and bathroom, and a communal garden. An excellent opportunity for first-time buyers or investors.</main_advert>
    <advert2>A bright one bedroom ground floor apartment with private entrance close to Norwich city centre.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>2</house_number>
    <street>King Street</street>
    <district>City Centre</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR1 1PH</postcode>
    <country>UK</country>
    <area>Norwich City Centre</area>
    <tenure>Leasehold</tenure>
    <bullet1>1 Double Bedroom</bullet1>
    <bullet2>Ground Floor</bullet2>
    <bullet3>Private Entrance</bullet3>
    <bullet4>Modern Kitchen</bullet4>
    <bullet5>Communal Garden</bullet5>
    <bullet6>City Centre Location</bullet6>
    <bullet7>Investment Opportunity</bullet7>
    <rooms>
      <room name="Lounge">
        <measurement_text>13' 4'' x 11' 2'' (4.06m x 3.40m)</measurement_text>
        <description>Window to front, radiator, laminate flooring.</description>
      </room>
      <room name="Kitchen">
        <measurement_text>9' 0'' x 7' 6'' (2.74m x 2.29m)</measurement_text>
        <description>Fitted units, integrated oven, hob and extractor, tiled splashback.</description>
      </room>
      <room name="Bedroom">
        <measurement_text>12' 6'' x 10' 4'' (3.81m x 3.15m)</measurement_text>
        <description>Window to rear, radiator, fitted wardrobe.</description>
      </room>
      <room name="Bathroom">
        <measurement_text>7' 0'' x 5' 4'' (2.13m x 1.63m)</measurement_text>
        <description>Bath with shower over, WC, wash basin, tiled walls.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Exterior">
        <filename>https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6241</latitude>
      <longitude>1.2996</longitude>
    </location>
  </property>

  <property reference="c9d0e1f2-a3b4-4c5d-d4e5-f6a7b8c9d0e1">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£320,000</price_text>
    <numeric_price>320000.0000</numeric_price>
    <bedrooms>3</bedrooms>
    <receptions>2</receptions>
    <bathrooms>1</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Detached</property_style>
    <advert_heading>Attractive 3 bed detached bungalow in Cringleford</advert_heading>
    <main_advert>An attractive three bedroom detached bungalow situated in the popular village of Cringleford, offering well-planned single-storey living. The property benefits from a generous lounge, separate dining room, fitted kitchen, family bathroom and a beautifully maintained garden with summerhouse. Driveway and garage to front.</main_advert>
    <advert2>An attractive three bedroom detached bungalow in the popular village of Cringleford.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>24</house_number>
    <street>Colney Lane</street>
    <district>Cringleford</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR4 7RE</postcode>
    <country>UK</country>
    <area>Norwich South West</area>
    <tenure>Freehold</tenure>
    <bullet1>3 Bedrooms</bullet1>
    <bullet2>Detached Bungalow</bullet2>
    <bullet3>2 Reception Rooms</bullet3>
    <bullet4>Garage and Driveway</bullet4>
    <bullet5>Beautifully Maintained Garden</bullet5>
    <bullet6>Summerhouse</bullet6>
    <bullet7>Popular Village Location</bullet7>
    <rooms>
      <room name="Lounge">
        <measurement_text>18' 6'' x 13' 2'' (5.64m x 4.01m)</measurement_text>
        <description>Window to front, gas fireplace, two radiators, carpeted.</description>
      </room>
      <room name="Dining Room">
        <measurement_text>12' 4'' x 11' 0'' (3.76m x 3.35m)</measurement_text>
        <description>Sliding doors to rear garden, radiator.</description>
      </room>
      <room name="Kitchen">
        <measurement_text>13' 0'' x 9' 6'' (3.96m x 2.90m)</measurement_text>
        <description>Fitted units, built-in oven, gas hob, integrated dishwasher, window to side.</description>
      </room>
      <room name="Bedroom 1">
        <measurement_text>14' 4'' x 11' 8'' (4.37m x 3.56m)</measurement_text>
        <description>Window to rear garden, fitted wardrobes, radiator.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>12' 2'' x 10' 6'' (3.71m x 3.20m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Bedroom 3">
        <measurement_text>10' 0'' x 9' 4'' (3.05m x 2.84m)</measurement_text>
        <description>Window to side, radiator, currently used as study.</description>
      </room>
      <room name="Bathroom">
        <measurement_text>9' 4'' x 7' 2'' (2.84m x 2.18m)</measurement_text>
        <description>Bath, separate shower cubicle, WC, vanity unit, heated towel rail, tiled.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Front Exterior">
        <filename>https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Garden">
        <filename>https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6082</latitude>
      <longitude>1.2643</longitude>
    </location>
  </property>

  <property reference="d0e1f2a3-b4c5-4d5e-e5f6-a7b8c9d0e1f2">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£175,000</price_text>
    <numeric_price>175000.0000</numeric_price>
    <bedrooms>2</bedrooms>
    <receptions>1</receptions>
    <bathrooms>1</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Terraced</property_style>
    <advert_heading>2 bed terraced house with rear courtyard — NR3</advert_heading>
    <main_advert>A well-maintained two bedroom terraced house in the NR3 area of Norwich, close to the city centre. The property features a bright lounge, fitted kitchen with dining area, two bedrooms, modern shower room and an enclosed rear courtyard. Ideal for first-time buyers or investors. Available with no onward chain.</main_advert>
    <advert2>A well-maintained two bedroom terraced house close to Norwich city centre with no onward chain.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>88</house_number>
    <street>Magdalen Road</street>
    <district>Magdalen</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR3 4AR</postcode>
    <country>UK</country>
    <area>Norwich North East</area>
    <tenure>Freehold</tenure>
    <bullet1>2 Bedrooms</bullet1>
    <bullet2>No Onward Chain</bullet2>
    <bullet3>Modern Shower Room</bullet3>
    <bullet4>Enclosed Rear Courtyard</bullet4>
    <bullet5>Close to City Centre</bullet5>
    <bullet6>Good Transport Links</bullet6>
    <rooms>
      <room name="Lounge">
        <measurement_text>13' 6'' x 11' 4'' (4.11m x 3.45m)</measurement_text>
        <description>Window to front, radiator, wood-effect flooring.</description>
      </room>
      <room name="Kitchen/Diner">
        <measurement_text>14' 2'' x 9' 0'' (4.32m x 2.74m)</measurement_text>
        <description>Fitted units, integrated oven and hob, dining area, door to rear courtyard.</description>
      </room>
      <room name="Bedroom 1">
        <measurement_text>12' 4'' x 10' 2'' (3.76m x 3.10m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>10' 0'' x 8' 8'' (3.05m x 2.64m)</measurement_text>
        <description>Window to rear, radiator.</description>
      </room>
      <room name="Shower Room">
        <measurement_text>6' 6'' x 5' 2'' (1.98m x 1.57m)</measurement_text>
        <description>Walk-in shower, WC, wash basin, tiled.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Exterior">
        <filename>https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6368</latitude>
      <longitude>1.2988</longitude>
    </location>
  </property>

  <property reference="e1f2a3b4-c5d6-4e5f-f6a7-b8c9d0e1f2a3">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£310,000</price_text>
    <numeric_price>310000.0000</numeric_price>
    <bedrooms>4</bedrooms>
    <receptions>1</receptions>
    <bathrooms>2</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Semi-Detached</property_style>
    <advert_heading>Extended 4 bed semi with ensuite — Hellesdon</advert_heading>
    <main_advert>A significantly extended four bedroom semi-detached property in Hellesdon, providing flexible and spacious accommodation ideal for growing families. The ground floor extension has created a superb open-plan kitchen/family room, and the first floor benefits from a large master bedroom with ensuite. Enclosed rear garden and driveway parking.</main_advert>
    <advert2>A significantly extended four bedroom semi in Hellesdon with superb open-plan kitchen/family room.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>31</house_number>
    <street>Reepham Road</street>
    <district>Hellesdon</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR6 5BJ</postcode>
    <country>UK</country>
    <area>Norwich North West</area>
    <tenure>Freehold</tenure>
    <bullet1>4 Bedrooms</bullet1>
    <bullet2>Master Ensuite</bullet2>
    <bullet3>Extended Open-Plan Kitchen/Family Room</bullet3>
    <bullet4>Enclosed Rear Garden</bullet4>
    <bullet5>Driveway Parking</bullet5>
    <bullet6>Utility Room</bullet6>
    <bullet7>Popular School Catchment</bullet7>
    <rooms>
      <room name="Lounge">
        <measurement_text>15' 4'' x 12' 6'' (4.67m x 3.81m)</measurement_text>
        <description>Window to front, radiator, feature media wall.</description>
      </room>
      <room name="Kitchen/Family Room">
        <measurement_text>24' 8'' x 14' 4'' (7.52m x 4.37m)</measurement_text>
        <description>Extended open-plan space with bi-fold doors to garden, kitchen with island, integrated appliances, skylights, underfloor heating.</description>
      </room>
      <room name="Utility Room">
        <measurement_text>8' 0'' x 5' 6'' (2.44m x 1.68m)</measurement_text>
        <description>Plumbing for washing machine and tumble dryer, door to rear garden.</description>
      </room>
      <room name="Master Bedroom">
        <measurement_text>15' 2'' x 12' 4'' (4.62m x 3.76m)</measurement_text>
        <description>Window to rear, fitted wardrobes, radiator, door to ensuite.</description>
      </room>
      <room name="Ensuite">
        <measurement_text>8' 6'' x 5' 8'' (2.59m x 1.73m)</measurement_text>
        <description>Walk-in shower, WC, wash basin, heated towel rail, fully tiled.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>12' 2'' x 10' 6'' (3.71m x 3.20m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Bedroom 3">
        <measurement_text>10' 4'' x 9' 2'' (3.15m x 2.79m)</measurement_text>
        <description>Window to rear, radiator.</description>
      </room>
      <room name="Bedroom 4">
        <measurement_text>9' 0'' x 8' 4'' (2.74m x 2.54m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Family Bathroom">
        <measurement_text>8' 8'' x 6' 6'' (2.64m x 1.98m)</measurement_text>
        <description>Bath with shower over, WC, wash basin, heated towel rail, tiled walls.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Front Exterior">
        <filename>https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen/Family Room">
        <filename>https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge">
        <filename>https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Master Bedroom">
        <filename>https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6431</latitude>
      <longitude>1.2589</longitude>
    </location>
  </property>

  <property reference="f2a3b4c5-d6e7-4f5a-a7b8-c9d0e1f2a3b4">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£425,000</price_text>
    <numeric_price>425000.0000</numeric_price>
    <bedrooms>3</bedrooms>
    <receptions>2</receptions>
    <bathrooms>2</bathrooms>
    <priority>On Market</priority>
    <property_type>House</property_type>
    <property_style>Detached</property_style>
    <advert_heading>Beautifully presented 3 bed detached in the Golden Triangle</advert_heading>
    <main_advert>A beautifully presented three bedroom detached property in one of Norwich's most coveted residential areas. The property has been extensively renovated by the current owners and now offers stylish, modern living spaces including a bespoke kitchen, two bathrooms, two reception rooms and a professionally landscaped garden. A truly turn-key property.</main_advert>
    <advert2>A beautifully renovated three bedroom detached property in one of Norwich's most coveted areas.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>67</house_number>
    <street>Newmarket Road</street>
    <district>Golden Triangle</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR2 2HW</postcode>
    <country>UK</country>
    <area>Norwich Golden Triangle</area>
    <tenure>Freehold</tenure>
    <bullet1>3 Double Bedrooms</bullet1>
    <bullet2>2 Bathrooms</bullet2>
    <bullet3>Bespoke Kitchen</bullet3>
    <bullet4>2 Reception Rooms</bullet4>
    <bullet5>Professionally Landscaped Garden</bullet5>
    <bullet6>Extensively Renovated</bullet6>
    <bullet7>Turn-Key Property</bullet7>
    <bullet8>Off-Road Parking</bullet8>
    <rooms>
      <room name="Sitting Room">
        <measurement_text>16' 8'' x 13' 6'' (5.08m x 4.11m)</measurement_text>
        <description>Bay window to front, wood-burning stove, original cornicing and picture rail, oak flooring.</description>
      </room>
      <room name="Dining Room">
        <measurement_text>14' 4'' x 12' 2'' (4.37m x 3.71m)</measurement_text>
        <description>Window to side, oak flooring, open to kitchen.</description>
      </room>
      <room name="Kitchen">
        <measurement_text>16' 2'' x 11' 4'' (4.93m x 3.45m)</measurement_text>
        <description>Bespoke shaker units, quartz worktops, smeg range cooker, integrated appliances, bi-fold doors to garden.</description>
      </room>
      <room name="Bedroom 1">
        <measurement_text>15' 6'' x 13' 2'' (4.72m x 4.01m)</measurement_text>
        <description>Bay window to front, original fireplace, fitted wardrobes, radiator.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>13' 4'' x 11' 8'' (4.06m x 3.56m)</measurement_text>
        <description>Window to rear overlooking garden, radiator, fitted wardrobes.</description>
      </room>
      <room name="Bedroom 3">
        <measurement_text>10' 6'' x 9' 4'' (3.20m x 2.84m)</measurement_text>
        <description>Window to front, radiator.</description>
      </room>
      <room name="Bathroom">
        <measurement_text>10' 2'' x 7' 8'' (3.10m x 2.34m)</measurement_text>
        <description>Freestanding bath, walk-in shower, double vanity, WC, underfloor heating, full height tiling.</description>
      </room>
      <room name="Shower Room">
        <measurement_text>7' 4'' x 5' 6'' (2.24m x 1.68m)</measurement_text>
        <description>Walk-in shower, WC, wash basin, heated towel rail.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Front Exterior">
        <filename>https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Sitting Room">
        <filename>https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Kitchen">
        <filename>https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Bedroom 1">
        <filename>https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Garden">
        <filename>https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6201</latitude>
      <longitude>1.2834</longitude>
    </location>
  </property>

  <property reference="a1b2c3d4-e5f6-4a5b-b6c7-d8e9f0a1b2c3">
    <department>Residential Lettings</department>
    <propertyofweek>Yes</propertyofweek>
    <price_text>£1,350 pcm</price_text>
    <numeric_price>1350.0000</numeric_price>
    <bedrooms>2</bedrooms>
    <receptions>1</receptions>
    <bathrooms>1</bathrooms>
    <priority>Available</priority>
    <property_type>Flat</property_type>
    <property_style>Purpose Built</property_style>
    <advert_heading>Modern 2 bed apartment with balcony — NR1 riverside</advert_heading>
    <main_advert>A stunning two bedroom apartment located in a modern riverside development in NR1. The property features an open-plan kitchen/lounge with Juliet balcony overlooking the river, two double bedrooms, a contemporary bathroom and an allocated parking space. Available immediately. Furnished or unfurnished.</main_advert>
    <advert2>A stunning two bedroom riverside apartment with balcony and allocated parking. Available immediately.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>8</house_number>
    <street>Wherry Road</street>
    <district>Riverside</district>
    <town>Norwich</town>
    <county>Norfolk</county>
    <postcode>NR1 1WR</postcode>
    <country>UK</country>
    <area>Norwich Riverside</area>
    <tenure>Leasehold</tenure>
    <bullet1>2 Double Bedrooms</bullet1>
    <bullet2>River Views</bullet2>
    <bullet3>Juliet Balcony</bullet3>
    <bullet4>Allocated Parking</bullet4>
    <bullet5>Available Immediately</bullet5>
    <bullet6>Furnished or Unfurnished</bullet6>
    <bullet7>Modern Development</bullet7>
    <rooms>
      <room name="Lounge/Kitchen">
        <measurement_text>22' 4'' x 13' 8'' (6.81m x 4.17m)</measurement_text>
        <description>Open-plan with Juliet balcony, river views, integrated kitchen appliances, island breakfast bar, underfloor heating.</description>
      </room>
      <room name="Bedroom 1">
        <measurement_text>14' 2'' x 11' 6'' (4.32m x 3.51m)</measurement_text>
        <description>Window to rear, fitted wardrobes, radiator.</description>
      </room>
      <room name="Bedroom 2">
        <measurement_text>11' 4'' x 10' 0'' (3.45m x 3.05m)</measurement_text>
        <description>Window to side, radiator.</description>
      </room>
      <room name="Bathroom">
        <measurement_text>8' 2'' x 6' 4'' (2.49m x 1.93m)</measurement_text>
        <description>Bath with rainfall shower over, WC, vanity wash basin, heated towel rail, fully tiled.</description>
      </room>
    </rooms>
    <pictures>
      <picture name="Exterior">
        <filename>https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Lounge/Kitchen">
        <filename>https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Bedroom">
        <filename>https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Bathroom">
        <filename>https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="Floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
    <location>
      <latitude>52.6231</latitude>
      <longitude>1.3021</longitude>
    </location>
  </property>

</properties>`;
  res.status(200).send(xml);
}
