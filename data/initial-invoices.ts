import { Invoice } from "@/types/invoice";

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2026-001",
    clientName: "Zdenek Novak",
    clientEmail: "zdenek@techprague.cz",
    clientCompany: "TechPrague Labs",
    issueDate: "2026-05-10",
    dueDate: "2026-05-24",
    status: "Paid",
    items: [
      {
        id: "101",
        description: "Next.js 15 Frontend Development",
        quantity: 40,
        price: 85,
      },
      {
        id: "102",
        description: "Tailwind CSS Dashboard Styling",
        quantity: 15,
        price: 70,
      },
    ],
    totalAmount: 4450,
  },
  {
    id: "2",
    invoiceNumber: "INV-2026-002",
    clientName: "Elena Rostova",
    clientEmail: "elena@globalflow.io",
    clientCompany: "GlobalFlow Systems",
    issueDate: "2026-05-18",
    dueDate: "2026-06-01",
    status: "Pending",
    items: [
      {
        id: "201",
        description: "Telemetry SDK Integration",
        quantity: 25,
        price: 90,
      },
      {
        id: "202",
        description: "Prisma PostgreSQL Schema Audit",
        quantity: 10,
        price: 95,
      },
    ],
    totalAmount: 3200,
  },
  {
    id: "3",
    invoiceNumber: "INV-2026-003",
    clientName: "Marcus Vance",
    clientEmail: "marcus@vancecapital.com",
    clientCompany: "Vance Capital",
    issueDate: "2026-06-05",
    dueDate: "2026-06-19",
    status: "Paid",
    items: [
      {
        id: "301",
        description: "Full-Stack Performance Optimization",
        quantity: 30,
        price: 100,
      },
    ],
    totalAmount: 3000,
  },
];
