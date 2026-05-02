"use client";

import { ChartCard } from "@/components";

const mockData = {
  charts: [
    {
      types: ["bar", "treemap"],
      data: [
        {
          Category: "Books & Stationery",
          value: 388.5,
        },
        {
          Category: "Shoes & Footwear",
          value: 491,
        },
        {
          Category: "Kitchen Appliances",
          value: 251,
        },
        {
          Category: "Kids' Clothing",
          value: 397.8,
        },
        {
          Category: "Skincare",
          value: 514.6666666666666,
        },
        {
          Category: "Laptops & Computers",
          value: 328,
        },
        {
          Category: "Automotive",
          value: 421.66666666666663,
        },
        {
          Category: "Fitness Equipment",
          value: 703.3333333333334,
        },
        {
          Category: "Health & Wellness",
          value: 268.3333333333333,
        },
        {
          Category: "Cleaning Supplies",
          value: 391.3333333333333,
        },
        {
          Category: "Cycling",
          value: 799.3333333333334,
        },
        {
          Category: "Team Sports",
          value: 523.5,
        },
        {
          Category: "Smartphones",
          value: 449.25,
        },
        {
          Category: "Women's Clothing",
          value: 518.8,
        },
        {
          Category: "Bedding & Bath",
          value: 453,
        },
        {
          Category: "Grooming Tools",
          value: 702.5,
        },
        {
          Category: "Clothing & Apparel",
          value: 858,
        },
        {
          Category: "Furniture",
          value: 689,
        },
        {
          Category: "Sports & Outdoors",
          value: 396.6666666666667,
        },
        {
          Category: "Fragrances",
          value: 477.5,
        },
        {
          Category: "Haircare",
          value: 681.6666666666666,
        },
        {
          Category: "Fishing & Hunting",
          value: 100,
        },
        {
          Category: "Office Supplies",
          value: 465.2,
        },
        {
          Category: "Home Decor",
          value: 782.5,
        },
        {
          Category: "Camping & Hiking",
          value: 612.6666666666666,
        },
        {
          Category: "Beauty & Personal Care",
          value: 278.5,
        },
        {
          Category: "Cameras & Accessories",
          value: 444.5,
        },
        {
          Category: "Men's Clothing",
          value: 464.5,
        },
        {
          Category: "Accessories (Bags, Hats, Belts)",
          value: 206,
        },
        {
          Category: "Smartwatches",
          value: 32,
        },
        {
          Category: "Makeup",
          value: 257.5,
        },
        {
          Category: "Home & Kitchen",
          value: 367.5,
        },
      ],
      title: "نمودار Category - Price",
    },
    {
      types: ["bar", "treemap"],
      data: [
        {
          Category: "Books & Stationery",
          value: 536.75,
        },
        {
          Category: "Shoes & Footwear",
          value: 222.5,
        },
        {
          Category: "Kitchen Appliances",
          value: 857.3333333333334,
        },
        {
          Category: "Kids' Clothing",
          value: 609.8,
        },
        {
          Category: "Skincare",
          value: 541.6666666666666,
        },
        {
          Category: "Laptops & Computers",
          value: 687,
        },
        {
          Category: "Automotive",
          value: 494.99999999999994,
        },
        {
          Category: "Fitness Equipment",
          value: 787.3333333333334,
        },
        {
          Category: "Health & Wellness",
          value: 544.6666666666666,
        },
        {
          Category: "Cleaning Supplies",
          value: 552.3333333333333,
        },
        {
          Category: "Cycling",
          value: 368,
        },
        {
          Category: "Team Sports",
          value: 496.5,
        },
        {
          Category: "Smartphones",
          value: 661.5,
        },
        {
          Category: "Women's Clothing",
          value: 437.4,
        },
        {
          Category: "Bedding & Bath",
          value: 596.5,
        },
        {
          Category: "Grooming Tools",
          value: 588.5,
        },
        {
          Category: "Clothing & Apparel",
          value: 912,
        },
        {
          Category: "Furniture",
          value: 339.5,
        },
        {
          Category: "Sports & Outdoors",
          value: 645.3333333333334,
        },
        {
          Category: "Fragrances",
          value: 508,
        },
        {
          Category: "Haircare",
          value: 694,
        },
        {
          Category: "Fishing & Hunting",
          value: 802,
        },
        {
          Category: "Office Supplies",
          value: 477.8,
        },
        {
          Category: "Home Decor",
          value: 246.5,
        },
        {
          Category: "Camping & Hiking",
          value: 221.33333333333331,
        },
        {
          Category: "Beauty & Personal Care",
          value: 715.5,
        },
        {
          Category: "Cameras & Accessories",
          value: 548,
        },
        {
          Category: "Men's Clothing",
          value: 698,
        },
        {
          Category: "Accessories (Bags, Hats, Belts)",
          value: 677,
        },
        {
          Category: "Smartwatches",
          value: 208,
        },
        {
          Category: "Makeup",
          value: 334.5,
        },
        {
          Category: "Home & Kitchen",
          value: 580,
        },
      ],
      title: "نمودار Category - Stock",
    },
    {
      types: ["bar", "treemap"],
      data: [
        {
          Currency: "USD",
          value: 451.1900000000001,
        },
      ],
      title: "نمودار Currency - Price",
    },
    {
      types: ["bar", "treemap"],
      data: [
        {
          Currency: "USD",
          value: 545.7100000000002,
        },
      ],
      title: "نمودار Currency - Stock",
    },
    {
      types: ["bar", "treemap"],
      data: [
        {
          Size: "Large",
          value: 360.5,
        },
        {
          Size: "8x10 in",
          value: 396.1111111111111,
        },
        {
          Size: "XS",
          value: 256,
        },
        {
          Size: "L",
          value: 386.00000000000006,
        },
        {
          Size: "100x200 mm",
          value: 601,
        },
        {
          Size: "30x40 cm",
          value: 404,
        },
        {
          Size: "S",
          value: 409.25,
        },
        {
          Size: "Medium",
          value: 330.14285714285717,
        },
        {
          Size: "Extra Large",
          value: 533.4444444444445,
        },
        {
          Size: "XXL",
          value: 514.6666666666666,
        },
        {
          Size: "5x7 in",
          value: 473.44444444444446,
        },
        {
          Size: "XL",
          value: 711.8,
        },
        {
          Size: "10x10 cm",
          value: 232.5,
        },
        {
          Size: "M",
          value: 366.5,
        },
        {
          Size: "50x70 cm",
          value: 599,
        },
        {
          Size: "Small",
          value: 543.2,
        },
        {
          Size: "12x18 in",
          value: 650.75,
        },
      ],
      title: "نمودار Size - Price",
    },
    {
      types: ["bar", "treemap"],
      data: [
        {
          Size: "Large",
          value: 425.25,
        },
        {
          Size: "8x10 in",
          value: 469.77777777777777,
        },
        {
          Size: "XS",
          value: 669.6666666666666,
        },
        {
          Size: "L",
          value: 529.3,
        },
        {
          Size: "100x200 mm",
          value: 754.6666666666666,
        },
        {
          Size: "30x40 cm",
          value: 485,
        },
        {
          Size: "S",
          value: 528.2500000000001,
        },
        {
          Size: "Medium",
          value: 539.7142857142857,
        },
        {
          Size: "Extra Large",
          value: 436,
        },
        {
          Size: "XXL",
          value: 603.3333333333334,
        },
        {
          Size: "5x7 in",
          value: 648.5555555555555,
        },
        {
          Size: "XL",
          value: 440,
        },
        {
          Size: "10x10 cm",
          value: 632.3333333333334,
        },
        {
          Size: "M",
          value: 589.5,
        },
        {
          Size: "50x70 cm",
          value: 526.8,
        },
        {
          Size: "Small",
          value: 614.4,
        },
        {
          Size: "12x18 in",
          value: 544.5,
        },
      ],
      title: "نمودار Size - Stock",
    },
    {
      types: ["bar", "treemap"],
      data: [
        {
          Availability: "pre_order",
          value: 350.44,
        },
        {
          Availability: "in_stock",
          value: 518.2,
        },
        {
          Availability: "discontinued",
          value: 433.41666666666663,
        },
        {
          Availability: "limited_stock",
          value: 446.17647058823525,
        },
        {
          Availability: "out_of_stock",
          value: 606.5999999999999,
        },
        {
          Availability: "backorder",
          value: 446.37500000000006,
        },
      ],
      title: "نمودار Availability - Price",
    },
    {
      types: ["bar", "treemap"],
      data: [
        {
          Availability: "pre_order",
          value: 518.6399999999999,
        },
        {
          Availability: "in_stock",
          value: 569.7,
        },
        {
          Availability: "discontinued",
          value: 625.5,
        },
        {
          Availability: "limited_stock",
          value: 524.3529411764707,
        },
        {
          Availability: "out_of_stock",
          value: 522.5,
        },
        {
          Availability: "backorder",
          value: 535.3749999999999,
        },
      ],
      title: "نمودار Availability - Stock",
    },
    {
      types: ["pie"],
      data: [
        {
          Size: "Large",
          value: 4,
        },
        {
          Size: "8x10 in",
          value: 9,
        },
        {
          Size: "XS",
          value: 3,
        },
        {
          Size: "L",
          value: 10,
        },
        {
          Size: "100x200 mm",
          value: 3,
        },
        {
          Size: "30x40 cm",
          value: 3,
        },
        {
          Size: "S",
          value: 8,
        },
        {
          Size: "Medium",
          value: 7,
        },
        {
          Size: "Extra Large",
          value: 9,
        },
        {
          Size: "XXL",
          value: 6,
        },
        {
          Size: "5x7 in",
          value: 9,
        },
        {
          Size: "XL",
          value: 5,
        },
        {
          Size: "10x10 cm",
          value: 6,
        },
        {
          Size: "M",
          value: 4,
        },
        {
          Size: "50x70 cm",
          value: 5,
        },
        {
          Size: "Small",
          value: 5,
        },
        {
          Size: "12x18 in",
          value: 4,
        },
      ],
      title: "نمودار Size",
    },
    {
      types: ["pie"],
      data: [
        {
          Availability: "pre_order",
          value: 25,
        },
        {
          Availability: "in_stock",
          value: 20,
        },
        {
          Availability: "discontinued",
          value: 12,
        },
        {
          Availability: "limited_stock",
          value: 17,
        },
        {
          Availability: "out_of_stock",
          value: 10,
        },
        {
          Availability: "backorder",
          value: 16,
        },
      ],
      title: "نمودار Availability",
    },
  ],
};

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2">
      {mockData.charts.map((chart) => (
        <ChartCard
          key={chart.title}
          title={chart.title}
          data={chart.data}
          types={chart.types}
        />
      ))}
    </div>
  );
};

export default DashboardPage;
