'use strict';


function getCDNLink(cdn) {
  if (!cdn || cdn === 'undefined') {
    return '';
  }
  return cdn;
}

const cdnLink = getCDNLink(process.env.CDN_LINK);

//const assetsBasePath = process.env.NODE_ENV === 'production' ? cdnLink + '/static/assets' : '/static/assets';
const assetsBasePath = cdnLink + '/static/assets';
export const AssetPaths = {
  images: assetsBasePath + '/images',
  icons: assetsBasePath + '/images/icons',
  logos: assetsBasePath + '/images/logos',
  photos: assetsBasePath + '/images/photos',
  graphics: assetsBasePath + '/images/graphics',
  manifest: assetsBasePath + '/images/manifest',
  thirdParty: assetsBasePath + '/third-party',
  files: assetsBasePath + '/files'
};

export const googleMapApiKey = "AIzaSyA79jvXc3wmdMJ4TWUZzHkT96bqV84J-M4";

export const getGoogleMapUrl = function () {
  return "https://maps.googleapis.com/maps/api/js?key=" + googleMapApiKey + "&center=56.85257634992253,4.825155639648404&zoom=2&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:geometry.fill%7Ccolor:0xcde2ff&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.country%7Ccolor:0x4db6ee&style=feature:administrative.country%7Celement:geometry.fill%7Ccolor:0x4db6ee%7Csaturation:-100%7Clightness:-100&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:administrative.province%7Celement:geometry.fill%7Ccolor:0x4db6ee&style=feature:landscape.man_made%7Celement:geometry.fill%7Ccolor:0x4db6ee&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:geometry.fill%7Ccolor:0xf2f9ff%7Cweight:0.5&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=480x360"
}

export const why = {
  title: "Back to Back #1 Winners",
  subtext: "A secure profile that enables shoppers to own their complete purchase data, giving the power back to the customer and rewarding them financially.",
  video: {
    videoSrc: "https://player.vimeo.com/video/252344390?autoplay=1&loop=1"
  }
};

export const increaseConversions = {
  title: "Increase Conversions",
  subtext: "Using next-gen A.I. and blockchain technology, Shopin enables retailers to better understand and serve their customers."
};

export const mission = {
  title: "The Shopin Vision",
  subtext: "Shopin unites retailers and their customers through personalized data intelligence for an unprecedented shopping experience. We are creating a more sustainable retail economy where retailers become stronger by working together and shoppers get rewarded based on the value of their data that they fully own, control, and can share.",
  content1: "Revitalize the retail industry with a new economy of data to increase transactional conversions.",
  content2: "Enable a greater understanding of customers based on a full view of their purchase history, style, preference, and pricing.",
  content3: "Exchange fair value to shoppers for access to their data via cryptocurrency.",
  content4: "Give back to the Ethereum community for continued and sustainable growth.",
  video: {
    title: "Eran Eyal",
    subtitle: "(CEO and CoFounder)",
    description: "About Shopin in Blockchain at the Economic Forum 2017",
    placeholderSrc: `${AssetPaths.photos}/video.png`,
    videoSrc: "https://player.vimeo.com/video/256153792?autoplay=1&loop=1"
    /*
        format : https://www.youtube.com/embed/video_id?querystringParams
        querystringParams documentation https://developers.google.com/youtube/player_parameters
        autoplay=1 starts the video immediately without the need for a user to click on the youtube's play icon
        rel=0 does not show related videos
     */

  }
};

export const stats = {
  title: "Retail Pilot Success Stories",
  subtext: "Shopin recently collaborated with two well-known fashion and home-goods retailers for a pilot program that produced groundbreaking results. Each retailer invited their registered customers to create a Shopin profile, resulting in 719,000 sign-ups.",
  subtext1: "Based on personal shopper preferences and purchase data, Shopin was able to provide those registrants with curated recommendations, leading to a 22% lift in conversions, and yielding $14.7 million in additional sales. Of the shoppers who created a Shopin profile, 72,000 of them invited 65,000 additional new users to go through a Shopin onboarding.",
  cards: [
    {
      src: `${AssetPaths.photos}/2_2x.png`,
      title: "719,000   shopper   sign-ups"
    },
    {
      src: `${AssetPaths.photos}/3_2x.png`,
      title: "$14.7   million   incremental   sales   generated"
    },
    /*
    {
      src: `${AssetPaths.photos}/1_2x.png`,
      title: "Two 30-day retail pilots"
    },
    */
    {
      src: `${AssetPaths.photos}/4_2x.png`,
      title: "22%   transactional   conversion   lift"
    },
    {
      src: `${AssetPaths.photos}/5_2x.png`,
      title: "72,000   loyal   Shopin   users   onboarded   65,000   new   users"
    }
  ]
};

