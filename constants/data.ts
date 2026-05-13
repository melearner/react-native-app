import { icons } from "./icons";

import dayjs from "dayjs";

export const tabs: AppTab[] = [
    { name: "index", title: "Home", icon: icons.home },
    { name: "subscriptions", title: "Subscriptions", icon: icons.wallet },
    { name: "insights", title: "Insights", icon: icons.activity },
    { name: "settings", title: "Settings", icon: icons.setting },
];

export const HOME_USER = {
    name: "Adrian | JS Mastery",
};

export const HOME_BALANCE = {
    amount: 2489.48,
    nextRenewalDate: dayjs().add(7, "day").toISOString(),
};

export const UPCOMING_SUBSCRIPTIONS: UpcomingSubscription[] = [
    {
        id: "spotify",
        icon: icons.spotify,
        name: "Spotify",
        price: 5.99,
        currency: "USD",
        daysLeft: 2,
    },
    {
        id: "notion",
        icon: icons.notion,
        name: "Notion",
        price: 12.0,
        currency: "USD",
        daysLeft: 4,
    },
    {
        id: "figma",
        icon: icons.figma,
        name: "Figma",
        price: 15.0,
        currency: "USD",
        daysLeft: 6,
    },
];


export const HOME_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "adobe-creative-cloud",
    icon: icons.adobe,
    name: "Adobe Creative Cloud",
    plan: "Teams Plan",
    category: "Design",
    paymentMethod: "Visa ending in 8530",
    status: "active",
    startDate: dayjs().subtract(2, "month").toISOString(),
    price: 77.49,
    currency: "USD",
    billing: "Monthly",
    renewalDate: dayjs().add(3, "day").toISOString(), // ✅ upcoming
    color: "#f5c542",
  },
  {
    id: "github-pro",
    icon: icons.github,
    name: "GitHub Pro",
    plan: "Developer",
    category: "Developer Tools",
    paymentMethod: "Mastercard ending in 2408",
    status: "active",
    startDate: dayjs().subtract(5, "month").toISOString(),
    price: 9.99,
    currency: "USD",
    billing: "Monthly",
    renewalDate: dayjs().add(5, "day").toISOString(), // ✅ upcoming
    color: "#e8def8",
  },
  {
    id: "claude-pro",
    icon: icons.claude,
    name: "Claude Pro",
    plan: "Pro Plan",
    category: "AI Tools",
    paymentMethod: "Amex ending in 1010",
    status: "paused",
    startDate: dayjs().subtract(1, "month").toISOString(),
    price: 20.0,
    currency: "USD",
    billing: "Monthly",
    renewalDate: dayjs().add(10, "day").toISOString(), // ❌ outside 7-day range
    color: "#b8d4e3",
  },
  {
    id: "canva-pro",
    icon: icons.canva,
    name: "Canva Pro",
    plan: "Yearly Access",
    category: "Design",
    paymentMethod: "Visa ending in 7784",
    status: "cancelled",
    startDate: dayjs().subtract(1, "year").toISOString(),
    price: 119.99,
    currency: "USD",
    billing: "Yearly",
    renewalDate: dayjs().add(15, "day").toISOString(),
    color: "#b8e8d0",
  },
];