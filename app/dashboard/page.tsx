"use client";

import { BarChart, ChartCard } from "@/components";
import { Button, Card, Tabs } from "@heroui/react";
import { EllipseIcon, EllipsisIcon } from "lucide-react";

const data = [
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
];

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2">
      <ChartCard
        data={data}
        title="متن تستی برای چارت"
        types={["bar", "treemap"]}
      />
    </div>
  );
};

export default DashboardPage;