export const solutions = {
  title: "The   Shopin   Solution",
  subtext: "Shopin   is   reinvigorating   the   retail   economy   by     streamlining   the   entire   shopping   experience.   By     deploying blockchain   technology   to   store   value,   purchase,   and   profile   data,   we   are   scaling   to   facilitate   a   million transactions   per   second   that   empower   retailers   on   the   open   web   to   provide   a   decentralized   Amazon-like experience   with   recommendations   powered   by   A.I."
};

export const architecture = {
  title: "Blockchain   Architecture   Built   for   Mass   Consumer   Applications",
  subtext: ""
};

export const tokens = {
  title: "Token Sale",
  subtext: "Shopin’s Public Token Presale offers early participants an opportunity to acquire our tokens before the public token generation event and enjoy a bonus of 20% for the first 10MM, with no minimum requirement. This is a limited opportunity to pick up Shopin tokens at great value.",
  hardcap: "$10MM GOAL",
  goal: "$40MM GOAL",
  startDate: "1 September, 2017",
  endDate: "27 January, 2018",
}

export const roadmap = {
  title: "Company Roadmap",
  year: "2017",
  timeline: [{
    year: "2017",
    months: [{
      title: "February 2017",
      content: "Team Forms With Eran & Divakar<br />Solving a Retail Problem: Creating a Universal Shopper Profile to Improve Conversions"
    }, {
      title: "May 2017",
      content: "Ingestion Engine: Retailer Integration<br />Shopper Onboarding: UI/UX Alpha V0.1"
    }, {
      title: "June 2017",
      content: "Ingestion Engine: Launches V1.0<br />Standardization of Product Catalog Data V1.0"
    }, {
      title: "August 2017",
      content: "White Paper Published: Addition of Blockchain & Crypto Incentives<br />Ingestion Engine: Product Search Tool Built<br />Shopper Onboarding: App for Women Developed"
    }, {
      title: "September 2017",
      content: "Shopin Formed & Incorporated<br />Team Formed: Eran, Divakar, Jeremy, Vlad, Alexey, Abhi<br />Token Generation Presale Commences<br />Token Sale Website Launch V1.0"
    }, {
      title: "October 2017",
      content: "Shopper Onboarding: UI/UX Alpha V0.2"
    }, {
      title: "November 2017",
      content: "Team: 8 FTE Hired: 50% Located in Brooklyn NY, HQ<br />Branding: New Logo Unveiled<br />Events: Ethereum DEVCon 3, Cancun<br />Fundraising Roadshows: Singapore, Dubai, Switzerland, UK<br />Awards: d10e ICO pitch, voted #5 Top ICO"
    }, {
      title: "December 2017",
      content: "Recommendation Engine: Training A.I. Models<br />Shopper Onboarding: Wire Frame For Alpha V0.2<br />Testing: Reached 1MM+  Transaction Per Second Test With 96 Nodes w/iExec<br />Fundraising Roadshow: Switzerland"
    }]
  }, {
    year: "2018",
    months: [{
      title: "January 2018",
      content: "Product Development: Shopin Profile<br />Token Sale Website Launch V2.0<br />Shopin Website Relaunch<br />Events: NRF Big Show, NYC, NABTC Miami<br />Fundraising Roadshow: Hong Kong, South Korea"
    }, {
      title: "February 2018",
      content: "Product Development: Men’s & Women’s Onboarding Alpha V0.2<br />Recommendation Engine: Testing A.I. Models<br />Fundraising Roadshow: Japan, China, Singapore"
    }, {
      title: "March 2018",
      content: "Public Token Generation Event Commences<br />Implementation: BigChainDB<br />Integration: CommerceCloud<br />Shopper Profile: Visual Onboarding"
    }, {
      title: "April 2018",
      content: "Product Development: Onboarding App Alpha V.02 Completed<br />Mobile Native Apps: UI/UX Commences"
    }, {
      title: "May 2018",
      content: "Product Development: Android & iOS App<br />Recommendation Engine: Retailer Testing<br />Shopin Profile Ethereum Integration<br />Shopin Profile 1.2: Friends & Family Sending & Receiving Tokens Integration"
    }]
  }]
  /*
   "heading1": "Business Plan",
   "content1": "Integrate blockchain and smart contracts technology throughout the platform. Launch iOS and Android apps. File international patents.",
   "heading2": "Private Presale Announcement",
   "content2": "Allow tenants to reduce the amount of their own money they need to tie up in rental security deposits by paying a small monthly fee in tokens in lieu of paying full upfront security deposits.",
   "heading3": "Harvard University",
   "content3": "Launch of a payment system allowing users to make/receive payments for rent and other services on Rentberry platform in BERRY tokens.",
   "heading4": "Presale Ends",
   "content4": "Introduce Landlord and Tenants Scores that would be based on reviews, rental-related history and personal data saved on the blockchain.",
   "heading5": "Public Token Sale",
   "content5": "Expand across Europe and Asia. Offer a multi-language support. Partner with local credit bureaus and real estate companies."
   */
}

