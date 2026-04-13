export const UK_LOCATIONS = [
  // Cities
  "Aberdeen", "Armagh", "Bangor", "Bath", "Belfast", "Birmingham", "Bradford", "Brighton & Hove", "Bristol", 
  "Cambridge", "Canterbury", "Cardiff", "Carlisle", "Chelmsford", "Chester", "Chichester", "Colchester", 
  "Coventry", "Derby", "Derry", "Londonderry", "Doncaster", "Dundee", "Dunfermline", "Durham", "Edinburgh", 
  "Ely", "Exeter", "Glasgow", "Gloucester", "Hereford", "Inverness", "Kingston upon Hull", "Lancaster", 
  "Leeds", "Leicester", "Lichfield", "Lincoln", "Lisburn", "Liverpool", "London", "Manchester", 
  "Milton Keynes", "Newcastle upon Tyne", "Newport", "Newry", "Norwich", "Nottingham", "Oxford", "Perth", 
  "Peterborough", "Plymouth", "Portsmouth", "Preston", "Ripon", "Salford", "Salisbury", "Sheffield", 
  "Southampton", "Southend-on-Sea", "St Albans", "St Asaph", "St Davids", "Stirling", "Stoke-on-Trent", 
  "Sunderland", "Swansea", "Truro", "Wakefield", "Wells", "Westminster", "Winchester", "Wolverhampton", 
  "Worcester", "Wrexham", "York",

  // Major UK Towns
  "Reading", "Swindon", "Bournemouth", "Middlesbrough", "Northampton", "Slough", "Poole", "Huddersfield", 
  "Blackpool", "Bolton", "Ipswich", "Warrington", "Dudley", "Telford", "Maidstone", "Basingstoke", 
  "Eastbourne", "Crawley", "Rochdale", "Solihull", "Halifax", "Darlington", "Bedford", "Harrogate", 
  "Southport", "Stevenage", "Hastings", "Watford", "South Shields", "St Helens", "High Wycombe", "Woking", 
  "Basildon", "Farnborough", "Blackburn", "Burnley", "Grimsby", "Keighley", "Kettering", "Lowestoft", 
  "Oldham", "Nuneaton", "Redditch", "Rugby", "Shrewsbury", "Stafford", "Stockton-on-Tees", "Stourbridge", 
  "Sutton Coldfield", "Tamworth", "Taunton", "Wallasey", "Weymouth", "Widnes", "Yeovil", "Macclesfield", 
  "Crewe", "Aylesbury", "Chesterfield", "Corby", "Ashford", "Dartford", "Gravesend", "Tonbridge", 
  "Tunbridge Wells", "Bury", "Wigan", "Stockport", "Bootle", "Birkenhead", "Ellesmere Port", "Runcorn", 
  "Bexhill", "Horsham", "Worthing", "Bognor Regis", "Littlehampton", "Guildford", "Epsom", "Farnham", 
  "Camberley", "Staines-upon-Thames", "Walton-on-Thames", "Weybridge", "Aldershot", "Andover", "Barrow-in-Furness", 
  "Bathgate", "Batley", "Billericay", "Bishop's Stortford", "Blyth", "Boston", "Bridgend", "Bridgwater", 
  "Bromsgrove", "Bury St Edmunds", "Caerphilly", "Cannock", "Carlisle", "Castleford", "Chatham", "Cheshunt", 
  "Chippenham", "Chorley", "Christchurch", "Cleethorpes", "Coalville", "Crosby", "Cumbernauld", "Cwmbran", 
  "Dewsbury", "Falkirk", "Fareham", "Gillingham", "Gosport", "Grantham", "Gravesend", "Great Yarmouth", 
  "Halesowen", "Harlow", "Hartlepool", "Hemel Hempstead", "Hereford", "Hinckley", "Hitchin", "Hove", 
  "Huyton", "Ilkeston", "Kendal", "Kidderminster", "Kingswood", "Leamington Spa", "Llanelli", "Loughborough", 
  "Luton", "Lytham St Annes", "Mansfield", "Margate", "Merthyr Tydfil", "Morecambe", "Neath", "Newark-on-Trent", 
  "Newcastle-under-Lyme", "Newton Abbot", "Newtownabbey", "North Shields", "Nuneaton", "Paignton", "Pontypridd", 
  "Port Talbot", "Ramsgate", "Redcar", "Rochester", "Royal Leamington Spa", "Runcorn", "Sale", "Scunthorpe", 
  "Smethwick", "Stourbridge", "Stratford-upon-Avon", "Sutton-in-Ashfield", "Swadlincote", "Taunton", 
  "Telford", "Torquay", "Trowbridge", "Walsall", "Washington", "Waterlooville", "Wellingborough", "Welwyn Garden City", "West Bromwich", 
  "Weston-super-Mare", "Widnes", "Wrexham", "Yeovil", "Ayr", "Kilmarnock", "Airdrie", "Coatbridge", "Motherwell", "Wishaw", "Hamilton", 
  "East Kilbride", "Paisley", "Greenock", "Irvine", "Kilmarnock", "Dumfries", "Clydebank", "Dumbarton", "Kirkcaldy", 
  "Glenrothes", "Livingston", "Musselburgh", "Elgin", "Peterhead", "Fraserburgh", "Arbroath", "Forfar", 
  "Montrose", "Hawick", "Galashiels", "St Andrews",
  "Newtownards", "Carrickfergus", "Ballymena", "Coleraine", "Omagh", "Larne", "Banbridge", "Craigavon", 
  "Enniskillen", "Strabane", "Holywood", "Cookstown", "Ballymoney", "Limavady", "Ballyclare",
  "Barry", "Colwyn Bay", "Rhyl", "Llandudno", "Carmarthen", "Aberystwyth", "Milford Haven", "Haverfordwest", "Bangor", "Caernarfon", "Holyhead", "Welshpool", "Newtown", "Cwmbran", "Pontypool", "Abergavenny", "Chepstow"
];

// Deduplicate and sort alphabetically
export const UNIQUE_UK_LOCATIONS = Array.from(new Set(UK_LOCATIONS)).sort();
