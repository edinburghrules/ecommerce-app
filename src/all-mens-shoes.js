const SHOP_DATA = [
  {
    id: 1,
    title: 'Mens Shoes',
    routeName: 'mens-shoes',
    items: [
      {
        id: 1,
        name: "Men's Wool Runners",
        category: 'everyday-sneakers',
        features: [
          'Renewable Materials',
          'Machine Washable',
          'Minimises Odour',
          'Flexibly conforms to your movements',
        ],
        description:
          'Combining cozy ZQ Meri no wool and a bio-based water repellent shield, our rain-ready sneaker keeps your feet predictably dry in unpredictable weather.',
        delivery:
          'Free delivery and our 30 days, no questions asked return policy. Lightly worn shoes get donated to Soles4Souls.',
        care:
          'Pull out the insoles and laces. Slip your shoes into a delicates bag and toss them in the washing machine—gentle cycle with cold water with your favorite mild detergent. When they’re done, shake off any excess water and let them air dry.',
        images: {
          black:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/7b8k7jAF4b2Lzz42YpBYQO/1',
          navy:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/1bRf7x3NByrcpXwAMRReII/1',
          grey:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/1asfoA8T96201A3ODn2r4f/2',
        },
        price: 115,
      },
      {
        id: 2,
        name: "Men's Wool Hi Tops",
        category: 'hi-tops',
        features: [
          'Renewable Materials',
          'Machine Washable',
          'Minimises Odour',
          'Flexibly conforms to your movements',
        ],
        description:
          'Our wet-weather high top is made with ZQ Merino wool and a bio-based water repellent shield, so your feet stay dry and cozy no matter what the day brings.',
        delivery:
          'Free delivery and our 30 days, no questions asked return policy. Lightly worn shoes get donated to Soles4Souls.',
        care:
          'Pull out the insoles and laces. Slip your shoes into a delicates bag and toss them in the washing machine—gentle cycle with cold water with your favorite mild detergent. When they’re done, shake off any excess water and let them air dry.',
        images: {
          black:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/7oi07pv8cVyv0s5VDcAhDZ/1',
          navy:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/2B0h6umoZeNXMXDgtmwZuP/1',
          grey:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1608762607/production/colorway/en-US/images/6KReTwAZk7Nwf31ULaTGhj/2.png',
        },
        price: 130,
      },
      {
        id: 3,
        name: "Men's Dashers",
        category: 'running',
        features: [
          'Renewable Materials',
          'Machine Washable',
          'Minimises Odour',
          'Flexibly conforms to your movements',
        ],
        description:
          'Our most technical shoe yet, the Tree Dasher reimagines the traditional running shoe with natural materials engineered for serious performance.',
        delivery:
          'Free delivery and our 30 days, no questions asked return policy. Lightly worn shoes get donated to Soles4Souls.',
        care:
          'Pull out the insoles and laces. Slip your shoes into a delicates bag and toss them in the washing machine—gentle cycle with cold water with your favorite mild detergent. When they’re done, shake off any excess water and let them air dry.',
        images: {
          black:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/6kgfUpOcNV92xLt7zyGjyx/1',
          navy:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/on7BLN5Cl6mox03CRk5t7/1',
          grey:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/34IvJXErlMl9VEy0ydlWpZ/1',
        },
        price: 120,
      },
      {
        id: 4,
        name: "Men's Casuals",
        category: 'everyday',
        features: [
          'Renewable Materials',
          'Machine Washable',
          'Minimises Odour',
          'Flexibly conforms to your movements',
        ],
        description:
          'Soft for daily wear, this reimagined classic made with natural materials is all about balancing simplicity and exaggeration for versatile styling.',
        delivery:
          'Free delivery and our 30 days, no questions asked return policy. Lightly worn shoes get donated to Soles4Souls.',
        care:
          'Pull out the insoles and laces. Slip your shoes into a delicates bag and toss them in the washing machine—gentle cycle with cold water with your favorite mild detergent. When they’re done, shake off any excess water and let them air dry.',
        images: {
          black:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/73UsKoMMKAXH4xM3WLQp9h/1',
          white:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/2Xswa18ibWOhSh83IW2jrg/1',
          grey:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/7xIcdyn4O7a1sxmqACZxVL/1',
        },
        price: 95,
      },
      {
        id: 5,
        name: "Men's Loungers",
        category: 'slip-on',
        features: [
          'Renewable Materials',
          'Machine Washable',
          'Minimises Odour',
          'Flexibly conforms to your movements',
        ],
        description:
          'Prep for an unpredictable day with our minimalist slip-on made with soft, temperature regulating ZQ Merino wool.',
        delivery:
          'Free delivery and our 30 days, no questions asked return policy. Lightly worn shoes get donated to Soles4Souls.',
        care:
          'Pull out the insoles and laces. Slip your shoes into a delicates bag and toss them in the washing machine—gentle cycle with cold water with your favorite mild detergent. When they’re done, shake off any excess water and let them air dry.',
        images: {
          grey:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/7jGAH2iHfRR06VZ3Yguwzq/1',
          white:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/23HCsov9xcDKkcQtEDzovo/1',
        },
        price: 95,
      },
    ],
  },
  {
    id: 2,
    title: "Men's Apparel",
    routeName: 'mens-apparel',
    items: [
      {
        id: 1,
        name: "Men's T-Shirt",
        category: 't-shirt',
        features: [
          'Renewable Materials',
          'Machine Washable',
          'Minimises Odour',
          'Relaxed Fit',
        ],
        description:
          'Simply designed and soft to the touch, the TrinoXO™ Tee uses revolutionary natural materials like crab shells to reduce odor and stay fresh between washes.',
        delivery:
          'Free delivery and our 30 days, no questions asked return policy. Lightly worn shoes get donated to Soles4Souls.',
        care:
          'Machine wash 30°C. Do not bleach. Tumble dry low. Do not iron. Dryclean-able.',
        images: {
          grey:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/6G6D79cvmzN6r4VyTyiPed/1',
          black:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/5ZmnvkCMWHASqjISLSRc7q/1',
          white:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/3p9M9bMSRJrasjLKAUfsbL/1',
        },
        price: 45,
      },
      {
        id: 2,
        name: "Men's Sweater",
        category: 'sweater',
        features: [
          'Natural Materials',
          'Machine Washable',
          'Double Knit Structure',
        ],
        description:
          'An elevated cool-weather layer crafted with premium natural materials, the Wool Jumper is dense, cosy, and built to be your go-to year after year.The Wool Jumper is made of 100% ZQ Merino wool.',
        delivery:
          'Free delivery and our 30 days, no questions asked return policy. Lightly worn shoes get donated to Soles4Souls.',
        care: 'Dry clean only',
        images: {
          black:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/6xU6PsL1YHI98S1ClUiFhU/1',
          grey:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/1cyj6y3fXJZvcjeQsjCa1g/1',
        },
        price: 135,
      },
      {
        id: 2,
        name: "Men's Jacket",
        category: 'jacket',
        features: [
          'Natural & Recycled Materials',
          'Weather Repellent',
          'Animal Friendly fill',
        ],
        description:
          'Whereas outerwear usually relies on synthetic materials, the Trino™ Puffer leverages natural ones to become a casual and conscious cold-weather essential.',
        delivery:
          'Free delivery and our 30 days, no questions asked return policy. Lightly worn shoes get donated to Soles4Souls.',
        care:
          'Machine wash cold with like colours on gentle cycle. Line dry only. Only non-chlorine bleach when needed. Cool iron if needed. Do not use softener.',
        images: {
          green:
            'https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/2MLe26jB7kTd1y4Q2zzVRg/1',
        },
        price: 250,
      },
    ],
  },
];

export default SHOP_DATA;