export const materials = {
  title: "Materials",
  subtext: "For   more   information   on   how   Shopin   is   revitalizing   the   retail   industry   by   building   a   decentralized   Amazon on   the   blockchain,   please   reference   these   additional   materials:",
  whitePaperTitle:"Whitepaper",
  pitchDeckTitle:"PitchDeck",
  tokenTitle:"Token Dynamics",
  whitePaperSubText:"The Shopin White Paper explains in-depth some of the key challenges facing the retail environment, and how Shopin’s decentralized shopper profile built on the blockchain is helping reboot retail with unprecedented advantages by shifting ownership of data back to the shopper. The White Paper further explores the overarching philosophy of the blockchain, the functionality of token economics, and Shopin’s efficiently streamlined architecture. This version is currently available in Chinese, Korean, Japanese, Russian, French, German, Italian, and Spanish.",
  pitchDeckSubText:"The Shopin Pitch Deck provides step-by-step insight on how the Shopin platform works, successful results from recent pilot demos, and our mission to create a more sustainable retail economy in which retailers become stronger by working together, and shoppers get rewarded based on the value of their data.",
  tokenSubText:"Token Dynamics explores the growth-driving concept of tokenomics and the purpose and functionality of the Shopin Token, how it helps invigorate the connection between retailer and shopper by building an economy of purchase data and data models, and how it can solve many retailer conversion, messaging, and marketing challenges.",
  list: [{ displayName: "Whitepaper", link: "https://shopin.docsend.com/view/b6iuqiu" },
  { displayName: "Pitchdeck", link: "https://shopin.docsend.com/view/7u35du2" },
  { displayName: "Token Dynamics", link: "https://shopin.docsend.com/view/fr2fwyi" }
  ],
  whitePaperLanguages:[
  {'language':'Chinese','fileName':'whitepaper_chineese.pdf'},  
  {'language':'Korean','fileName':'whitepaper_korean.pdf'},
  {'language':'Japanese','fileName':'whitepaper_japaneese.pdf'},    
  {'language':'Russian','fileName':'whitepaper_russian.pdf'},
  {'language':'French','fileName':'whitepaper_french.pdf'},
  {'language':'German','fileName':'whitepaper_german.pdf'},
  {'language':'Italian','fileName':'whitepaper_italian.pdf'},
  {'language':'Spanish','fileName':'whitepaper_spanish.pdf'}],
  whitePaperLinks:{
    "Eng": "https://shopin.docsend.com/view/b6iuqiu",
    "Chi":"whitepaper_chineese.pdf",
    "Kor":"whitepaper_korean.pdf",
    "Jap":"whitepaper_japaneese.pdf",
    "Rus":"whitepaper_russian.pdf",
    "Fre":"whitepaper_french.pdf",
    "Ger":"whitepaper_german.pdf",
    "Ita":"whitepaper_italian.pdf",
    "Spa":"whitepaper_spanish.pdf"
  }

}

export const technology = {
  title: "Shopin’s   Technology",
  subtext: "By   using   the   blockchain   to   store   value   and   data   in   a   decentralized   fashion,   the   shopper   is   in   control   of their   data.   When   shopper   permission   is   granted,   the   retailer   benefits   from   an   A.I.-powered recommendation   engine   based   on   actual   first-party   purchase   data   and   user-verified   preferences."
};

