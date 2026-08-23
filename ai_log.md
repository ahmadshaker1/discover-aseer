# AI Prompt

```text
You are a local travel guide for Aseer, Saudi Arabia. Write a realistic daily itinerary using ONLY the provided catalogs.
--- TRIP DETAILS ---
Dates: Starting 2026-08-22T21:00:00.000Z for 7 days
Trip Style: intensive
Budget: premium
Budget Rule (per person): Restaurants > 120, Experiences > 400, Events > 75 or free.
Note: You can always use free experiences or events if they suit the plan. You may also use items from the catalog even if they do not have a price specified.
Companion: couple
Interests: family, food, heritage, adventure, nature, culture
Meals per day: 3
Food Preferences: local, italian, indian, american, far_eastern, middle_eastern, mexican

--- CATALOGS ---
You must ONLY pick items from the following catalogs:
RESTAURANTS: [{"id":1,"title":"Zurna","cuisine":["lebanese"],"description":"A modern restaurant, seamlessly blending Turkish, Lebanese, and Armenian dishes."},{"id":2,"title":"Shandal","cuisine":["khaleeji","international_cuisine"],"description":"<p>Here, experience authentic Hijazi and Khaleeji cuisine in a modern setting.</p>"},{"id":3,"title":"Sadaf Restaurant","cuisine":["aseeri_cuisine"],"description":"<p>A fine restaurant in Abha serving high-quality local dishes</p>"},{"id":4,"title":"Husn Abha Al-Turathi","cuisine":["aseeri_cuisine"],"description":"A local restaurant offering traditional southern dishes like mandi, madhbi, and areeka, in decor inspired by Asiri architectural heritage"},{"id":5,"title":"Haneeth Ali Ramzi Restaurant","cuisine":["aseeri_cuisine"],"description":"In the heart of Abha city, savor Aseeri delicacies in traditional ambiance."},{"id":6,"title":"Mallah","cuisine":null,"description":"<p>Enjoy traditional dishes in a unique restaurant ambiance.</p>"},{"id":7,"title":"Mahrani","cuisine":["indian"],"description":"For spice lovers, Mahrani offers a stylish, modern Indian dining experience."},{"id":8,"title":"La-Scene","cuisine":["italian"],"description":"A unique experience tasting diverse dishes, desserts, and fresh pastries."},{"id":9,"title":"CRAVING CLUB","cuisine":["american"],"description":"<p>For lovers of American cuisine, indulge in diverse meat dishes with stunning city views.</p>"},{"id":10,"title":"Joy Venue","cuisine":["international_cuisine","cafe"],"description":"<p>A balcony with foggy views offers diverse meals overlooking the Tihama slopes.</p>"},{"id":11,"title":"Malla Haneeth","cuisine":["aseeri_cuisine"],"description":"A traditional restaurant specializing in Asiri hanith, with a \nheritage ambiance and comfortable family seating"},{"id":12,"title":"Bab Al Turath","cuisine":["aseeri_cuisine"],"description":"<p>A heritage restaurant in Abha serving mandi and madhbi in a traditional southern setting, offering indoor and outdoor seating and family rooms</p>"},{"id":13,"title":"Jorry Elite","cuisine":["lebanese","italian","international_cuisine"],"description":"<p>Scenic green views with a diverse selection of international dishes.</p>"},{"id":14,"title":"Al Areesh Restauran","cuisine":["aseeri_cuisine"],"description":"<p>Blend of heritage and modernity at a traditional breakfast destination.</p>"},{"id":15,"title":"Ekleel","cuisine":["lebanese"],"description":"Here, Lebanese flavors dominate with appetizers, pastries, grills, and high-quality ingredients."},{"id":16,"title":"Allam Italian","cuisine":["italian"],"description":"Enjoy unique Italian dishes away from the city's hustle in European-style ambiance and designs."},{"id":17,"title":"Ala Bali Cafe","cuisine":["lebanese"],"description":"<p>A restaurant offering delicious Lebanese dishes, unique ambiance, and diverse menu.</p>"},{"id":18,"title":"Senso","cuisine":["italian"],"description":"\"An Italian restaurant offering pasta, pizza, and classic dishes in an elegant atmosphere\""}]
EXPERIENCES: [{"id":1,"title":"Rope Descending Adventure","type":["Adventures","Nature"],"duration":"Each person needs 10 minutes.","description":"Challenge heights and experience the thrill of rappelling. Ascend to lofty places then safely descend, exploring freedom and excitement across diverse terrains.\r\n\r\nGet ready for the height challenge and experience the excitement with the rope descent experience! Choose to climb to the high places and then immerse yourself in the experience of descending safely and with extreme excitement. Discover the freedom and thrill as you slide with a rope in different areas, as this activity mixes adventure with real excitement.\r\n\r\nWhat does the experience of getting off the rope with us include?\r\n\r\n- Security equipment: use advanced safety equipment to secure the rope descent experience.\r\n- Guidance from professionals: a team of professionals provides guidance and support during the rope descent process.\r\n- Unique locations: go from elevated areas to the bottom and enjoy the wonderful scenery.\r\n- Unique experience: experience the feeling of freedom and challenge while descending quickly.\r\n\r\nWhy choose to try the rope descent with us?\r\n\r\n- Safety and professionalism: we guarantee to provide a safe and professional experience in all aspects of the activity.\r\n- Fun and challenging: make the rope descent an opportunity to enjoy the challenge and thrill.\r\n- Unique experience: enjoy a unique and self-challenging experience in an atmosphere of adventure.\r\n- Connect with nature: immerse yourself in the beauty of nature during the fascinating descent process.\r\n\r\nGet ready for the height challenge and experience the rope descent with us, where adventure and excitement combine to give you an unforgettable experience!"},{"id":6,"title":"Jeep and mount","type":["Adventures","Nature"],"duration":null,"description":"An experience punctuated by moments of excitement and suspense on an adventure through the rugged wilderness and steep terrain"},{"id":8,"title":"Hiking","type":["Adventures","Nature"],"duration":null,"description":"Prepare for an exhilarating hiking adventure that combines the beauty of nature with physical exhilaration. Our trail experience offers peace and an intimate connection with stunning natural sites."},{"id":9,"title":"Hiking","type":["Adventures","Nature"],"duration":"The trip duration is 1-3 hours and is subject to change in coordination with the leader.","description":"Enjoy nature with steady steps: experience outdoor walking with us!\r\n\r\nGet ready for an exciting journey of exploration in the world of outdoor walking, where our experience combines the beauty of nature and the stimulation of physical movement. We will take you on a unique journey, mixing tranquility and communication with nature in picturesque natural locations.\r\n\r\nWhat does the outdoor walking experience include with us?\r\n\r\n- Stunning nature: discover amazing natural sites and breathtaking views during your trip.\r\n- Diverse paths: multiple paths to match your level of experience and skills.\r\n- Sunrise and sunset: enjoy the beauty of sunrise and sunset during your outdoor journey.\r\n- Expert guidance: a team of experts accompanies you to ensure a safe and enjoyable outdoor walking experience.\r\n- Natural breaks: enjoy breaks in quiet natural areas.\r\n\r\nWhy choose to try outdoor walking with us?\r\n\r\n- Provide a safe experience: we are committed to providing a safe and comfortable journey for every participant in our experience.\r\n- Suitable for everyone: varied routes that meet the needs of all participants in terms of fitness and experience.\r\n- Communication with nature: an opportunity to enjoy the beauty of nature and interact with it characteristically.\r\n\r\nMake the experience of an outdoor walk with us an opportunity to enjoy the beauty of nature and communicate with it in a unique way. Join us and get ready for an unforgettable adventure!"},{"id":10,"title":"Abha Wonders & Al Habala Gems","type":["Adventures","Nature"],"duration":"6 hours","description":"Service Description\r\n(Cost per person; minimum of 2 guests per booking)\r\n\r\nExplore the Hidden Gems of Southern Saudi Arabia! 🌿\r\n\r\nEmbark on an unforgettable journey through the enchanting southern region of Saudi Arabia, where rich culture, breathtaking landscapes, and warm hospitality come together for a truly immersive experience.\r\n\r\nTour Itinerary:\r\n\r\n📍 Scenic Drive to Al Habala – Marvel at the breathtaking cliffside village known as the \"Saudi Grand Canyon,\" where the dramatic landscapes will leave you in awe.\r\n\r\n🌳 Relax at Abu Kheyal Park – Take a peaceful stroll through lush greenery and panoramic mountain views, perfect for nature lovers and photography enthusiasts.\r\n\r\n🏰 Step Into History at Shamsan Ottoman Castle – Explore the fascinating remnants of Ottoman-era architecture, offering a glimpse into the region’s storied past.\r\n\r\n🛍️ Shop Like a Local at the Tuesday Bazaar – Experience the bustling marketplace (open all week!), where you can browse handcrafted goods, traditional textiles, and local delicacies.\r\n\r\n🏡 Wander Through Al Basta District – Get lost in a labyrinth of narrow streets and alleys, lined with charming mud-brick houses, intricate wooden balconies, and colorful windows—a true hidden gem of Abha!\r\n\r\n🎨 Discover the Fatima Museum – End your journey with a deep dive into southern home decor and traditional women’s clothing, gaining insight into the artistic heritage of the region."},{"id":11,"title":"Sawda Mountains Hiking Trail","type":["Adventures","Nature"],"duration":"6 hours","description":"Service Description\r\n(Cost per person; minimum of 2 guests per booking)\r\n\r\nConquer the Heights: Sawda Mountains Hiking Adventure! 🌿\r\n\r\nAt 3,000 meters above sea level, the Sawda Mountains offer unreal panoramic views, crisp mountain air, and a hiking experience like no other.\r\n\r\nTour Itinerary:\r\n\r\n🥾 A Historic Trail – Embark on an optional 8 km hike along a 250-year-old mountain trail, leading to the valley below.\r\n\r\n🏔️ Breathtaking Altitude – Experience Saudi Arabia’s highest peak, surrounded by majestic, centuries-old juniper trees—a true symbol of the region.\r\n\r\n🍃 Immersive Nature Escape – Disconnect from the city and reconnect with pristine landscapes, fresh mountain air, and serene silence."},{"id":12,"title":"Ancient Village of Rijal Almaa","type":["Heritage and Arts"],"duration":"6 hours","description":"Service Description\r\n(Cost per person; minimum of 2 guests per booking)\r\n\r\nDiscover the Magic of Rijal Almaa Heritage Village! 🏰\r\n\r\nStep into the past and experience the breathtaking Rijal Almaa Heritage Village, a historical masterpiece over 900 years old! Nestled in the heart of Saudi Arabia’s southern region, this enchanting village is a true hidden gem, offering rich culture, stunning architecture, and an unforgettable journey through time.\r\n\r\nTour Itinerary:\r\n\r\n🚗 Scenic Drive to Jabal Sawda – Kick off your journey with a ride to one of Saudi Arabia’s most famous mountain destinations, known for its cool climate and lush juniper forests.\r\n\r\n☁️ Walk Among the Clouds & Cable Car Thrill – Take a breathtaking walk above the clouds before experiencing an exhilarating cable car ride with stunning panoramic views of the landscape below.\r\n\r\n🏡 Explore the Unique Heritage Village – Wander through the charming alleys of Rijal Almaa, where multi-story palaces built from stone, clay, and wood stand as a testament to centuries of tradition.\r\n\r\n🏛️ Museum Visit – Dive into the village’s rich history and witness the locals' dedication to preserving their heritage at the village museum.\r\n\r\n🛍️ Bazaar & Local Crafts – End the day with a visit to a bustling local market, where you can browse handcrafted souvenirs and experience the warmth of the southern culture."},{"id":13,"title":"8 hours sightseeing tour in Al-Soudah","type":["Heritage and Arts","Nature"],"duration":null,"description":"Explore breathtaking mountain views and cultural landmarks on this guided tour."},{"id":14,"title":"Enjoy A Day in Our 38-Year-Old Farm and Organic Food","type":["Culinary Arts","Nature"],"duration":null,"description":"Experience farm life, traditional cooking, and authentic Aseeri culture."},{"id":15,"title":"Discover the Timeless Charm of Aseeri Home: A Journey into Saudi Tradition","type":["Heritage and Arts","Nature"],"duration":null,"description":"Traditional meal and heritage tour at Aseeri home and farm"},{"id":17,"title":"Abseiling and Hike","type":["Adventures","Nature"],"duration":null,"description":"25-min hike; historic inscriptions; thrilling abseil descent; suitable for all skill levels"},{"id":18,"title":"The Ridge Walk","type":["Adventures","Nature"],"duration":null,"description":"Just a short stroll away from Husaak's Center Tanomah lies the family-friendly Ridge Walk, a delightful and accessible trail that promises an enjoyable experience for all. Accompanied by our knowledgeable guide, you'll be led to several viewpoints that offer breathtaking vistas of Tanomah's renowned green mountains."},{"id":19,"title":"Al-Assas Council For Live Culinary Experiences","type":["Culinary Arts"],"duration":null,"description":"Live Aseeri cooking with Ali, coffee, dates, and feast"},{"id":20,"title":"Welcome To Abu Talal's Farm","type":["Culinary Arts","Nature"],"duration":null,"description":"Farm tour, organic meal, bread baking, and Aseeri attire"},{"id":21,"title":"Aseeri Hospitality Experience: Savoring Saudi Coffee and Traditional Cuisine","type":["Culinary Arts"],"duration":null,"description":"Experience Aseeri hospitality with traditional food, attire, and warm welcome."},{"id":22,"title":"Aseeri Rose Headband Maker Experience","type":["Heritage and Arts"],"duration":null,"description":"Aseeri rose headband crafting, nature tour, unique Saudi hospitality."},{"id":23,"title":"Visit Ancient Village of Rijal Almaa","type":["Heritage and Arts"],"duration":null,"description":"Discover a historical gem with over 900 years of history"},{"id":24,"title":"Experience preparing Asiri Areeka","type":["Culinary Arts","Nature"],"duration":null,"description":"Experience preparing the authentic Asiri Areeka dish with a chef specializing in southern cuisine."},{"id":25,"title":"Experience Asiri cuisine at the historic lodge","type":["Culinary Arts"],"duration":null,"description":"Enjoy the Asiri cooking experience and participate in preparation with Chef Maha Al-Mutahmi at historic lodge in the heart of nature."},{"id":27,"title":"Experience live cooking and stay in a country lodge","type":["Culinary Arts","Nature"],"duration":null,"description":"Experience the cuisine of Aseer to learn the most prominent Asiri dishes and participate in their preparation with Chef Maha Al-Mutahmi, and stay overnight in a rural lodge in the heart of nature."},{"id":28,"title":"Discover the varieties of Asiri honey (with a tour guide)","type":["Culinary Arts","Nature"],"duration":null,"description":"Discover the varieties of Aseerr honey at the Honey Hut in Rijal Almaa and enjoy exploring this magnificent tourist attraction."},{"id":29,"title":"Experience visiting the Asiri coffee farms in Rijal Almaa","type":["Culinary Arts","Nature"],"duration":null,"description":"Visiting the Asiri coffee farms in Rijal Almaa and learning about the mechanisms of harvesting and roasting it"},{"id":31,"title":"Majles Al asass Experience","type":["Culinary Arts"],"duration":null,"description":"\"A live cooking experience featuring traditional dishes from the Aseer region, showcasing authentic flavors and local culture\""},{"id":32,"title":"Gyrocopter Experience","type":["Adventures"],"duration":null,"description":"A unique aerial experience Above Aseer Coast , offering stunning panoramic views"},{"id":33,"title":"Mountain Hiking Trip in Alquroon Trail","type":["Adventures"],"duration":null,"description":"A mountain trail that takes you through the breathtaking nature"},{"id":34,"title":"Live Cooking of Asiri Haneeth – A Break from Routine","type":["Culinary Arts"],"duration":null,"description":"The experience of cooking *Haneeth* outdoors is a beautiful escape from the hustle and bustle of life into a serene atmosphere filled with comfort and privacy"},{"id":35,"title":"Aseeri Flower Crown Experience","type":["Heritage and Arts"],"duration":null,"description":"\"A unique experience to create a natural Asiri flower crown, reflecting the heritage and beauty\nof the Aseer region with creativity and elegance\""},{"id":36,"title":"Mountain Descent Adventure in Tanomah","type":["Adventures"],"duration":null,"description":"\"A mountain adventure in Tanumah highlands featuring rappelling—guided by professionals for a safe and unforgettable nature experience\""},{"id":37,"title":"abseiling Experience from Al-Soudah Mountain","type":["Adventures"],"duration":null,"description":"Mountain Adventure in Al-Soudah organized by a professional team with safety equipment, surrounded by stunning natural scenery"},{"id":38,"title":"Campfire and hike in mountains experience","type":["Adventures","Nature"],"duration":null,"description":"A camping adventure featuring hiking, campfire dinner, storytelling under the stars, followed by a special morning breakfast"},{"id":39,"title":"Exploration Experience in Rijal Almaa Village","type":["Heritage and Arts"],"duration":null,"description":"Exploring the historical Rijal Almaa village and shopping for local handicrafts to discover the beauty and heritage of the region"},{"id":40,"title":"Paragliding","type":["Adventures"],"duration":null,"description":"Get ready to soar to new heights with a paragliding experience! Discover the beauty of flying freely through clear skies and enjoy the gentle breeze and breathtaking views."},{"id":47,"title":"Hiking Adventure with Eva Travel","type":["Adventures","Nature"],"duration":null,"description":"An experience accompanied by a local guide, taking you on a journey through mountain trails across the peaks of the Aseer Mountains, where you can enjoy breathtaking natural views. Discover stunning landscapes and explore the authentic details of traditional mountain life"},{"id":48,"title":"Cycling Tour with Eva Travel","type":["Adventures"],"duration":null,"description":"A vibrant, adventure filled experience that takes you cycling through stunning natural landscapes along a dedicated bike trail"},{"id":49,"title":"Live Cooking experience with Eva Travel","type":["Culinary Arts"],"duration":null,"description":"Experience the authenticity of Aseeri cuisine in a unique traditional Haneeth cooking journey from lighting the firewood to tasting the final dish in a rich heritage setting. Unforgettable flavors and a cultural, hands-on experience with Eva Travel"},{"id":50,"title":"Al Qatt Al Aseeri experience with Eva Travel","type":["Heritage and Arts"],"duration":null,"description":"Discover the beauty of authentic Aseeri art and enjoy a creative experience inspired by Southern heritage colors, motifs, and stories brought to life by your own hands in a fun cultural atmosphere with Eva Travel"},{"id":51,"title":"Cooking Areekah","type":["Culinary Arts"],"duration":null,"description":"Immerse yourself in the experience of Aseer's most famous dish: (Areeka)"},{"id":52,"title":"Traditions of Saudi hospitality with a unique experience","type":["Heritage and Arts"],"duration":null,"description":"Immerse yourself in the rich traditions of Saudi hospitality with a unique experience in the heart of Aseer Region"},{"id":53,"title":"Abseiling Tanomah","type":["Adventures"],"duration":null,"description":"an unforgettable journey through the enchanting southern region of Saudi Arabia, where rich culture"},{"id":56,"title":"Strawberry Farm","type":["Nature"],"duration":null,"description":"Experience the strawberry farm, featuring strawberry products such as juice, jam, chocolate, and bouquets"},{"id":57,"title":"Agricultural Trials Workshops","type":["Nature"],"duration":null,"description":"Interactive workshops for local residents within the experimentation zone to introduce visitors to the fundamentals of agriculture"},{"id":58,"title":"Al-Qatt Al-Asiri","type":["Heritage and Arts"],"duration":null,"description":"A workshop on traditional colors and patterns where visitors discover the aesthetics of Al-Qatt Al-Aseeri"},{"id":59,"title":"Grain grinding","type":["Culinary Arts"],"duration":null,"description":"A rural station explaining grain-grinding tools and how they were used in daily life in the past"},{"id":60,"title":"The Honey Experiment","type":["Nature"],"duration":null,"description":"An Aseer beekeeper experience at the \"Honey House,\" featuring an introduction to the varieties of Aseer honey and the chance to wear beekeeping gear"},{"id":61,"title":"The Little Farmer","type":["Nature"],"duration":null,"description":"A comprehensive agricultural experience for children, starting with selecting the soil and learning the steps of planting and plant care"},{"id":62,"title":"Entering the Heritage House","type":["Heritage and Arts"],"duration":null,"description":"An admission ticket to experience the Heritage House, including its museum, the \"Nineties Majlis,\" and indoor rural experiences"},{"id":63,"title":"Live a Cooking Experience and learn how to make authentic dishes","type":["Culinary Arts"],"duration":null,"description":"Experience a unique cooking and dining experience with authentic Aseeri cuisine at my home"},{"id":64,"title":"Asiri Rose Headband Maker Experience","type":["Heritage and Arts","Nature"],"duration":null,"description":"At my garden, Immerse yourself in a unique and exhilarating Rose headband experience in the heart of Aseer"},{"id":65,"title":"Mountain hiking","type":["Adventures"],"duration":null,"description":"We take you on a magical tour of the Aseer region to enjoy the most wonderful experiences"}]
EVENTS: [{"id":20,"title":"View Mirrors","description":"Maraya is an ideal destination to enjoy the beauty of Abha’s atmosphere and is located in a strategic place overlooking Abha. The stunning surroundings and pleasant climate make it a perfect spot for relaxation and rejuvenation. Visitors can immerse themselves in the picturesque views and serene environment, which provide a delightful escape from the hustle and bustle of everyday life. Maraya offers a unique vantage point to appreciate the natural charm and scenic landscapes that Abha is known for, making it a must-visit location for tourists and locals alike.","end_date":"2027-01-01"},{"id":25,"title":"Dera Night","description":"The event is characterized by a charming winter atmosphere. Where visitors can enjoy the fire and self-grilling amidst the picturesque nature. There will be time to contemplate the stars and the moon once it is full. This adds a special charm to the atmosphere and allows visitors a unique experience. It is also accompanied by a live flute playing, a Camels riding experience, and a presentation of local plants and ways to use them","end_date":"2027-01-01"},{"id":26,"title":"فعالية رمضانا","description":"<p>فعالية &quot;رمضانا&quot; المذهلة في قرية المفتاحة في أبها! انضم لتستمتع بأفضل الفنون الثقافية والأنشطة الرمضانية، تسوق، حرف يدويه، أنشطه للأطفال، مقاهي، ومطاعم واستمتع بأجواء رمضانية لطيفة.<br />\r\nاحجز تذاكرك الآن ولا تفوت الفرصة و استمتع بتجربة رمضانية لا تُنسى.<br />\r\nالدخول مجاناً لمن دون ١٢ سنة</p>","end_date":null},{"id":46,"title":"Valley Summer","description":"The “Summer of the Valley” event is full of entertaining and interactive activities targeting all family members in the embrace of nature and the beauty of the place, and aims to provide a rural agricultural experience in the embrace of nature to be a fun and exciting experience for everyone.\r\n The event includes a variety of walks between fruit farms and strawberry and raspberry halls, and activities such as fun games, musical performances, workshops, and competitions.\r\n The event also includes designated areas for children, where they can enjoy various games and movement activities, in addition to cartoon character shows.","end_date":"2027-01-01"},{"id":47,"title":"Mirrors","description":"Maraya is an ideal destination to enjoy the beauty of Abha’s atmosphere and is located in a strategic place overlooking Abha. The stunning surroundings and pleasant climate make it a perfect spot for relaxation and rejuvenation. Visitors can immerse themselves in the picturesque views and serene environment, which provide a delightful escape from the hustle and bustle of everyday life. Maraya offers a unique vantage point to appreciate the natural charm and scenic landscapes that Abha is known for, making it a must-visit location for tourists and locals alike.","end_date":"2027-01-01"},{"id":48,"title":"Alasbli Palaces","description":"Historical village that holds a lot of stories to tell in its walls. It has been renewed with maintaining the essence and authenticity of the buildings, and opened its doors for people to enjoy the combination of beauty and glory of this historical spot.","end_date":"2027-01-01"},{"id":53,"title":"Terra Aseer : Escape To The Village Of Joy","description":"Don’t miss this amazing experience! At the Village of Joy, visitors can indulge in thrilling physical activities like rock climbing, obstacle courses, and biking – both motorized and non-motorized. The farm offers fun, hands-on experiences for children to explore the outdoors. Enjoy a variety of sports such as soccer, horseback riding, and more. Treat yourself at the cafe featuring delectable dishes made by local women of the village. Don’t forget to visit the historical village too. Rediscover nature and community in this exploratory journey. Experience the Village of Joy – an unforgettable adventure awaits!","end_date":"2027-01-01"},{"id":89,"title":"Talal Maddah Theater","description":"The theater is being brought back to life through concerts that showcase prominent Gulf artists in a vibrant musical setting.","end_date":null},{"id":92,"title":"Al-Adel Park","description":"Al-Adl Park is a peaceful space surrounded by green areas. It features an elegant entrance and a well-organized design, with a dedicated playground area for children, making it a suitable place for the whole family.","end_date":null}]

--- RULES ---
1. Output valid JSON only. No markdown formatting, no extra text before or after the JSON.
2. Pick appropriate items from the catalogs by matching the user's details.
3. Structure each day into exactly three periods: 'Morning', 'Afternoon', 'Evening'.
4. Inside each period, provide an 'items' array containing the activities for that period. You determine the order.
5. For Event items, set 'type' to 'event', and return 'itemId' and a scheduled 'time' as a time range (e.g., '09:00 AM - 11:00 AM').
6. For Restaurant items, set 'type' to 'restaurant', and return 'itemId' and 'mealType' (e.g. 'breakfast', 'lunch', 'dinner').
7. For Experience items, set 'type' to 'experience', and return 'itemId' and 'travelToNext'.
8. Limit each day to reasonable activities based on the trip style. For 'light' trip style, include EXACTLY 2 items/stops per day across all periods combined. For 'balanced', include EXACTLY 3 items/stops per day. For 'intensive', include EXACTLY 4 items/stops per day. Do NOT exceed these limits.
9. IMPORTANT: Your itinerary MUST include a mix of restaurants, experiences, and events. Ensure that you pick at least one restaurant and one experience per day.

--- JSON SCHEMA ---
{
  "planDetails": {
    "title": "Your Aseer Trip Plan",
    "totalDays": 7
  },
  "days": [
        {
          "dayLabel": "Day 1",
          "date": "Day 1 Date",
          "periods": [
            {
              "periodName": "Morning",
              "items": [
                { "type": "event", "itemId": 1, "time": "09:00 AM - 11:00 AM" },
                { "type": "restaurant", "itemId": 3, "mealType": "breakfast" },
                { "type": "experience", "itemId": 2, "travelToNext": { "duration": "15 min" } }
              ]
            },
            {
              "periodName": "Afternoon",
              "items": []
            },
            {
              "periodName": "Evening",
              "items": []
            }
          ]
        },
        {
          "dayLabel": "Day 2",
          "date": "Day 2 Date",
          "periods": [
            {
              "periodName": "Morning",
              "items": [
                { "type": "event", "itemId": 1, "time": "09:00 AM - 11:00 AM" },
                { "type": "restaurant", "itemId": 3, "mealType": "breakfast" },
                { "type": "experience", "itemId": 2, "travelToNext": { "duration": "15 min" } }
              ]
            },
            {
              "periodName": "Afternoon",
              "items": []
            },
            {
              "periodName": "Evening",
              "items": []
            }
          ]
        },
        {
          "dayLabel": "Day 3",
          "date": "Day 3 Date",
          "periods": [
            {
              "periodName": "Morning",
              "items": [
                { "type": "event", "itemId": 1, "time": "09:00 AM - 11:00 AM" },
                { "type": "restaurant", "itemId": 3, "mealType": "breakfast" },
                { "type": "experience", "itemId": 2, "travelToNext": { "duration": "15 min" } }
              ]
            },
            {
              "periodName": "Afternoon",
              "items": []
            },
            {
              "periodName": "Evening",
              "items": []
            }
          ]
        },
        {
          "dayLabel": "Day 4",
          "date": "Day 4 Date",
          "periods": [
            {
              "periodName": "Morning",
              "items": [
                { "type": "event", "itemId": 1, "time": "09:00 AM - 11:00 AM" },
                { "type": "restaurant", "itemId": 3, "mealType": "breakfast" },
                { "type": "experience", "itemId": 2, "travelToNext": { "duration": "15 min" } }
              ]
            },
            {
              "periodName": "Afternoon",
              "items": []
            },
            {
              "periodName": "Evening",
              "items": []
            }
          ]
        },
        {
          "dayLabel": "Day 5",
          "date": "Day 5 Date",
          "periods": [
            {
              "periodName": "Morning",
              "items": [
                { "type": "event", "itemId": 1, "time": "09:00 AM - 11:00 AM" },
                { "type": "restaurant", "itemId": 3, "mealType": "breakfast" },
                { "type": "experience", "itemId": 2, "travelToNext": { "duration": "15 min" } }
              ]
            },
            {
              "periodName": "Afternoon",
              "items": []
            },
            {
              "periodName": "Evening",
              "items": []
            }
          ]
        },
        {
          "dayLabel": "Day 6",
          "date": "Day 6 Date",
          "periods": [
            {
              "periodName": "Morning",
              "items": [
                { "type": "event", "itemId": 1, "time": "09:00 AM - 11:00 AM" },
                { "type": "restaurant", "itemId": 3, "mealType": "breakfast" },
                { "type": "experience", "itemId": 2, "travelToNext": { "duration": "15 min" } }
              ]
            },
            {
              "periodName": "Afternoon",
              "items": []
            },
            {
              "periodName": "Evening",
              "items": []
            }
          ]
        },
        {
          "dayLabel": "Day 7",
          "date": "Day 7 Date",
          "periods": [
            {
              "periodName": "Morning",
              "items": [
                { "type": "event", "itemId": 1, "time": "09:00 AM - 11:00 AM" },
                { "type": "restaurant", "itemId": 3, "mealType": "breakfast" },
                { "type": "experience", "itemId": 2, "travelToNext": { "duration": "15 min" } }
              ]
            },
            {
              "periodName": "Afternoon",
              "items": []
            },
            {
              "periodName": "Evening",
              "items": []
            }
          ]
        }
      ]
    }
```

