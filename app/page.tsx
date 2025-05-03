"use client";

import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoice";
import { INITIAL_INVOICES } from "@/data/initial-invoices";
import { InvoiceCard } from "@/components/invoice-card";
import { Receipt, Search, Plus, Filter, X } from "lucide-react";

export default function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Pending">(
    "All",
  );
  const [isMounted, setIsMounted] = useState(false);

  // Print Modal State
  const [printingInvoice, setPrintingInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggleStatus = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          return { ...inv, status: inv.status === "Paid" ? "Pending" : "Paid" };
        }
        return inv;
      }),
    );
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || inv.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const totalRevenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce((acc, i) => acc + i.totalAmount, 0);
  const pendingAmount = invoices
    .filter((i) => i.status === "Pending")
    .reduce((acc, i) => acc + i.totalAmount, 0);

  const formatCurrency = (val: number) => {
    if (!isMounted) return `$${val}`;
    return `$${val.toLocaleString("en-US")}`;
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      {/* Header (No print) */}
      <header className="no-print h-16 border-b border-slate-800 bg-[#121828]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/20">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none text-slate-100">
              InvoicePro
            </h1>
            <span className="text-[10px] text-slate-400 font-medium">
              Billing & Client Management
            </span>
          </div>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md shadow-blue-600/20">
          <Plus className="w-4 h-4" />
          <span>New Invoice</span>
        </button>
      </header>

      {/* Main App Content (No print) */}
      {!printingInvoice && (
        <main className="no-print flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#121828] border border-slate-800 rounded-2xl p-5 shadow-xl">
              <span className="text-xs text-slate-400 font-medium">
                Total Invoices
              </span>
              <div className="text-2xl font-black text-slate-100 mt-1">
                {invoices.length}
              </div>
            </div>
            <div className="bg-[#121828] border border-slate-800 rounded-2xl p-5 shadow-xl border-t-4 border-t-emerald-500">
              <span className="text-xs text-slate-400 font-medium">
                Revenue (Paid)
              </span>
              <div
                className="text-2xl font-black text-emerald-400 mt-1"
                suppressHydrationWarning
              >
                {formatCurrency(totalRevenue)}
              </div>
            </div>
            <div className="bg-[#121828] border border-slate-800 rounded-2xl p-5 shadow-xl border-t-4 border-t-amber-500">
              <span className="text-xs text-slate-400 font-medium">
                Pending Collections
              </span>
              <div
                className="text-2xl font-black text-amber-400 mt-1"
                suppressHydrationWarning
              >
                {formatCurrency(pendingAmount)}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#121828] p-3 rounded-2xl border border-slate-800 shadow-xl">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search by invoice number or client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#090d16] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 bg-[#090d16] p-1 rounded-xl border border-slate-800">
              <Filter className="w-3.5 h-3.5 text-slate-500 ml-2" />
              {(["All", "Paid", "Pending"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    filterStatus === status
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInvoices.map((inv) => (
              <InvoiceCard
                key={inv.id}
                invoice={inv}
                onToggleStatus={handleToggleStatus}
                onPrint={(inv) => setPrintingInvoice(inv)}
              />
            ))}
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No invoices found matching your criteria.
            </div>
          )}
        </main>
      )}

      {/* Print / PDF View */}
      {printingInvoice && (
        <div className="fixed inset-0 z-50 bg-[#090d16] sm:bg-slate-900/90 overflow-y-auto print:bg-white print:static print:overflow-visible">
          {/* Close/Print Controls (Hidden on actual print) */}
          <div className="no-print max-w-3xl mx-auto p-4 flex justify-end gap-3 sticky top-0">
            <button
              onClick={() => setPrintingInvoice(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-bold flex items-center gap-2 hover:bg-slate-700"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center gap-2 hover:bg-blue-500"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
          </div>

          {/* Print Document Body */}
          <div className="max-w-3xl mx-auto bg-white text-slate-900 p-10 sm:p-16 mb-10 shadow-2xl print:shadow-none print:m-0 print:p-0">
            <div className="flex justify-between items-start border-b-2 border-slate-200 pb-8 mb-8">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                  INVOICE
                </h1>
                <p className="text-slate-500 font-medium mt-1">
                  #{printingInvoice.invoiceNumber}
                </p>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900">InvoicePro Ltd.</div>
                <div className="text-sm text-slate-500">Prague, Czechia</div>
                <div className="text-sm text-slate-500">
                  hello@invoicepro.io
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-10 text-sm">
              <div>
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-2">
                  Billed To:
                </h3>
                <div className="font-bold text-slate-900 text-base">
                  {printingInvoice.clientCompany}
                </div>
                <div className="text-slate-600">
                  {printingInvoice.clientName}
                </div>
                <div className="text-slate-600">
                  {printingInvoice.clientEmail}
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-wider mr-2">
                    Issue Date:
                  </span>
                  <span className="font-medium">
                    {printingInvoice.issueDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-wider mr-2">
                    Due Date:
                  </span>
                  <span className="font-medium">{printingInvoice.dueDate}</span>
                </div>
              </div>
            </div>

            <table className="w-full text-left mb-10 border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 font-bold">Description</th>
                  <th className="py-3 font-bold text-center">Qty</th>
                  <th className="py-3 font-bold text-right">Price</th>
                  <th className="py-3 font-bold text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {printingInvoice.items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="py-4 font-medium">{item.description}</td>
                    <td className="py-4 text-center text-slate-600">
                      {item.quantity}
                    </td>
                    <td
                      className="py-4 text-right text-slate-600"
                      suppressHydrationWarning
                    >
                      ${item.price.toLocaleString("en-US")}
                    </td>
                    <td
                      className="py-4 text-right font-bold"
                      suppressHydrationWarning
                    >
                      ${(item.quantity * item.price).toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2 text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span suppressHydrationWarning>
                    ${printingInvoice.totalAmount.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-slate-900 mt-2">
                  <span className="font-bold text-lg text-slate-900">
                    Total
                  </span>
                  <span
                    className="font-black text-lg text-slate-900"
                    suppressHydrationWarning
                  >
                    ${printingInvoice.totalAmount.toLocaleString("en-US")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
              <p className="font-bold text-slate-900 mb-1">
                Thank you for your business!
              </p>
              <p>
                Please send payment within 14 days of receiving this invoice.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