export const testimonials = {
  title: "What   They’re   Saying   About   Shopin",
  subtext: "Hear   directly   from   some   of   our   trusted   partners   how   Shopin   will   impact   the   retail   ecosystem.",
  videos: [
    {
      name: "David Drake",
      title: "",
      src: "https://player.vimeo.com/video/255015123?autoplay=1&loop=1",
      splash: `${AssetPaths.photos}/photo__david.png`
    },
    {
      name: "Brian Amoah",
      title: "",
      src: "https://player.vimeo.com/video/255120089?autoplay=1&loop=1",
      splash: `${AssetPaths.photos}/photo__brian.png`
    }
    /*
    {
      name: "Leonard Burgess",
      title: "Founder Nike",
      src: "https://www.youtube.com/embed/zGEg2FVC3tc?autoplay=1&rel=0",
      splash: `${AssetPaths.photos}/video_card.png`
    },
    {
      name: "Ernest Wade",
      title: "Founder Adidas",
      src: "https://www.youtube.com/embed/zGEg2FVC3tc?autoplay=1&rel=0",
      splash: `${AssetPaths.photos}/video_card.png`
    },
    {
      name: "Cody Stevenson",
      title: "Founder Saeco",
      src: "https://www.youtube.com/embed/zGEg2FVC3tc?autoplay=1&rel=0",
      splash: `${AssetPaths.photos}/video_card.png`
    }*/]
};

export const team = {
  title: "The Shopin Team",
  subtext: "Our team has more than 15 years experience in building ecommerce startups, behavioral marketing solutions, and user profiles. Shopin’s engineering team includes the first and core engineers that architected the entire Priceline system from launch. When it comes to ingesting millions of SKUs, normalizing data, user profiles, and serving up the best recommendations in an ecommerce environment, the Shopin pedigree speaks for itself. We're doing for online retail what we did for travel.",
  subtext1: "",
  members: [
    {
      name: "Eran Eyal",
      title: "CEO and CoFounder",
      bio: "Eran is a serial entrepreneur with three exits as a founder and more than a decade of experience in retail and ecommerce. He is the winner of the United Nations World Summit Award for Innovation, Fast Company’s Most Innovative Startup, and he is an investor and advisor for many startups.",
      src: `${AssetPaths.photos}/photo__eran.jpg`,
      linkedin:"https://www.linkedin.com/in/eraneyal/"
    },
    {
      name: "Divakar Rayapaty",
      title: "CTO and CoFounder",
      bio: "Divakar was a Principal Software Engineer at Priceline for 14 years. As a leading member of the engineering team, he was instrumental in building Priceline’s core processing platform. Since then, he was the CoFounder at Flowhealth, Director at Mezoclick, and CoFounder and CTO at Maker’s Brand.",
      src: `${AssetPaths.photos}/photo__divakar.png`,
      linkedin:"https://www.linkedin.com/in/divakar-rayapaty-b5774a1/"
    },
    {
      name: "Doron   Wesly",
      title: "CMO",
      bio: "Doron has extensive B2C and B2B marketing experience and has worked for companies such as Lotame, Tremor Video, Mindshare, Samsung, Millward Brown, IAB, and Applebee’s.",
      src: `${AssetPaths.photos}/photo__doron.png`,
      linkedin:"https://www.linkedin.com/in/doronwesly/"
    },

    /*{
      name: "Mike Rizzo",
      title: "VP of Product Development",
      bio: "Mike worked alongside Divakar for 14 years at Priceline, where he was the VP of engineering.",
      src: `${AssetPaths.photos}/photo__mike.png`
    },*/
    {
      name: "Jeremy Harkness",
      title: "Blockchain Technology Officer",
      bio: "Jeremy served as the CTO and Head of R&D at Barrows, the CTO at HP Ticket, and CTO and Founder of Strattice, where he invented the world’s first remotely managed mini server and failover router.",
      src: `${AssetPaths.photos}/photo__jeremy.jpg`,
      linkedin:"https://www.linkedin.com/in/jeremyharkness/"
    },
    {
      name: "Michael Herman",
      title: "CRO",
      bio: "Formerly President of Global Sales at Elie Tahari, Michael has spent the past 20 years in senior executive positions working with international luxury brands Natori, Donna Karan, DKNY, Wacoal, and Valentino.",
      src: `${AssetPaths.photos}/photo__micheal.jpg`,
      linkedin:"https://www.linkedin.com/in/michael-herman-06341a2/"
    },
    {
      name: "Abhishek Yermalla",
      title: "VP of Engineering",
      bio: "Abhi is a seasoned architect with more than 12 years of experience in ecommerce and engineering. Formerly a long-time member of the Priceline design and integrations team, he was twice awarded the annual CEO achievement award.",
      src: `${AssetPaths.photos}/photo__abhishek.jpg`,
      linkedin:"https://www.linkedin.com/abhishekyeramalla"
    },
    {
      name: "Lane   Campbell",
      title: " Strategy   and   Business   Development",
      bio: "Lane is a lifelong entrepreneur who has realized five exits in his career. He is a founding member of the Forbes Tech Council and the CTO and CoFounder of Humble Advisors, a wealth management firm for high net worth companies and individuals.",
      src: `${AssetPaths.photos}/photo_lane.jpg`,
      linkedin:"https://www.linkedin.com/in/lanec/"
    },
    {
      name: " Aaron   Latham",
      title: "Strategy   and   Business   Development",
      bio: "Aaron is an advisor and professional investor who has mentored dozens of startups with a focus on strategy, business development, and marketing. He is Managing Partner of Humble Advisors and a CoFounder of A.J. Tiger Ventures.",
      src: `${AssetPaths.photos}/photo_aaron.jpg`,
      linkedin:"https://www.linkedin.com/in/aaron-latham-517b5613/"
    },
    {
      name: " Bremelin   Romero",
      title: "EA   &   Office   Manager",
      bio: "Bremelin is a former freelance journalist for The New York Times Group and the Kathmandu Post. She is a multidisciplinary professional who brings international trade and communications experience to the Shopin team.",
      src: `${AssetPaths.photos}/photo__brem.png`,
      linkedin:"https://www.linkedin.com/in/bremelin-romero-9a305056/"
    },
    {
      name: "Vladimir Ustinov",
      title: "Senior Engineer",
      bio: "Vladimir has served as a senior engineer at Maker’s Brand, Flow Health, EigenGraph, and other technology startups. He holds a Master's Degree in Radio Physics and has a strong data mining and numeric analysis background.",
      src: `${AssetPaths.photos}/photo__vladimir_2.jpg`,
      linkedin:"https://www.linkedin.com/in/vladimir-ustinov-840a0697/"
    },
    {
      name: "Alexey Kulyukin",
      title: "Senior Engineer",
      bio: "Alexey served as a front-end engineer at Maker’s Brand and as the backend engineer at Flow Health. Prior to his startup career, he was formerly Head of Department at Tomsk Polytechnic University.",
      src: `${AssetPaths.photos}/photo__alexey.png`,
      linkedin:"https://www.linkedin.com/in/akulyukin/"

    }
  ]
};