# AI Response

```json
```json
{
  "planDetails": {
    "title": "Premium Intensive Aseer Trip for Couples",
    "totalDays": 7
  },
  "days": [
    {
      "dayLabel": "Day 1",
      "date": "2026-08-22",
      "periods": [
        {
          "periodName": "Morning",
          "items": [
            {
              "type": "restaurant",
              "itemId": 3,
              "mealType": "breakfast"
            },
            {
              "type": "experience",
              "itemId": 10,
              "travelToNext": {
                "duration": "30 min"
              }
            }
          ]
        },
        {
          "periodName": "Afternoon",
          "items": [
            {
              "type": "restaurant",
              "itemId": 13,
              "mealType": "lunch"
            }
          ]
        },
        {
          "periodName": "Evening",
          "items": [
            {
              "type": "restaurant",
              "itemId": 2,
              "mealType": "dinner"
            }
          ]
        }
      ]
    },
    {
      "dayLabel": "Day 2",
      "date": "2026-08-23",
      "periods": [
        {
          "periodName": "Morning",
          "items": [
            {
              "type": "restaurant",
              "itemId": 4,
              "mealType": "breakfast"
            },
            {
              "type": "experience",
              "itemId": 11,
              "travelToNext": {
                "duration": "45 min"
              }
            }
          ]
        },
        {
          "periodName": "Afternoon",
          "items": [
            {
              "type": "restaurant",
              "itemId": 5,
              "mealType": "lunch"
            }
          ]
        },
        {
          "periodName": "Evening",
          "items": [
            {
              "type": "restaurant",
              "itemId": 15,
              "mealType": "dinner"
            }
          ]
        }
      ]
    },
    {
      "dayLabel": "Day 3",
      "date": "2026-08-24",
      "periods": [
        {
          "periodName": "Morning",
          "items": [
            {
              "type": "restaurant",
              "itemId": 12,
              "mealType": "breakfast"
            },
            {
              "type": "experience",
              "itemId": 12,
              "travelToNext": {
                "duration": "60 min"
              }
            }
          ]
        },
        {
          "periodName": "Afternoon",
          "items": [
            {
              "type": "restaurant",
              "itemId": 8,
              "mealType": "lunch"
            }
          ]
        },
        {
          "periodName": "Evening",
          "items": [
            {
              "type": "event",
              "itemId": 47,
              "time": "06:00 PM - 09:00 PM"
            }
          ]
        }
      ]
    },
    {
      "dayLabel": "Day 4",
      "date": "2026-08-25",
      "periods": [
        {
          "periodName": "Morning",
          "items": [
            {
              "type": "restaurant",
              "itemId": 7,
              "mealType": "breakfast"
            },
            {
              "type": "experience",
              "itemId": 49,
              "travelToNext": {
                "duration": "30 min"
              }
            }
          ]
        },
        {
          "periodName": "Afternoon",
          "items": [
            {
              "type": "restaurant",
              "itemId": 1,
              "mealType": "lunch"
            }
          ]
        },
        {
          "periodName": "Evening",
          "items": [
            {
              "type": "restaurant",
              "itemId": 16,
              "mealType": "dinner"
            }
          ]
        }
      ]
    },
    {
      "dayLabel": "Day 5",
      "date": "2026-08-26",
      "periods": [
        {
          "periodName": "Morning",
          "items": [
            {
              "type": "restaurant",
              "itemId": 11,
              "mealType": "breakfast"
            },
            {
              "type": "experience",
              "itemId": 50,
              "travelToNext": {
                "duration": "20 min"
              }
            }
          ]
        },
        {
          "periodName": "Afternoon",
          "items": [
            {
              "type": "restaurant",
              "itemId": 9,
              "mealType": "lunch"
            }
          ]
        },
        {
          "periodName": "Evening",
          "items": [
            {
              "type": "event",
              "itemId": 53,
              "time": "05:00 PM - 09:00 PM"
            }
          ]
        }
      ]
    },
    {
      "dayLabel": "Day 6",
      "date": "2026-08-27",
      "periods": [
        {
          "periodName": "Morning",
          "items": [
            {
              "type": "restaurant",
              "itemId": 14,
              "mealType": "breakfast"
            },
            {
              "type": "experience",
              "itemId": 36,
              "travelToNext": {
                "duration": "40 min"
              }
            }
          ]
        },
        {
          "periodName": "Afternoon",
          "items": [
            {
              "type": "restaurant",
              "itemId": 18,
              "mealType": "lunch"
            }
          ]
        },
        {
          "periodName": "Evening",
          "items": [
            {
              "type": "restaurant",
              "itemId": 17,
              "mealType": "dinner"
            }
          ]
        }
      ]
    },
    {
      "dayLabel": "Day 7",
      "date": "2026-08-28",
      "periods": [
        {
          "periodName": "Morning",
          "items": [
            {
              "type": "restaurant",
              "itemId": 6,
              "mealType": "breakfast"
            },
            {
              "type": "experience",
              "itemId": 38,
              "travelToNext": {
                "duration": "50 min"
              }
            }
          ]
        },
        {
          "periodName": "Afternoon",
          "items": [
            {
              "type": "restaurant",
              "itemId": 10,
              "mealType": "lunch"
            }
          ]
        },
        {
          "periodName": "Evening",
          "items": [
            {
              "type": "event",
              "itemId": 20,
              "time": "06:00 PM - 08:30 PM"
            }
          ]
        }
      ]
    }
  ]
}
```
```

