export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<properties>
  <property reference="692778d6-40f8-4760-b6e8-8729d19cf5c1">
    <department>Residential Sales</department>
    <propertyofweek>No</propertyofweek>
    <price_text>£400,000</price_text>
    <numeric_price>400000.0000</numeric_price>
    <bedrooms>4</bedrooms>
    <receptions>3</receptions>
    <bathrooms>4</bathrooms>
    <priority>On Market</priority>
    <advert_heading>Heytesbury: 4 bed detached property in a unique setting</advert_heading>
    <main_advert>Heytesbury: 4 bed detached property in a unique setting with a double garage and large landscaped garden. Paved drive with parking for upto 4 vehicles.</main_advert>
    <advert2>Heytesbury: 4 bed detached property in a unique setting with a double garage and large landscaped garden. Paved drive with parking for upto 4 vehicles.</advert2>
    <advert3 />
    <advert4 />
    <advert5 />
    <advert6 />
    <house_number>18</house_number>
    <street>Heytesbury Park</street>
    <district>Heytesbury</district>
    <town>Warminster</town>
    <county>Wiltshire</county>
    <postcode>BA12 0HG</postcode>
    <country>UK</country>
    <area>Bath Villages North</area>
    <tenure>Freehold</tenure>
    <bullet1>4 Bedrooms</bullet1>
    <bullet2>1 Ensuite Bathroom</bullet2>
    <bullet3>Gas Central Heating</bullet3>
    <bullet4>Landscaped Garden</bullet4>
    <bullet5>Fully Fitted Kitchen</bullet5>
    <bullet6>Utility Room</bullet6>
    <bullet7>Double Garage</bullet7>
    <bullet8>Loft Conversion</bullet8>
    <rooms>
      <room name="Bedroom 11">
        <measurement_text>20' 6'' x 18' 6'' (6.25m x 5.64m)</measurement_text>
        <description>window to front, rad, coving</description>
      </room>
      <room name="Bathroom">
        <measurement_text>17' 6'' x 12' 7'' (5.33m x 3.84m)</measurement_text>
        <description>with avacado suite, gold taps, big mirrors</description>
      </room>
    </rooms>
    <pictures>
      <picture name="front">
        <filename>https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
      <picture name="Sitting Room">
        <filename>https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
    <floorplans>
      <floorplan name="floorplan">
        <filename>https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </floorplan>
    </floorplans>
  </property>
  <property reference="a1b2c3d4-e5f6-4a5b-b6c7-d8e9f0a1b2c3">
    <department>Residential Lettings</department>
    <propertyofweek>Yes</propertyofweek>
    <price_text>£2,500 pcm</price_text>
    <numeric_price>2500.0000</numeric_price>
    <bedrooms>2</bedrooms>
    <receptions>1</receptions>
    <bathrooms>1</bathrooms>
    <priority>Available</priority>
    <advert_heading>Modern City Apartment with Balcony</advert_heading>
    <main_advert>A stunning 2 bedroom apartment in the heart of the city, featuring a private balcony and secure parking.</main_advert>
    <house_number>45</house_number>
    <street>High Street</street>
    <town>Norwich</town>
    <postcode>NR1 1AA</postcode>
    <country>UK</country>
    <tenure>Leasehold</tenure>
    <bullet1>City Centre Location</bullet1>
    <bullet2>Private Balcony</bullet2>
    <bullet3>Secure Underground Parking</bullet3>
    <pictures>
      <picture name="exterior">
        <filename>https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&amp;fit=crop&amp;w=800&amp;q=80</filename>
      </picture>
    </pictures>
  </property>
</properties>`;
  res.status(200).send(xml);
}
