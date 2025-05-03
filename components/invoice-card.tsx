"use client";

import { Invoice } from "@/types/invoice";
import { FileText, CheckCircle2, Clock, Printer } from "lucide-react";

interface InvoiceCardProps {
  invoice: Invoice;
  onPrint: (invoice: Invoice) => void;
  onToggleStatus: (id: string) => void;
}

export function InvoiceCard({
  invoice,
  onPrint,
  onToggleStatus,
}: InvoiceCardProps) {
  const isPaid = invoice.status === "Paid";

  return (
    <div className="bg-[#121828] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-colors shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">
              {invoice.invoiceNumber}
            </h3>
            <p className="text-xs text-slate-400">{invoice.clientCompany}</p>
          </div>
        </div>

        <button
          onClick={() => onToggleStatus(invoice.id)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
            isPaid
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
              : "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
          }`}
        >
          {isPaid ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <Clock className="w-3 h-3" />
          )}
          <span>{invoice.status}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-[#090d16] p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 block text-[10px] mb-0.5">
            Issue Date
          </span>
          <span className="font-semibold text-slate-200">
            {invoice.issueDate}
          </span>
        </div>
        <div className="bg-[#090d16] p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 block text-[10px] mb-0.5">
            Due Date
          </span>
          <span className="font-semibold text-slate-200">
            {invoice.dueDate}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <div>
          <span className="text-[10px] text-slate-500 block mb-0.5">
            Total Amount
          </span>
          <span
            className="font-black text-lg text-slate-100"
            suppressHydrationWarning
          >
            ${invoice.totalAmount.toLocaleString("en-US")}
          </span>
        </div>

        <button
          onClick={() => onPrint(invoice)}
          className="p-2 bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-md"
          title="Print / Generate PDF"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