export const advisors = {
  title: "Strategic Advisors",
  subtext: "Shopin   is   proud   to   be   supported   by   industry   experts   in   retail   and   the   startup   and   crypto   communities.",
  members: [{
    name: "Tom   Gonser",
    title: "",
    bio: "Tom is the Founder of tech unicorn DocuSign. He is an investor in Shopin as well as the GP at Seven Peaks Ventures. Tom brings the maturity of building a powerful business brand from startup to massive growth.",
    src: `${AssetPaths.photos}/photo_Tom.jpeg`,
    linkedin:"https://www.linkedin.com/in/tgonser/"
  },
  {
    name: "Steven Nerayoff",
    title: "",
    bio: "Steven is the architect of the Ethereum ICO an inventor of Gas for Ethereum, Founder and CEO of Maple Ventures, CoFounder of Alchemist Ventures, and Founder and CEO of Cloudparc.",
    src: `${AssetPaths.photos}/photo__steven.png`,
    linkedin:"https://www.linkedin.com/in/nerayoff/"
  },
  {
    name: "Amadeo   Brenninkmeijer",
    title: "",
    bio: "Amadeo is an accomplished angel investor with a strong background in retail healing from the C&A family. Including Shopin, he is an investor in more than 40 startups, and he is currently a Venture Partner at Space Angels, the world's only venture capital fund managed by space industry experts.",
    src: `${AssetPaths.photos}/photo_Amadeo.jpg`,
    linkedin:"https://www.linkedin.com/in/amadeobee/"
  },
  {
    name: " Parveen   Panwar",
    title: "",
    bio: "Parveen is an international serial entrepreneur with extensive online video and management experience focused on realizing the financial potential of interactive media. An early pioneer in video/content audience extension, he is currently CEO of Oculu, an all-inclusive video tech platform.",
    src: `${AssetPaths.photos}/photo_parveen.jpg`,
    linkedin:"https://www.linkedin.com/in/ppanwar/"
  },
  {
    name: "David   Drake",
    title: "",
    bio: "David is Managing Partner of LDJ Fund. He is a board member and advisor at several blockchain companies and deeply entrenched in the crowdfunding community, with a goal of constantly driving the industry forward. ",
    src: `${AssetPaths.photos}/photo__david.png`,
    linkedin:"https://www.linkedin.com/in/ldjcapital/"
  },
  {
    name: "Jeff Pulver",
    title: "",
    bio: "Jeff is an investor in more than 350 startups. He is the Founder of MoNage and Alchemist Ventures, and he is a VoIP pioneer who is often credited as the grandfather of the VoIP industry.",
    src: `${AssetPaths.photos}/photo__jeff.png`,
    linkedin:"https://www.linkedin.com/in/jpulver/"
  },
  {
    name: "Sampo Parkkinen",
    title: "",
    bio: "Sampo is the Founder of RapidBlue (acquired by Shoptrakker), and CEO of Revieve in Chicago. Sampo is an early seed investor in Shopin and an incredible supporter.",
    src: `${AssetPaths.photos}/photo__sampo.png`,
    linkedin:"https://www.linkedin.com/in/sampo-parkkinen-b3262a6/"
  },
  {
    name: "Garrette   Furo",
    title: "",
    bio: "Garrette is a cryptocurrency native who has been active in the space since 2012 as a miner and later as a trader and consultant on blockchain technology and cryptocurrency.",
    src: `${AssetPaths.photos}/photo__garette.png`,
    linkedin:"https://www.linkedin.com/in/garrettefuro/"
  },
  {
    name: " Nathan   Low",
    title: "",
    bio: "Nathan is a serial angel investor with keen insight on adtech. He has invested in more than 120 startups to date, including Shopin. Nathan is the President of Sunrise Financial Group and the CoFounder of IBM AlphaZone, the first and only high-tech accelerator in Israel.",
    src: `${AssetPaths.photos}/photo_Nathan.jpg`,
    linkedin:"https://www.linkedin.com/in/nathan-low-8295934a/"
  },
  {
    name: "Moshe Bellows",
    title: "",
    bio: "Moshe is an early investor in Shopin and a well-known angel investor who serves on several NYC and Israeli startup boards. Moshe’s network in the retail world is broad and he has opened many doors for Shopin.",
    src: `${AssetPaths.photos}/photo___moshe.png`,
    linkedin:"https://www.linkedin.com/in/moshebellows/"
  }
  ]
}

export const logos = [
  "dillard.svg",
  "j_crew.svg",
  "gap.svg",
  "kenneth_cole.svg",
  "all_saints.svg"
]

//const endPoint = process.env.NODE_ENV === 'production' ? process.env.ICO_Endpoint : "http://api.shopin.com";
const endPoint = process.env.ICO_Endpoint || 'http://localhost:3000';
export const apiUrls={
  "funding":   endPoint + '/contributions',
  "backendServiceUrl": endPoint,
  "investors": "/investors",
  "latestRandomInvestors": "/investors/latest"
}

export const cardClass = ['card-one', 'card-two', 'card-three', 'card-four',
  'card-five', 'card-six', 'card-seven', 'card-eight', 'card-nine'];

export const videoClass = ['video-one', 'video-two', 'video-three', 'video-four']


export const placeHolderStore =
  {
    "countryWiseDist": {},
    "totalValDist": {
      "contributionTarget": 50000000,
      "totalContributed": 10017224.95,
      "currencyWiseContributions": {
        "BTC": {
          "valContributed": 0,
          "unitsContributed": 251.65,
          "sellPrice": 8814.639817474
        },
        "ETH": {
          "valContributed": 0,
          "unitsContributed": 10972.026,
          "sellPrice": 366.430220464
        },
        "USD": {
          "valContributed": 0,
          "unitsContributed": 350000,
          "sellPrice": 1
        }
      },
      "currencyUnit": "USD"
    }
  };

  export const formSuccessPrompt = "Thanks for your support !";
  export const formErrorPrompt = "We are facing some issues...please try again later"

  export const formErrorMsg = {
    "firstName":"Incorrectly entered first name",
    "lastName":"Incorrectly entered last name",
    "emailId":"Incorrectly entered e-mail",
    "duplicateEmail": "Participant with this email already exists!"
  }

export const notifyDuration = {
  closeToastr:5000,
  showNewNotification:7000
}
export const currencyType = {
  'ETH':'ETH',
  'BTC':'Bitcoins'
}